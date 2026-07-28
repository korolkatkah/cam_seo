#!/usr/bin/env python3
"""
sc_trends.py — single-shot collector for the homepage trends widget (Stripchat).

Meant to be invoked on a schedule (GitHub Actions cron, hourly):

    python3 scripts/sc_trends.py

Each run:
  1. Fetches the current top-1000 online models snapshot from the Stripcash
     aggregator API (official affiliate API, not scraping).
  2. Appends it to a rolling raw-data file (kept OUTSIDE git via Actions
     cache — see .github/workflows/sc-trends.yml) and prunes rows older
     than WINDOW_HOURS.
  3. Recomputes the best-hours-to-stream stats over that window and writes
     a small JSON summary to src/data/sc-trends.json, read by the Astro
     homepage component at build time.

Config via env vars (see workflow file for how these are set):
  SC_USER_ID       Stripcash aggregator userId (required, keep secret)
  SC_TAG           category/tag to query (default: girls)
  SC_RAW_PATH      path to the rolling raw-data cache file
  SC_OUT_PATH      path to the output JSON consumed by the site
  SC_WINDOW_HOURS  how much history to keep/aggregate (default: 24)
"""

import json
import os
import statistics
import sys
import time
import urllib.parse
import urllib.request
from collections import defaultdict
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

USER_ID = os.environ.get("SC_USER_ID", "")
TAG = os.environ.get("SC_TAG", "girls")
RAW_PATH = Path(os.environ.get("SC_RAW_PATH", ROOT / ".cache" / "sc-raw.jsonl"))
OUT_PATH = Path(os.environ.get("SC_OUT_PATH", ROOT / "src" / "data" / "sc-trends.json"))
WINDOW_HOURS = float(os.environ.get("SC_WINDOW_HOURS", "24"))

API = "https://go.whitetrafsa.com/api/models"


def fetch_models():
    q = urllib.parse.urlencode({"userId": USER_ID, "tag": TAG, "limit": 1000})
    req = urllib.request.Request(API + "?" + q, headers={"User-Agent": "sc-trends/1.0"})
    with urllib.request.urlopen(req, timeout=30) as r:
        data = json.loads(r.read().decode())
    return data.get("models", [])


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


def build_summary(rows):
    if not rows:
        return None

    ts_all = sorted({r["ts"] for r in rows})
    hours_covered = (ts_all[-1] - ts_all[0]) / 3600 if len(ts_all) > 1 else 0

    # Average viewers-per-room within each snapshot first, then average
    # those per-snapshot averages across snapshots per hour. This avoids
    # the same accumulation bug we hit on the Chaturbate collector: summing
    # raw viewer counts across snapshots inflates hours that happen to have
    # more snapshots in the window.
    by_ts = defaultdict(list)
    for r in rows:
        by_ts[r["ts"]].append(r)
    snap_avgs = defaultdict(list)
    for ts, snap_rows in by_ts.items():
        h = datetime.fromtimestamp(ts, tz=timezone.utc).hour
        viewers = [r["viewers"] for r in snap_rows]
        if viewers:
            snap_avgs[h].append(statistics.mean(viewers))
    score = {h: statistics.mean(v) for h, v in snap_avgs.items()}

    return {
        "generated_at": datetime.now(tz=timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
        "tag": TAG,
        "hours_covered": round(hours_covered, 1),
        "snapshots": len(ts_all),
        "rooms_seen": len({r["username"] for r in rows}),
        "preliminary": hours_covered < 20,
        "best_hours_utc": [{"hour": h, "score": round(score[h])} for h in sorted(score)],
    }


def should_publish(summary, out_path):
    """Don't regress the live site to a noisier, shorter window after a raw-cache reset."""
    if not summary.get("preliminary"):
        return True
    if not out_path.exists():
        return True
    try:
        existing = json.loads(out_path.read_text(encoding="utf-8"))
    except Exception:
        return True
    if not existing.get("preliminary", True):
        return False
    return summary["hours_covered"] >= existing.get("hours_covered", 0)


def main():
    if not USER_ID:
        print("SC_USER_ID not set — skipping run", file=sys.stderr)
        return 1

    now_ts = int(time.time())
    try:
        models = fetch_models()
    except Exception as e:  # noqa: BLE001
        print(f"fetch failed: {e}", file=sys.stderr)
        return 1

    new_rows = [
        {"ts": now_ts, "username": m.get("username", ""), "viewers": m.get("viewersCount", 0)}
        for m in models
        if m.get("username")
    ]

    rows = load_raw() + new_rows
    cutoff = now_ts - WINDOW_HOURS * 3600
    rows = [r for r in rows if r["ts"] >= cutoff]
    save_raw(rows)
    print(f"{datetime.now():%H:%M} — {len(new_rows)} models fetched, {len(rows)} rows in {WINDOW_HOURS}h window")

    summary = build_summary(rows)
    if summary is None:
        print("no rows yet — not writing summary", file=sys.stderr)
        return 0

    if not should_publish(summary, OUT_PATH):
        print(f"window still short ({summary['hours_covered']}h) — keeping last published summary", file=sys.stderr)
        return 0

    OUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    OUT_PATH.write_text(json.dumps(summary, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"wrote {OUT_PATH}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
