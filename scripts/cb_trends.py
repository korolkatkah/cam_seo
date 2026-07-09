#!/usr/bin/env python3
"""
cb_trends.py — single-shot collector for the homepage trends widget.

Meant to be invoked on a schedule (GitHub Actions cron, every ~15 min):

    python3 scripts/cb_trends.py

Each run:
  1. Fetches the current snapshot from the Chaturbate affiliate API.
  2. Appends it to a rolling raw-data file (kept OUTSIDE git via Actions
     cache — see .github/workflows/cb-trends.yml) and prunes rows older
     than WINDOW_HOURS.
  3. Recomputes the aggregate stats over that window and writes a small
     JSON summary to src/data/cb-trends.json, which IS committed and
     read by the Astro homepage component at build time.

Config via env vars (see workflow file for how these are set):
  CB_WM            affiliate/webmaster code (required)
  CB_GENDER        niche filter: f / m / c / t (default: f)
  CB_RAW_PATH      path to the rolling raw-data cache file
  CB_OUT_PATH      path to the output JSON consumed by the site
  CB_WINDOW_HOURS  how much history to keep/aggregate (default: 24)
"""

import json
import os
import re
import statistics
import sys
import time
import urllib.parse
import urllib.request
from collections import defaultdict, Counter
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

WM = os.environ.get("CB_WM", "")
GENDER = os.environ.get("CB_GENDER", "f")
RAW_PATH = Path(os.environ.get("CB_RAW_PATH", ROOT / ".cache" / "cb-raw.jsonl"))
OUT_PATH = Path(os.environ.get("CB_OUT_PATH", ROOT / "src" / "data" / "cb-trends.json"))
WINDOW_HOURS = float(os.environ.get("CB_WINDOW_HOURS", "24"))

API = "https://chaturbate.com/api/public/affiliates/onlinerooms/"

TOKEN_RE = re.compile(r"\b\d{1,4}\s?tk\b|\btokens?\b", re.I)
GOAL_RE = re.compile(r"\bgoal\b|@\s?goal", re.I)
LIST_RE = re.compile(r"\b(\d{2,4}(?:\s*,\s*\d{2,4}){1,})\b")
LEFT_RE = re.compile(r"\[?\s*(\d{3,6})\s*(?:tk|tokens?)\s*(?:left|remain)", re.I)
TK_RE = re.compile(r"\b(\d{2,6})\s*(?:tk|tokens?)\b", re.I)
MULTI_RE = re.compile(r"multi[- ]?goal", re.I)


def extract_price(subject):
    """Best-effort single goal price (in tokens) parsed from a room subject."""
    if not subject:
        return None
    m = LEFT_RE.search(subject)
    if m:
        v = int(m.group(1))
        if 100 <= v <= 100000:
            return v
    big = [int(x) for x in TK_RE.findall(subject) if 500 <= int(x) <= 100000]
    return max(big) if big else None


def fetch_all():
    rooms, offset = [], 0
    while True:
        q = urllib.parse.urlencode({
            "wm": WM, "client_ip": "request_ip",
            "format": "json", "limit": 500, "offset": offset,
        })
        req = urllib.request.Request(API + "?" + q, headers={"User-Agent": "cb-trends/1.0"})
        with urllib.request.urlopen(req, timeout=30) as r:
            data = json.loads(r.read().decode())
        page = data.get("results", data) if isinstance(data, dict) else data
        if not page:
            break
        rooms += page
        if len(page) < 500:
            break
        offset += 500
        time.sleep(1)
    return rooms


def load_raw():
    if not RAW_PATH.exists():
        return []
    rows = []
    with RAW_PATH.open("r", encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if not line:
                continue
            try:
                rows.append(json.loads(line))
            except json.JSONDecodeError:
                continue
    return rows


def save_raw(rows):
    RAW_PATH.parent.mkdir(parents=True, exist_ok=True)
    with RAW_PATH.open("w", encoding="utf-8") as f:
        for row in rows:
            f.write(json.dumps(row, ensure_ascii=False) + "\n")


def build_summary(rows, now_ts):
    public_rows = [r for r in rows if r.get("gender") == GENDER and r.get("current_show") == "public"]
    if not public_rows:
        return None

    ts_all = sorted({r["ts"] for r in public_rows})
    hours_covered = (ts_all[-1] - ts_all[0]) / 3600 if len(ts_all) > 1 else 0
    n_snaps = len(ts_all)

    demand, supply = defaultdict(int), defaultdict(set)
    for r in public_rows:
        h = datetime.fromtimestamp(r["ts"], tz=timezone.utc).hour
        demand[h] += r.get("num_users") or 0
        supply[h].add(r["username"])
    score = {h: demand[h] / max(len(supply[h]), 1) for h in demand}
    best_hours = sorted(score, key=score.get, reverse=True)[:4]

    tag_users, tag_rooms, tag_prices = defaultdict(list), defaultdict(set), defaultdict(list)
    for r in public_rows:
        price = extract_price(r.get("room_subject"))
        for t in r.get("tags") or []:
            t = t.strip().lower()
            if t:
                tag_users[t].append(r.get("num_users") or 0)
                tag_rooms[t].add(r["username"])
                if price is not None:
                    tag_prices[t].append(price)
    top_tags = sorted(
        (t for t in tag_users if len(tag_rooms[t]) >= 5),
        key=lambda t: statistics.mean(tag_users[t]), reverse=True)[:20]

    room_sum, last_subj = defaultdict(int), {}
    for r in public_rows:
        room_sum[r["username"]] += r.get("num_users") or 0
        subj = r.get("room_subject")
        if subj:
            last_subj[r["username"]] = re.sub(r"\s*-\s*All\s*$", "", subj).strip()
    med = statistics.median(room_sum.values())
    leaders = sorted(
        (u for u in room_sum if room_sum[u] > med and u in last_subj),
        key=lambda u: room_sum[u], reverse=True)
    subjects = [last_subj[u] for u in leaders]
    n = len(subjects) or 1
    with_goal = sum(bool(GOAL_RE.search(s)) for s in subjects) / n
    with_price = sum(bool(TOKEN_RE.search(s)) for s in subjects) / n

    goals, patterns = [], []
    multi_cnt = 0
    for s in subjects:
        if MULTI_RE.search(s):
            multi_cnt += 1
        for m in LIST_RE.finditer(s):
            patterns += [int(x) for x in re.split(r"\s*,\s*", m.group(1))]
        for m in LEFT_RE.finditer(s):
            goals.append(int(m.group(1)))
        for m in TK_RE.finditer(s):
            v = int(m.group(1))
            if v >= 500:
                goals.append(v)
            elif v <= 400:
                patterns.append(v)
    goals = [g for g in goals if 100 <= g <= 100000]
    patterns = [p for p in patterns if 10 <= p <= 500]

    top_patterns = Counter(patterns).most_common(10)

    reco_tags = list(top_tags[:6])
    ratio_sorted = sorted(
        (t for t in tag_users if len(tag_rooms[t]) >= 5 and t not in reco_tags),
        key=lambda t: statistics.mean(tag_users[t]) / len(tag_rooms[t]),
        reverse=True)
    reco_tags += ratio_sorted[:4]

    return {
        "generated_at": datetime.now(tz=timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
        "gender": GENDER,
        "hours_covered": round(hours_covered, 1),
        "snapshots": n_snaps,
        "rooms_seen": len(room_sum),
        "preliminary": hours_covered < 20,
        "best_hours_utc": [{"hour": h, "score": round(score[h])} for h in sorted(best_hours)],
        "top_tags": [
            {
                "tag": t,
                "avg_users": round(statistics.mean(tag_users[t])),
                "rooms": len(tag_rooms[t]),
                "avg_price": round(statistics.mean(tag_prices[t])) if tag_prices[t] else None,
                "price_samples": len(tag_prices[t]),
            }
            for t in top_tags
        ],
        "top_titles": [
            {"avg_users": round(room_sum[u] / n_snaps), "subject": last_subj[u][:120]}
            for u in leaders[:20]
        ],
        "economy": {
            "goal_median": int(statistics.median(goals)) if goals else None,
            "goal_p25": int(sorted(goals)[len(goals) // 4]) if goals else None,
            "goal_p75": int(sorted(goals)[len(goals) * 3 // 4]) if goals else None,
            "goal_samples": len(goals),
            "top_patterns": [{"value": v, "count": c} for v, c in top_patterns],
            "multi_goal_share": round(multi_cnt / n, 3),
            "with_goal_share": round(with_goal, 3),
            "with_price_share": round(with_price, 3),
        },
        "recommendation": {
            "tags": reco_tags[:10],
            "low_competition_tag": ratio_sorted[0] if ratio_sorted else None,
        },
    }


def main():
    if not WM:
        print("CB_WM not set — skipping run", file=sys.stderr)
        return 1

    now_ts = int(time.time())
    try:
        rooms = fetch_all()
    except Exception as e:  # noqa: BLE001
        print(f"fetch failed: {e}", file=sys.stderr)
        return 1

    new_rows = [
        {
            "ts": now_ts,
            "username": r.get("username", ""),
            "num_users": r.get("num_users", 0),
            "tags": r.get("tags", []),
            "room_subject": r.get("room_subject", ""),
            "gender": r.get("gender", ""),
            "current_show": r.get("current_show", ""),
        }
        for r in rooms
    ]

    rows = load_raw() + new_rows
    cutoff = now_ts - WINDOW_HOURS * 3600
    rows = [r for r in rows if r["ts"] >= cutoff]
    save_raw(rows)
    print(f"{datetime.now():%H:%M} — {len(new_rows)} rooms fetched, {len(rows)} rows in {WINDOW_HOURS}h window")

    summary = build_summary(rows, now_ts)
    if summary is None:
        print("no public rows yet for this niche — not writing summary", file=sys.stderr)
        return 0

    OUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    OUT_PATH.write_text(json.dumps(summary, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"wrote {OUT_PATH}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
