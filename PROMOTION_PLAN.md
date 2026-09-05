# EWO Promotion Plan

Running log of daily/session-based SEO & promotion action plans. Newest entry on top; do not delete older entries.

---

## 2026-09-05

### Recurring automation set up: 3 scheduled tasks recreated/created

Discovered the two daily-article scheduled tasks documented in CLAUDE.md (`ewo-daily-article` 10:00,
`ewo-daily-article-pm` 15:00) no longer existed in this app's scheduled-tasks store (neither the local
mechanism nor the cloud `RemoteTrigger` routines list showed them) — likely lost in a prior reset/reinstall.
Recreated both via `mcp__scheduled-tasks__create_scheduled_task` (the local task mechanism, which runs in
this app on this machine — not the isolated-cloud-sandbox `RemoteTrigger` routines, which have no access to
local files or the local git checkout and were the wrong tool for this). Both tasks read `CLAUDE.md` fresh
each run for conventions, check recent git history/`PROMOTION_PLAN.md` to avoid duplicate topics between the
AM/PM slots, enforce the Stripchat-only hard scope, ship all 8 locales, verify build + browser before
pushing — same behavior as documented, just re-created from scratch.

Also created a new third task, **`ewo-seo-monitoring`** (08:00 daily, read-only) — rotates through the
weekly SEO health-check cadence discussed this session (Monday: full GSC Search Analytics + indexing spot-
check + sitemap/canonical check; Tue/Wed/Sat: light check on newly-published articles; Thursday: week-over-
week snapshot + "position 5-15" candidate list; Sunday: weekly retrospective). This task is hard-scoped to
**never edit pages, run a build, commit, or push** — it only reads (GSC API, curl, repo files) and appends
findings to this file, so a bad automated finding can't silently ship a bad change. The GSC service-account
key used for the API was moved from this session's ephemeral scratchpad to a stable location,
`C:\Users\shche\.claude\ewohub-secrets\gsc-key.json`, outside the git repo, so the recurring task has a
durable path to read from (the previous scratchpad path is session-specific and would have disappeared).

**Operational note:** all 3 tasks may pause on their first automatic run waiting for tool-use permission
(build, git push, browser control) unless manually run once first via "Run now" in the Scheduled sidebar to
pre-approve — flagged to the user.

### Shipped: PWA support (manifest + icons) — today's item from the new weekly content-strengthening rotation

Added `public/manifest.json` (name/short_name "EWOhub", `background_color`/`theme_color` matching the site's
grayscale tokens `#fafaf8`/`#0a0a0a`, icons 192/512), generated `icon-192.png`, `icon-512.png`, and
`apple-touch-icon.png` (180×180) from the existing `public/logo-neon.png` (1024×1024 source) via `sharp`
(already a project dependency), and linked `<link rel="manifest">`, `<link rel="apple-touch-icon">`, and
`<meta name="theme-color">` in `Base.astro`'s `<head>`. Lets mobile users add the site to their home screen.
Build verified clean (268 pages), spot-checked in dev preview — manifest/icons serve correctly, homepage
renders unaffected.

### Shipped: BlogPosting JSON-LD + visible byline on all blog/guide articles (AI-search-optimization follow-up to today's FAQPage work)

Follow-up to the build-time FAQPage schema shipped earlier today — added `Article`/`BlogPosting` structured
data and a visible author byline to every genuine content article (anything listed in `blog.astro` or
`resources.astro`), aimed at how AI answer engines (ChatGPT, Perplexity, Google AI Overviews) and Google
itself parse and cite this content. `public/llms.txt` (added separately this session) was not touched.

**Scope:** 19 slugs × 8 locales = **152 article files** got both changes in one pass (only locales where a
slug is actually listed — parity is 8/8 for all 19 slugs after the 2026-09-03 `raise-your-room-ranking-score`
fix, so no page was skipped for a missing listing entry). Service/product pages, geo pages, and the homepage
were deliberately left untouched — confirmed via a dist sweep (see below).

1. **`Base.astro`** — added an optional `articleMeta?: { datePublished: string; dateModified?: string }` prop.
   When a calling page passes it, a `BlogPosting` JSON-LD block is emitted as its own separate
   `<script type="application/ld+json">` tag (headline = the page's `title` prop, trimmed to schema.org's
   ~110-char practical limit; `author`/`publisher` both `Organization: EWOhub`; `mainEntityOfPage` pointing at
   `canonicalUrl`). This sits alongside — never merged into — the existing build-time FAQPage extraction
   logic from earlier today; that logic was not modified.
2. **152 article files** (root + de/es/ro/uk/ru/fr/pt variants of all 19 in-scope slugs) — each now passes
   `articleMeta={{ datePublished: 'YYYY-MM-DD' }}` to its `<Base>` call, using the exact date already recorded
   for that slug in its own locale's `blog.astro`/`resources.astro` entry (dates turned out identical across
   all 8 locales for every slug, so one date-per-slug mapping covered every file). Same 152 files also got a
   small muted byline paragraph — reusing the existing `.card-date` class (the same style already used for
   card dates on `/blog`/`/resources`) rather than inventing new CSS — reading "EWOhub Editorial Team ·
   Published {date}" in English and a natural per-locale translation elsewhere (e.g. "EWOhub Redaktionsteam ·
   Veröffentlicht am {date}" in German, "Редакція EWOhub · Опубліковано {date}" in Ukrainian), with the date
   formatted via the same `Intl.DateTimeFormat`/`dateLocale` convention already used by each locale's
   `fmtDate()` helper on `/blog`. Placement follows the article's actual markup shape — three anchor patterns
   covered all 152 files with no manual one-offs needed: right after `<p class="art-intro">` (the common
   case), as the first child of `<main class="art-main">` on the handful of TOC-variant pages that open
   straight into a `<section>` with no intro paragraph, and right after `<p class="lead">` on the older
   "page-header" layout used by `stripchat-promo` and the older `why-low-viewers-webcam` variant in five
   locales.
3. **Verification:** `npm run build` completed clean at 348 pages. Swept `dist/` for
   `"@type":"BlogPosting"` — exactly **152 pages** carry it (matching the 152 edited files exactly, verified
   by diffing the grep results against the file list), 0 elsewhere. Spot-checked `datePublished` on 3 pages
   across different locales (`uk/stripchat-first-14-days-guide`, `fr/stripchat-vr-shows-worth-it`,
   `webcam-earnings-by-platform`) against their locale's own blog/resources listing entry — exact match on
   all 3. Confirmed **zero** BlogPosting schema on homepage, `model-promotion-usa`, `model-promotion-germany`,
   `studio-traffic`, `studio-scaling`, and both `en`/`de` homepages. Confirmed FAQPage schema is untouched and
   still emits correctly alongside the new BlogPosting block as a separate script tag (checked
   `stripscore-cam-rank-explained`: Organization + WebSite + FAQPage + BlogPosting all present as 4 distinct
   `<script type="application/ld+json">` tags, not merged). Browser-verified the byline renders correctly and
   doesn't break layout on 3 real pages via the `ewo-dev` preview server: a Variant B/TOC page
   (`uk/stripchat-first-14-days-guide`), a Variant A/flat page (`de/model-promotion`), and the older
   page-header layout (`es/platforms-we-work-with`) — byline text appears in the correct language, in the
   right position (after the intro, before the first content section), on all three.

---

## 2026-09-03

### Shipped: execution of the 2026-08-30 prioritized action list, items 1-4

Follow-up session to the 2026-08-30 "Full audit" prioritized action list — all 4 items were approved for
execution. Build verified clean (268 pages, up from prior baselines as content has grown) before shipping.

1. **`raise-your-room-ranking-score` blog listing gap — fixed, 5 files.** Added the missing card entry to
   `blog.astro`'s articles array in `src/pages/de/blog.astro`, `es/blog.astro`, `ro/blog.astro`,
   `ru/blog.astro`, and `uk/blog.astro`, matching the shape already present in root/fr/pt. Same `tag:
   'Ranking'` and `date: '2026-07-09'` across all locales per the CLAUDE.md parity rule; `title`/`desc`
   translated per locale (not copy-pasted English), `mins` unit matched to each file's existing convention
   (`Min.`/`min`/`мин`/`хв`), `href` locale-prefixed. The page is now listed in all 8 locale blog pages.

2. **Geo-page titles/descriptions shortened — 6 pages, 12 files.** All 6 built geo pages
   (usa/germany/romania/colombia/spain/ukraine, root + their locale variant(s)) had `<title>` at 73-85 chars
   and meta descriptions at 169-180 chars. Rewrote both in every file to the `/model-promotion` /
   `/studio-traffic` length pattern — titles now measure 32-42 chars, descriptions 132-154 chars, all in each
   page's own language. Dropped the "— How to Grow American Viewers" / "— Publikumsaufbau Deutschland"-style
   suffixes rather than relocating them into the hero, since the existing `art-lead` paragraph on every page
   already covers that ground — kept body copy and links otherwise untouched.

3. **Internal links to the two best-performing hub pages added — same 12 files.** Added 1-2 natural
   contextual links per geo page (root + locale variant(s)) to that locale's own
   `/stripscore-cam-rank-explained` and `/best-streaming-times-by-region`, verified all 12 target hub-page
   files exist before linking. Several locale variants (de/ro/ru/uk Germany/Romania/Ukraine pages) already
   linked to `best-streaming-times-by-region` via their "Related Pages" card grid — for those, only the
   missing `stripscore-cam-rank-explained` link was added in-body, per the "if a page already links to one,
   just add the other" instruction. All existing links to `webcam-earnings-by-platform` /
   `platforms-we-work-with` / `webcam-model-income-guide` left intact — purely additive.

4. **FAQPage JSON-LD moved from client-side to build-time — done, `Base.astro` only.** Replaced the
   DOMContentLoaded `<script>` that scanned `.faq-item` elements and injected schema via
   `document.head.appendChild` with a build-time parser: `Astro.slots.render('default')` captures the
   rendered body HTML, a small balanced-tag scanner extracts each `.faq-item` block, and question/answer
   text is pulled via a 3-way fallback chain (`<summary>`, then `<h3>`, then `<button class="faq-chevron">`
   for the question; a `.faq-body` wrapper's `<p>` or the first following `<p>` for the answer) — the extra
   `<h3>` branch was necessary because that's the actual markup on `stripscore-cam-rank-explained` and
   similar TOC-variant pages, which the old client script's selectors silently never matched (a pre-existing
   gap, now fixed as a side effect). The whole extraction is wrapped in try/catch and skips per-block or
   per-page on any parse miss rather than risking malformed JSON-LD or a build failure. Verified via a real
   build: swept all 268 built pages — **170 pages now carry valid `FAQPage` JSON-LD, 0 malformed, 0
   leftover instances of the old client-side script**, and spot-checked extracted question/answer text
   against visible markup on `model-promotion`, `stripscore-cam-rank-explained`, and `de/model-promotion`
   (one of each markup variant) with no truncation, tags, or unescaped entities.

**File counts:** item 1 touched 5 files, items 2+3 touched 12 files (combined edit pass, as suggested),
item 4 touched 1 file (`Base.astro`). No item was skipped or left partial — all 4 shipped in the same
commit after a clean build and dist-output verification pass.

---

## 2026-08-31

### Page Indexing report review (GSC UI, `sc-domain:ewohub.com`)

Followed up on the 2026-08-30 GSC baseline by opening the actual **Page Indexing** report in the Search
Console UI (not just Search Analytics) to see how much of the site Google has actually chosen to index.

**Overall: 76 indexed / 184 not indexed**, broken down by reason:

| Reason | Pages | Verdict |
|---|---|---|
| Page with redirect | 53 | **Not a problem** — confirmed via `curl` that `ewohub.com` (no `www`) and `http://` variants correctly 308-redirect to `https://www.ewohub.com`. Google finding and excluding these is expected/correct behavior for a redirect setup, not something to fix. |
| Crawled — currently not indexed | **125** | **The real bottleneck.** Spot-checked 7 URLs via the URL Inspection API — only the homepage came back "Submitted and indexed" (PASS); everything else (`/ru/studio-scaling`, `/ru/stripchat-ai-model-recommendations`, `/es/raise-your-room-ranking-score`, `/ro/stripchat-ai-model-recommendations`, `/uk/stripchat-first-14-days-guide`, `/ro/raise-your-room-ranking-score`) came back "Crawled - currently not indexed" with no technical block (`robotsTxtState: ALLOWED`, `indexingState: INDEXING_ALLOWED`, correct self-referencing canonical). Google read these pages and chose not to index them — consistent with the 2026-08-30 read that this is a young/low-trust-domain problem, not a content or crawl problem. |
| Variant page with canonical tag | 5 | **False alarm, already fixed, just stale.** The 3 examples checked (`/best-streaming-times-by-region`, `/how-cam-algorithm-ranks-rooms`, `/new-model-growth`) show Google's recorded canonical as `https://ewohub.com/...` (no `www`) — but `curl`-ing the live pages confirms the canonical tag is already correctly `https://www.ewohub.com/...` right now. This is a stale snapshot from right around the 2026-07-21 domain migration that Google hasn't refreshed. Also verified all 3 URLs are present in the live `sitemap-0.xml` — the URL Inspection panel's "no referring sitemap" note was itself stale/wrong, not a real sitemap gap. **Action taken:** manually submitted all 3 for re-indexing via Search Console → Проверка URL → Запросить индексирование. Expect these to self-correct within 1-2 weeks; the other 2 unchecked pages in this bucket should resolve the same way without separate action. |
| Not found (404) | 1 | Trivial, not investigated this session. |

**Why not just "Request Indexing" the 125 crawled-not-indexed pages too?** There's no technical error to fix on
those — GSC's own diagnostics say indexing is allowed and nothing is blocking crawl. Manually requesting
indexing doesn't change Google's quality/trust judgment, and the daily request quota is limited, so it's not
a scalable fix for a 125-page bucket. The lever that actually moves this number is the same one flagged
2026-08-30/08-31-earlier-in-session for raising traffic generally: **external backlinks to raise domain
trust.** Until that improves, expect the indexed/not-indexed ratio to stay skewed — and publishing more new
content on top of an already-mostly-unindexed corpus would dilute crawl/trust budget further rather than
help, reinforcing the 2026-08-30 call to prioritize strengthening existing pages over new volume.

---

## 2026-08-30

### Search Console baseline — first real pull on the `ewohub.com` property (28 days: 2026-07-30 → 2026-08-27)

This is the first GSC data pulled against `sc-domain:ewohub.com` since the domain migration (2026-07-21) —
not directly comparable to the older `ewo.cam`-property numbers logged on 2026-07-10/07-19, which are a
different, now-inactive property. Treat this as a fresh baseline, not a continuation of that trendline.

**Site-wide totals:** 25 impressions, 1 click, CTR 4%, avg position 22.2. Sitemap (`sitemap-index.xml`)
submitted 2026-07-21, last downloaded 2026-08-23, 0 errors/0 warnings — indexing plumbing is confirmed
healthy, so low volume is a demand/ranking problem, not a crawl problem.

**Data caveat worth flagging**: the totals row (25 impressions) doesn't reconcile with the sum of the
per-page breakdown (51 impressions across the 18 pages below) — roughly double, not sampling noise. Likely
a `searchType` filter difference between the two queries in `fetch-search-console.mjs` (e.g. totals scoped
to `web` only, page breakdown unscoped) rather than a real anomaly. Worth a quick look at the script next
time it's touched, but doesn't change the qualitative read below — treat the per-page numbers as the more
granular, trustworthy source when the two disagree.

**Query-level data is still almost empty**: only 2 queries recorded, both branded/typo — `eohub` (3
impressions, position 88) and `ewo` (1 impression, position 69). No topical/content query has enough volume
yet to surface as its own row. This confirms: none of the published articles are currently pulling
measurable search demand for the phrases they were written around — the site is still below GSC's reporting
threshold for almost everything except its own (misspelled) brand name.

**Page-level data is the useful signal this round — 18 pages got impressions, several ranking well:**

| Page | Impr | Pos | Notes |
|---|---|---|---|
| `/` (homepage) | 17 | 31.5 | Most impressions of any page, but buried on page 3-4; only actual click on the whole account (1, from Romania, position 1 — reads as a branded lookup, not organic discovery) |
| `/how-cam-algorithm-ranks-rooms` | 4 | 2 | Cross-platform algorithm explainer; 139 internal links pointing to it, most of any content page |
| `/stripscore-cam-rank-explained` (root) | 4 | 3.25 | |
| `/ro/stripscore-cam-rank-explained` | 4 | 3.5 | Same cluster ranking pos 2-4 in **3 separate locales** simultaneously (root/ro/uk) — see below |
| `/uk/stripscore-cam-rank-explained` | 1 | 3 | |
| `/ro/platforms-we-work-with` | 4 | 3 | |
| `/best-streaming-times-by-region` | 3 | 3.3 | |
| `/new-model-growth` | 2 | 2 | 106 internal links |
| `/uk/raise-your-room-ranking-score` | 2 | 4 | Confirms the historic EN-only gap on this page (flagged 2026-07-10/07-19, CLAUDE.md "known gaps") is now actually fixed — page exists and ranks in all 8 locales |
| `/de/stripchat-promo` | 2 | 3.5 | |
| `/model-promotion` | 1 | 2 | Core commercial page, 189 internal links — **most-linked page on the whole site** |
| `/studio-traffic` | 1 | 3 | 70 internal links |
| `/ro/studio-scaling` | 1 | 4 | |
| `/ro/webcam-model-income-guide` | 1 | 5 | |
| `/es/stripchat-promo` | 1 | 4 | |
| `/ro/stripchat-promo` | 1 | 6 | |
| `/ro/stripchat-ai-model-recommendations` | 1 | 7 | |
| `/ro/webcam-earnings-by-platform` | 1 | 6 | |

Device split: mobile CTR 14% (1/7) vs desktop 0% (0/18) — directionally interesting but the sample is far
too small (8 total clicks-eligible impressions) to act on. Country split: impressions scattered 1-2 each
across 10 countries (ROU, ARG, COL, DEU, ECU, FRA, IND, IRN, MYS, NLD) with zero concentration anywhere;
Romania is the only country that converted an impression into a click.

### Reading the signal: position is good, volume is the bottleneck — not content quantity

The headline pattern: **6 pages are already sitting at position 2-7** (basically top-of-page-1), across
2-4 different locale variants in some cases, yet each gets only 1-4 impressions in 28 days. That is not a
ranking problem — Google already trusts these pages enough to place them above most of the internet for
whatever phrase currently triggers them. It's a **keyword-breadth problem**: the phrases these pages are
currently matching have near-zero real search volume. Meanwhile the homepage gets the most impressions
(17) of anything on the site but sits at position 31 — the inverse failure mode, broad-enough terms but not
enough authority yet to rank for them.

Net conclusion for this round: **new article production is not the current bottleneck — strengthening and
re-targeting the small set of pages that already prove Google will rank this site's content is the higher-
leverage move right now.** Concretely:

**Priority 1 — `stripscore-cam-rank-explained` is the strongest proven cluster on the site.** It's the only
topic ranking pos 2-4 in three locales at once (root/ro/uk), yet it has the *fewest* internal links (64
files) of any of the six top-2-7 pages — link equity hasn't caught up to how well it's already performing.
Two moves, both within the Stripchat-pipeline scope where applicable:
  - Add more contextual internal links to it from Stripchat-tagged blog articles (currently under-linked
    relative to its performance) — this is fair game for the daily pipeline (new/edited Stripchat articles
    can link to it) without violating the Stripchat-only scope.
  - Its title (`What Is Stripscore? Cam Rank Explained Across Chaturbate, Stripchat, BongaCams &
    LiveJasmin`) is a glossary/definitional framing, which is inherently low-volume. Consider whether a
    broader, more query-matching angle exists ("stripchat ranking algorithm", "chaturbate score checker")
    without duplicating `/how-cam-algorithm-ranks-rooms`'s existing signal-breakdown scope — this needs a
    content-strategy decision, not just a title tweak, so flagging rather than prescribing the exact
    rewrite.

**Priority 2 — `/model-promotion` and `/studio-traffic` show the biggest mismatch between link investment
and search return.** These are the site's core commercial pages (189 and 70 internal links respectively —
`/model-promotion` is the single most-linked page on the entire site) but return only 1 impression each.
They already rank position 2-3 for *something* — the problem is that something is almost certainly a
narrow long-tail phrase, not the actual competitive commercial terms (recall the 2026-07-10 competitor
pass: arunatalent.com, seocircular.com, bird.marketing, trafficpills.com etc. are actively ranking for
"webcam model promotion service" / "cam model traffic growth service" type queries). Recommend a title/meta
and on-page H2 pass to explicitly cover those higher-volume commercial phrases alongside the current copy,
rather than writing new pages to chase the same intent.

  **Scope flag, not a decision I'm making unilaterally**: `/model-promotion` and `/studio-traffic` are
  general service pages, not Stripchat-specific — they fall outside the daily autonomous pipeline's hard
  Stripchat-only scope (per CLAUDE.md). Strengthening them (title/meta rewrite, section expansion) needs to
  happen as manual/session work, not via the scheduled tasks, unless the user wants to explicitly widen the
  pipeline's scope to include periodic refresh passes on existing high-value non-Stripchat pages. Raising
  this as a question rather than changing the scope myself.

**Priority 3 — Romania is quietly the best-performing locale.** 6 of the 18 impression-generating pages are
`/ro/` routes (platforms-we-work-with, studio-scaling, webcam-model-income-guide,
stripchat-ai-model-recommendations, stripchat-promo, stripscore-cam-rank-explained) — more than any other
single locale, including English. Combined with the already-built Romania geo page and the RO-specific
content research from 2026-07-27 (multi-platform studio angle), this reinforces Romania as the market where
the site's content is landing best right now. Worth a closer look next session at whether this is organic
pull or an artifact of a specific referral/backlink; if organic, worth double-checking RO's `blog.astro`/
`resources.astro` listings and internal linking are as complete as EN's before assuming parity.

**Priority 4 — homepage: authority problem, not copy problem.** 17 impressions (most of any page) but
position 31.5 and the only click on the account was a likely-branded Romania search. Title
(`Webcam Model & Studio Promotion Platform`) and description are reasonably broad already — this reads as a
domain-authority/backlink gap rather than something a meta-description rewrite fixes. Not an immediate
action item, just don't waste effort re-wording homepage copy expecting it to move position 31→10 on its
own.

**Priority 5 — geo backlog stays queued behind the above.** France/Poland/Sweden remain the best next
targets per the 2026-07-10 competitor research (open markets, no entrenched local agency competitor), and
geo pages target a structurally different long-tail (country + service intent) genuinely absent from the
site today — that's still worth doing, just sequenced after the higher-signal strengthening work above
since GSC is explicitly telling us existing content isn't the constraint right now.

### Sample-size caveat

Every number above is 1-4 impressions per page over 28 days on a property with only ~5-6 weeks of history
since the `ewohub.com` migration. Directionally useful (position clustering at 2-7 across a specific topic
is a real signal even at n=4), but don't over-fit exact position/CTR figures. Re-pull in 3-4 weeks once more
data has accumulated, and reconcile the totals-vs-byPage discrepancy noted above if it recurs.

### Not done this session
No site content was changed, no pages created/edited, no commits made — data pull and planning only.
Competitor search (step 2.5 of the standing process) was not re-run this session; see 2026-07-10 entry for
the last full competitor pass, still current as far as known.

### Shipped (later same day)

Follow-up session implementing Priority 1 and Priority 2 from the analysis above, with one scope
correction to Priority 2 (see below). Build verified clean (`npm run build`, 260 pages, zero errors) and
spot-checked via local preview (homepage, `/model-promotion` + `/de/model-promotion`, `/studio-traffic` +
`/ro/studio-traffic`, `/stripchat-promo` + `/de/stripchat-promo`) before pushing.

**A) Internal linking to `stripscore-cam-rank-explained` (Priority 1).** Added one natural in-body
contextual link per page, inside existing prose (not a new card/section):
- `stripchat-promo.astro` — all 8 locales (root, de, es, ro, uk, ru, fr, pt) — link added inside the
  "How to Raise Your Stripscore With This Bot" section (or its translated equivalent).
- `how-stripscore-works.astro` — all 8 locales — link added in the hero lead paragraph, playing off the
  page's own "not what the term means" framing.
- `stripchat-ai-model-recommendations.astro` — all 8 locales — link added where the page first names the
  live-signal ranking metric (StripScore) driving Popular rankings.
- `stripchat-popular-new-model-visibility.astro` — all 8 locales — link added where the page names
  "current viewer count" as the core signal feeding the ranking metric.
- `stripchat-goals-tip-menu-structure.astro` — all 8 locales — link added as a second link inside the
  existing FAQ answer about whether goal/tip structure affects StripScore (alongside the existing link to
  `how-stripscore-works`).

`stripchat-vr-shows-worth-it` and `stripchat-model-news-studio-admin` were checked and deliberately
skipped — no natural topical tie-in (equipment cost / product update content, not ranking content).

**B) `/model-promotion` title/meta broadened for commercial search phrases (Priority 2), all 8 locales.**
EN title/description:
- title: "Webcam Model Promotion Service & Traffic Growth"
- description: "Professional webcam model promotion service: audience growth strategy, targeted
  marketing, and real traffic growth across Chaturbate, Stripchat, and more platforms."

Also added one sentence to each locale's `art-intro` paragraph naturally introducing a "traffic growth
service" equivalent phrase. de/es/ro/uk/ru/fr/pt titles and descriptions were adapted (not replaced) from
each locale's existing copy to cover the equivalent commercial phrase in that language.

**C) `/studio-traffic` title/meta sharpened — scope correction from the Priority 2 framing above.**
On reading the actual page, `/studio-traffic` is a free live-analytics tool hub (streaming hours, tags,
titles, show prices — no CTA, no service pitch), not a paid commercial service page. Rebranding it as a
"traffic growth service" would have misrepresented the page and cannibalized `/studio-scaling`'s existing
SEO target (the real paid studio-growth page). Instead sharpened toward what it actually is, for
long-tail matching, all 8 locales. EN title/description:
- title: "Free Chaturbate Analytics for Webcam Studios"
- description: "Live Chaturbate data for studio admins: best streaming hours, top tags, top titles, and
  average show prices — free, updated daily to help schedule models and grow traffic."

**Deliberately not touched:** `stripscore-cam-rank-explained.astro`'s title/description, in any locale —
flagged in Priority 1 above as needing a separate content-strategy decision, out of scope for this pass.

### Shipped (later same day, second follow-up): `stripscore-cam-rank-explained` retitled, all 8 locales

User approved "Option A" of two title proposals for the open question flagged above — reposition the
title away from the low-volume "Stripscore" brand term toward platform-name + generic score/rank
terms. Title/meta/H1/hero-lead only; body sections, H2s, section ids, TOC links, and FAQ untouched
(TOC still resolves to the same anchors).

EN: old title `What Is Stripscore? Cam Rank Explained Across Chaturbate, Stripchat, BongaCams &
LiveJasmin` → new title `Stripchat Score, Cam Rank & Room Rank Explained (All Platforms)`. Old
description `Stripscore, cam rank, room rank — what these terms actually mean, whether every platform
has one, and how the concept differs between Chaturbate, Stripchat, BongaCams, and LiveJasmin.` → new
description `What "Stripchat score," cam rank, and room rank actually mean — and how the concept
differs across Chaturbate, Stripchat, BongaCams, and LiveJasmin.` de/es/ro/uk/ru/fr/pt titles and
descriptions adapted to the same platform-name-first framing in each language, matching each page's
existing tone. Build verified clean (`npm run build`, 260 pages, zero errors); spot-checked via local
preview on root, `/de`, `/ro`, and `/uk` — new title/H1 render correctly, TOC sidebar link
(`#platform-cam-rank`) still scrolls to the right section.

### Full audit (later same day, third session): comprehensive technical + content + locale-parity pass

Planning-only session, explicitly requested as a broader "analyze everything" pass rather than a
continuation of the content-freshness angle from earlier today. No site content changed, no pages
created/edited, no commits made. Findings below are grounded in direct inspection of `src/pages`,
live-site fetches, and 4 fresh competitor searches — GSC was **not** re-pulled (same-day baseline already
captured above; too early for a meaningful delta).

**Method note:** re-verified every "known gap" CLAUDE.md flags as re-check-worthy. Two of the three
turned out to still be accurate as described; one (locale mirroring) needed a more precise breakdown than
the doc currently gives.

#### Prioritized action list

1. **Fix the `raise-your-room-ranking-score` blog listing gap — 5 locales, trivial change.** The page
   *file* exists and is correctly built in all 8 locales (confirmed via GSC: `/uk/raise-your-room-ranking-score`
   is actively ranking pos 4). But its entry in `blog.astro`'s articles array is missing in **de, es, ro,
   ru, uk** — present only in root (en), fr, and pt. This is exactly the "page exists, listing doesn't"
   failure mode CLAUDE.md warns about, just inverted from the historical direction (page used to be
   EN-only; now the page is universal but the *listing* lags in 5 of 8 locales). Concretely: the page is
   invisible from `/de/blog`, `/es/blog`, `/ro/blog`, `/ru/blog`, `/uk/blog` even though it's live and
   indexable at those URLs directly. Fix: add the missing entry to the blog array in those 5 files, same
   card shape as the fr/pt/root entries (tag, date `2026-...` — check `git log --follow --diff-filter=A`
   for the real first-publish date per CLAUDE.md's rule, don't guess).

2. **Geo-page titles are systemically oversized — all 6 built pages, not a one-off.** Measured byte-length
   of every geo-page `<title>`:

   | Page | Title length |
   |---|---|
   | `model-promotion-usa` | 77 |
   | `model-promotion-germany` (de) | 85 |
   | `model-promotion-romania` (ro) | 74 |
   | `model-promotion-colombia` (es) | 77 |
   | `model-promotion-spain` (es) | 73 |
   | `model-promotion-ukraine` (ru/uk) | not measured, same pattern expected |

   All are 70-85 characters against a ~50-60 char practical limit before Google truncates in SERPs —
   the "— How to Grow American Viewers" / "— Publikumsaufbau Deutschland" style suffix is the recurring
   culprit (title + subtitle crammed into one `<title>` tag instead of splitting concept across title vs.
   H1). Meta descriptions on the same pages run 169-180 chars (target ~150-160), also over. This is a
   template-level pattern, not a per-page mistake, so worth fixing as a batch pass across all 6 existing
   geo pages *and* applying the shorter pattern to whichever countries get built next (item 6 below) rather
   than repeating it. Contrast: `/model-promotion` and `/studio-traffic`'s titles from today's earlier
   shipped work are 50-53 chars — already the right length, use those as the template.

3. **Internal linking from geo pages to the site's best-performing hub pages is inconsistent and
   incomplete.** Checked all 6 geo pages for links to the 4 pages GSC shows performing best
   (`webcam-model-income-guide`, `best-streaming-times-by-region`, `stripscore-cam-rank-explained`,
   `new-model-growth`):
   - `model-promotion-usa`, `model-promotion-germany`, `model-promotion-ukraine` (the original 3-country
     batch) link to **none** of the four — they link to `webcam-earnings-by-platform` and
     `platforms-we-work-with` instead, plus cross-links to each other.
   - `model-promotion-romania`, `model-promotion-colombia`, `model-promotion-spain` (the later batch) link
     to `webcam-model-income-guide` but still miss the other three.
   - None of the 6 link to `stripscore-cam-rank-explained` or `best-streaming-times-by-region` — the two
     pages Priority 1/3 in this morning's session identified as the strongest-proven and best-performing
     locale cluster respectively. Given `/model-promotion`'s own link equity problem was already flagged
     today, feeding it (and its geo variants) more contextual links to the pages Google already trusts is
     a low-effort, high-plausibility move. Add 1-2 natural contextual links per geo page to
     `stripscore-cam-rank-explained` and `best-streaming-times-by-region`, mirrored across each page's
     locale pair.

4. **No BreadcrumbList or Article/BlogPosting structured data — confirmed still true, and confirmed the
   existing FAQPage schema is client-side-injected, not server-rendered.** `Base.astro` only emits static
   `Organization` + `WebSite` JSON-LD server-side; `FAQPage` schema is generated by a `<script>` block that
   runs in-browser after DOMContentLoaded and appends the `<script type="application/ld+json">` tag via
   `document.head.appendChild` (`Base.astro` ~line 1107-1122). Googlebot does execute JS so this likely
   still gets picked up, but it's a weaker/slower signal than server-rendering the same JSON at build time
   — Astro is static output, so there's no technical reason it needs to be client-side; it's almost
   certainly just how it was first built. Since Astro already has the FAQ content at build time (it's
   rendered into `.faq-item` markup server-side), moving this to build-time generation is a mechanical
   refactor, not new design work. Separately, no page emits `BreadcrumbList` (would help rich-result
   breadcrumbs and reinforces the site's hierarchy signal to Google) or `Article`/`BlogPosting` (would add
   `datePublished` structured data — useful since CLAUDE.md already mandates a real `date` field per blog
   card, so the data exists, it's just not exposed as schema). Recommend, in priority order: (a) move
   FAQPage to build-time/server-side, (b) add `BlogPosting` schema to blog/resources articles using the
   existing `date` field, (c) add `BreadcrumbList` sitewide via `Base.astro` using the existing nav/URL
   structure. None of this was touched this session (planning only).

5. **BongaCams/MyFreeCams/LiveJasmin/CamSoda content gap confirmed, and uneven even within the gap.**
   Grepped every root page for platform mentions: Stripchat (26 pages), Chaturbate (22), LiveJasmin (12),
   BongaCams (8), CamSoda (1), MyFreeCams (1) — all passing/comparison mentions, zero dedicated pages for
   any of the four. LiveJasmin and BongaCams at least get referenced as comparison points regularly;
   MyFreeCams and CamSoda are each mentioned exactly once sitewide, meaning the site currently has almost
   no comparison-content signal for two platforms that show up repeatedly in "cam site comparison" search
   intent. Not urgent given GSC's finding that new-content volume isn't the bottleneck (see item 8), but
   flag LiveJasmin specifically as the best next-candidate *if* a comparison-content push happens — it
   already has the most secondary mentions (12) of the four, meaning existing pages already assume reader
   familiarity with it without ever landing them on a dedicated LiveJasmin page.

6. **Geo backlog: France/Poland/Sweden reconfirmed as the right next targets — no reordering needed.**
   Re-ran the competitor searches: "webcam traffic promotion service SEO marketing agency" still surfaces
   the same recurring set (bird.marketing, seocircular.com, trafficpills.com) plus one newly-noticed
   recurring name, **prostarseo.com** (Adult SEO, North America-first positioning) — worth adding to the
   competitor watchlist. "Cam model traffic growth service France" and "webcam model promotion marketing
   agency Poland Sweden" both still return zero specialized local competitors — Poland/Sweden results are
   generic marketing/PR/influencer agencies and (for Sweden) CM Models, a traditional fashion agency, none
   of which compete on cam-specific promotion. This matches the 2026-07-10 read exactly; no new entrant
   has appeared in either market. Romania's GSC overperformance (item 7 below) is a signal about content
   *and existing page* strength, not a reason to reprioritize which *new* countries to build — Romania is
   already built. Recommendation stands: **France next, then Poland or Sweden**, each with the
   differentiation angle already scoped in the 2026-07-10 entry (France: no dedicated local agency,
   large EU market; Sweden: no cam-specific agency, only generic fashion/influencer players; Poland:
   legal/tax content dominates search, no agency competitor). Apply the shorter-title lesson from item 2
   when building these.

7. **Romania locale-parity check: RO's blog/resources listings are fully at parity with EN — the earlier
   "worth a closer look" question is resolved, no gap found.** Systematically diffed `blog.astro` and
   `resources.astro` listings across all 8 locales. `resources.astro` is identical everywhere (1 entry,
   `stripchat-first-14-days-guide`, present in all 8). `blog.astro` has exactly one discrepancy sitewide —
   the `raise-your-room-ranking-score` gap in item 1 above — and **RO is one of the 5 locales missing that
   one entry**, same as de/es/ru/uk. So RO isn't uniquely behind; it has the identical, sitewide gap. Page
   *files* are at 100% parity across all 8 locales for every non-geo page (diffed file listings directly,
   zero discrepancies beyond the geo pages, which are intentionally locale-scoped per the 2026-07-19 design
   decision already logged — geo pages exist in English root + the country's native-language locale only,
   not all 8, and that's correct, not a bug). Conclusion: Romania's GSC overperformance is genuinely
   organic content/topic-fit, not an artifact of better internal plumbing than other locales — the plumbing
   is equally good (or equally has the one shared gap) everywhere.

8. **Content strategy call: pause new-topic sprawl, keep the pipeline running but redirect it toward
   strengthening existing proven pages.** This directly answers the open question from this morning's
   session. Recommendation: **do not pause the daily pipeline, but change what "an article" means for the
   next 2-3 weeks.** GSC's core finding — 6 pages already at position 2-7 with near-zero volume, one page
   (homepage) with volume but no authority — means the bottleneck is keyword breadth and link equity on
   existing pages, not the count of published articles. A hard pause risks losing publishing cadence and
   momentum for no benefit; a full pipeline redirect would violate the Stripchat-only scope boundary
   (CLAUDE.md) without an explicit re-authorization. The pragmatic middle path, within the existing
   Stripchat-only scope: bias the next several scheduled-task topic choices toward angles that would
   naturally justify **new internal links into the 6 proven pages** (item 3's targets) rather than
   standalone topics that only link to each other — e.g., a Stripchat article about ranking/visibility
   mechanics has a natural, non-forced link into `stripscore-cam-rank-explained`; a scheduling/timing
   article has a natural link into `best-streaming-times-by-region`. This isn't a scope change, just a
   topic-selection bias within the existing scope, so no scheduled-task prompt edit is strictly required —
   flagging as a preference to apply manually next time topics are picked, and worth encoding into the task
   prompt if it proves out over a few cycles. Separately, and outside pipeline scope: `/model-promotion`
   and `/studio-traffic` link-equity work (item 3) plus the geo-page title fix (item 2) are the
   highest-leverage manual-session items queued behind this.

9. **Minor/cosmetic, no action needed:** `ru/contact.astro` and `uk/contact.astro` share an identical
   `<title>` string ("Контакт – EWO Webcam Promotion") — checked, and it's coincidental, not a translation
   bug: "Контакт" is spelled identically in Russian and Ukrainian, and the rest of both pages (meta
   description, H1, body, FAQ) are fully and correctly translated per-language (diffed directly). Not
   worth touching.

10. **Technical hygiene otherwise clean.** Live-fetched homepage, `/blog`, `/ro/stripscore-cam-rank-explained`,
    `/model-promotion`, `/studio-traffic`, `/model-promotion-usa`, `/de/model-promotion-germany`,
    `/sitemap-index.xml`, `/robots.txt` — all 200s. Single `<h1>` on every page checked, canonical tag
    present and correct (`https://www.ewohub.com/...`) on every page checked. `robots.txt` and
    `vercel.json` both consistent with CLAUDE.md's canonical-domain claim: `ewo.cam`/`www.ewo.cam` →
    `www.ewohub.com` 301s in `vercel.json`, `robots.txt` points its `Sitemap:` line at
    `https://www.ewohub.com/sitemap-index.xml`. No duplicate `<title>` or `<meta description>` strings
    found anywhere in `src/pages/**` beyond the one coincidental/harmless case in item 9. `top-performing-titles-chaturbate`
    and `chaturbate-show-prices` are each linked from only 1 other root page (thin internal linking,
    presumably just the `studio-traffic` hub card) — not broken, but worth a link or two from relevant
    Chaturbate blog content if any gets written.

#### What this session did not do
No GSC re-pull (too early since this morning's baseline). No fix applied to the `raise-your-room-ranking-score`
listing gap, geo-page titles, internal links, or structured data — all flagged above for a future execution
session, per this task's planning-only scope. No new pages built.

---

## 2026-07-27

### Shipped: "VR Shows on Stripchat: Is the Equipment Worth It?" (all 6 languages)
Published on user request, first of two dual-audience (models + studios) Stripchat articles from a fresh content plan built by researching per-country popular topics (US/DE/RO/UK-RU/ES-CO searches) instead of generic platform mechanics. Slug: `stripchat-vr-shows-worth-it`. Covers VR camera equipment cost ($300-800 range), break-even math for a solo model, and a dedicated "For Studios" section on shared-equipment economics across a roster. Added to `/blog` (tag: Stripchat) in all 6 locales.

### Shipped: "Model News for Studio Admins: What Actually Changed" (all 6 languages)
Second of the two — first article on the site written specifically for the Studio Admin audience rather than individual models. Slug: `stripchat-model-news-studio-admin`. Covers Stripchat's January 2026 update (Model News now visible to Studio Admin accounts, extended new-model promotion window, contests split by category) and what each change means operationally for running a multi-model roster. Added to `/blog` (tag: Stripchat) in all 6 locales.

**Context on the content plan shift:** user rejected an earlier 10-article Stripchat plan for being model-only/platform-mechanics-focused with no studio angle and no local grounding. Redone by researching Stripchat-related trends per target market: US (Studio Admin / Model News update, VR premium pricing), Germany (4K VR emphasis), Romania (studios running models across 6-8 platforms simultaneously), Ukraine/Russia (CIS withdrawal/payout friction, night-shift Moscow-time peak hours), Colombia/Spain (24/7 three-shift studio operations, themed rooms, HRW labor-exploitation reporting). Remaining 8 topics from that revised plan are queued but not yet written — see prior conversation for the full list (CIS payouts, LatAm shift scheduling, Romania multi-platform studios, new-model-boost 2026 update, fair-split/trust content, timezone shift coverage, recruitment compliance checklist, and a solo-vs-studio show-format comparison).

---

## 2026-07-24 (later)

### Shipped: "Goals & Tip Menus: Structured for Tips" (all 6 languages)
Published on user request ("пусть сейчас опубликует по стрипчат") outside the normal schedule, to fill
the gap immediately after the 10:00 scheduled slot had already used up the day on the (pre-restriction)
studio article. Deliberately scoped as a tactical execution piece, distinct from `how-stripscore-works`
(which explains *why* tips/goals matter for the score) — this one covers *how* to size a goal, price a
tip menu (anchoring, cheap first-tip entry point, 6-10 item length), and sequence both across a session.
Format: analytical/tactical, so blog.astro only (not resources), tag `Stripchat`.

Added right after `how-stripscore-works` in `blog.astro`'s articles array, all 6 locales. Cross-linked
in both directions: new article links to `how-stripscore-works`, `stripchat-first-14-days-guide`,
`stripchat-popular-new-model-visibility`, `stripscore-cam-rank-explained`,
`raise-your-room-ranking-score`, `why-low-viewers-webcam`; reciprocal related-cards added to
`how-stripscore-works` and `stripchat-first-14-days-guide` (all 6 locales, 12 files).

Build verified clean: 186 pages, zero errors.

### Correction: scheduled-task cadence is 2 articles/day (one per slot), not 1/day shared
Earlier same-day design assumed a shared daily cap — the 15:00 slot would skip entirely if the 10:00
slot had already published. User corrected this: each of the two daily slots (10:00, 15:00) should
independently find and publish its own distinct, non-redundant Stripchat topic. Updated both
`ewo-daily-article` and `ewo-daily-article-pm` scheduled-task prompts to check what the *other* slot
published that day (to avoid overlap) rather than skipping outright if anything shipped earlier.

---

## 2026-07-24

### Shipped: "How to Choose a Webcam Studio: Splits, Contracts, and Red Flags" (all 6 languages)
First model-facing article on the studio side of the business — a genuine content gap. Every prior
piece on the site (StripScore, algorithm ranking, new-model growth, Popular-category bias, income
guides, platform comparisons) covers platform mechanics or growth strategy; nothing existed to help a
model actually evaluate a studio contract before signing, even though `/studio-scaling` and
`/studio-traffic` (studio-facing service pages) and `/for-models` (model recruitment, including studio
placement) all sit right next to this gap. `webcam-model-income-guide.astro` only mentioned studio
splits in passing (one FAQ line: "often 50-70%" studio cut).

Article covers: why the split percentage alone is meaningless without knowing the calculation base
(gross vs. net, flat vs. tiered), 8 concrete things to check before signing (split calculation,
exclusivity, minimum-hours penalties, equipment/housing deductions, payment schedule — including the
RU/BY/CIS withdrawal-method problem flagged as a content gap back on 2026-07-22 but never used until
now — traffic actually driven vs. not, contract/exit terms, track record), a red-flags checklist, a
studio-vs-independent decision framework, and 4 FAQs. Format: analytical/breakdown (reason-cards,
similar structure to `how-stripscore-works`), not a linear step-by-step guide, so it's **blog.astro
only**, all 6 locales, tagged `Studios` (new tag — first non-platform-specific, non-generic category;
distinct from `Stripchat`/`Algorithm`/etc. since this isn't platform-specific content).

CTA points to `/for-models` (EWO's own model-recruitment page) rather than `/model-promotion`, since
the natural next step for a model reading this is "should I go independent-with-promotion or
studio-with-EWO," and `/for-models` is the more relevant conversion target. Cross-linked in both
directions: added related-card links to `/webcam-model-income-guide` and `/studio-scaling` (all 6
locales each, reciprocal), plus `/webcam-earnings-by-platform`, `/new-model-growth`,
`/platforms-we-work-with`, `/for-models` from the new article itself. (Translated `for-models.astro`
pages have no related-articles section to hook into, so skipped reciprocal links there — EN
`for-models.astro` already links to the new article.)

Build verified clean: `npm run build` succeeded, 180 pages (+6 from the new article across 6 locales),
zero errors. Spot-checked rendered HTML for the EN and RU versions via local static server — hero,
all 8 reason-cards, red-flags checklist, comparison framework, FAQ, CTA, and 6 related-article cards
all present and correctly linked.

---

## 2026-07-23 (later still)

### Category convention: platform-specific content tagged by platform, not "Algorithm"
Per explicit user instruction: the pill/tag shown on blog cards (`tag:` field in `blog.astro`) is our
content category system. Content specific to one platform's mechanics (e.g. Stripchat's StripScore)
should carry that platform's name as the tag, not a generic label like "Algorithm", even when the
content is algorithm-adjacent. Retagged `stripscore-cam-rank-explained` from `Algorithm` → `Stripchat`
in all 6 locales to match. **Note:** `stripchat-ai-model-recommendations` has the same
Algorithm-vs-Stripchat tagging inconsistency and wasn't touched — worth asking the user about for
consistency next time content tagging comes up.

### "Your First 14 Days on Stripchat" removed from `/blog` listing (all 6 locales)
Per user request, the guide-format article no longer appears on `/blog` — it now lives only on
`/resources` (the Guides feed), which is where it already was. The page itself and its `resources.astro`
listing were untouched; only the `blog.astro` array entry was removed in en/de/es/ro/uk/ru. This
narrows the earlier convention noted below ("add to resources.astro *in addition to* blog.astro") —
step-by-step guides should now be resources-only, not double-listed. Not yet pushed as of this entry.

---

## 2026-07-23 (later)

### Shipped: "How StripScore Works" mechanics deep-dive (all 6 languages)
New article at `/how-stripscore-works` — deliberately scoped to avoid cannibalizing two existing pieces:
`stripscore-cam-rank-explained` (terminology: what the word means, how it maps across platforms) and
`how-cam-algorithm-ranks-rooms` (generic cross-platform algorithm explainer). This one is a
Stripchat-specific mechanics breakdown: the 6 signals that build the score (viewer count, retention,
chat activity, tips/goals, live follows, streaming consistency), how fast it decays after a session
ends, how it interacts with the separate New Model placement window, a myth-vs-reality section, and a
practical checklist. Tag: `Stripchat`, blog-only per the established convention (analytical content,
not `/resources`).

Added to `blog.astro` in all 6 locales. Added reciprocal related-article links from
`stripscore-cam-rank-explained`, `how-cam-algorithm-ranks-rooms`, and `stripchat-first-14-days-guide`
(all 6 locales, 18 files total) so the three pieces form a coherent internal-linking cluster instead of
orphaned content. `npm run build` verified clean (174 pages), link-checker script confirmed zero broken
internal links after the change.

---

## 2026-07-23

### Full technical SEO audit + fixes (all 6 languages)
Ran a deep technical SEO audit across all 144→168 pages (code-level, not GSC-based since Chrome
extension wasn't connected this session). Found and fixed:

1. **Duplicate `<title>` suffix** — 32 files across de/es/ro/uk/ru (`about`, `new-model-growth`,
   `studio-scaling`, `how-cam-algorithm-ranks-rooms`, `best-streaming-times-by-region`,
   `platforms-we-work-with`, `why-low-viewers-webcam`) had `| EWO` baked into the `title=` prop on top of
   Base.astro's own `{title} | {siteName}` suffix, rendering `...| EWO | EWO` in `<title>`. Stripped the
   redundant suffix from all 32.
2. **Footer not localized** — `Base.astro` footer was 100% hardcoded English (hrefs with no
   `langPrefix`, English label text) on every non-English page. Rebuilt as a `footerData` table per
   locale (tagline, column titles, service/resource link labels + `langPrefix`-aware hrefs) with region
   links intentionally left unprefixed since no localized geo pages exist.
3. **Broken internal links (404s)** — `es/ro/ru/uk/about.astro` linked to nonexistent
   `/{locale}/model-promotion-{usa,germany,romania,ukraine}` pages. Repointed all 16 links to the
   existing English root geo pages.
4. **Missing `og:image` / Twitter Card** — Base.astro had no `og:image` or `twitter:*` meta at all,
   so shared links (esp. via the Telegram CTA channel) rendered no preview image. Added `og:image`,
   `og:site_name`, and `twitter:card=summary_large_image` + title/description/image, using
   `logo-neon.png` as a stopgap. **Follow-up worth considering**: a proper 1200×630 branded OG image
   would look better than the square logo crop.
5. **`robots.txt` stale domain** — `Sitemap:` line pointed to `https://ewo.cam/sitemap-index.xml` (old
   domain from the migration) instead of `ewohub.com`. Fixed.
6. **`/stripchat_promo` (underscore) links** — 24 occurrences across all 6 locales linked to the
   underscore slug, which only resolved via a 301 redirect in `vercel.json` to the real hyphenated
   `/stripchat-promo`. Repointed all 24 to the canonical hyphenated URL directly.

Verified after fix: `npm run build` succeeds (168 pages), zero duplicate titles, zero broken internal
links (script-checked against actual route list), zero `stripchat_promo` references left,
`robots.txt`/`og:image`/`twitter:card` all confirmed correct in the built `dist/` output, RU homepage
footer spot-checked showing correctly localized hrefs+labels.

**Not changed (flagged, not a bug):** the `/` → `/de,/es,/ro,/ru,/uk` Accept-Language redirect in
`vercel.json` is a deliberate 302 UX redirect, not an error — left as-is.

---

## 2026-07-22 (later)

### Nav restructure: /resources becomes a curated "Guides" feed
Per explicit user request, `/resources` (now linked from the new "Guides" nav tab) no longer lists all
site content — it's now filtered to only articles with `category: 'guides'` in the page's `articles`
array. Currently that's exactly one article: "Your First 14 Days on Stripchat" (the first true
step-by-step guide format published). The other 9 items previously listed there were removed from this
page — they remain reachable via `/blog`, which still lists everything. Rewrote all 6 locale versions to
use the same array+filter pattern (the non-EN versions previously used hand-coded grouped HTML sections,
now unified to match EN's structure) so future guide-format articles can be added here by simply setting
`category: 'guides'` on their entry. Hero copy and meta title/description updated to reflect the new
"step-by-step guides" framing. Build verified clean (144 pages).

**Convention going forward**: when publishing a new step-by-step guide article, add it to
`src/pages/{locale}/resources.astro`'s `articles` array with `category: 'guides'` in all 6 locales, in
addition to the usual `blog.astro` listing. Analytical/explainer content (algorithm breakdowns, income
guides, platform comparisons, etc.) should continue to go on `/blog` only, not `/resources`.

---

## 2026-07-22

### Shipped: "Your First 14 Days on Stripchat" step-by-step guide (all 6 languages)
Third Stripchat topic, written after a Russian-segment competitor pass found a direct competitor
(startmodel.ru's dedicated StripScore page) confirming two concrete facts our earlier articles only
described generically: new accounts get a **14-day "New" tag** placing them in a separate **New Models**
category, and profile completeness has a measurable ranking effect via specific thresholds — **background
photo/video, ≥5 public photos, ≥1 public video, ≥4 filled profile panels**. Also confirmed independently
by a Medium personal account. This guide turns those specifics into an actual step-by-step plan:
register → build profile to the thresholds *before* first stream → use all 14 days consistently → what
happens after the tag expires. Shipped as `/stripchat-first-14-days-guide` + 5 locales, cross-linked
with `/stripchat-popular-new-model-visibility`, `/how-cam-algorithm-ranks-rooms`,
`/raise-your-room-ranking-score`, `/stripscore-cam-rank-explained`, `/new-model-growth`. Build verified
clean (144 pages, up from 138).

**Follow-up not yet done**: the 14-day figure and profile thresholds could also strengthen the earlier
`/stripchat-popular-new-model-visibility` article, which described the New Model Promotion window only
generically. Consider updating it to reference the concrete numbers now that they're confirmed by two
independent sources.

**Also found but not acted on**: RU/CIS segment competitors (dtf.ru, vc.ru — high-authority Russian
platforms) publish Stripchat overview content with a payout-method angle specific to Russian/Belarusian
creators (Paxum/Cosmo/ePayments/SEPA, no direct RU/BY card withdrawal) that we don't cover at all. Real
content gap if we want to compete for RU-language search specifically, not just translate EN content.

### Design system migration: Deep Wine
The site got a full visual redesign (an external/parallel process, not this session) — all new pages must
follow `src/pages/_article-template.astro` and the "Deep Wine" classes documented in `CLAUDE.md`
(`art-hero`, `glass-card`, `reason-card`, `faq-section`, `art-cta`, `related-grid`, etc.). The old template
(`page-content`, `page-header`, `eyebrow`, `cta-section`, `related-articles`) is deprecated — do not use it
for new pages going forward.

### Shipped: "Why the Same Models Always Show Up in Stripchat's Popular" (all 6 languages)
Second topic from the Stripchat-specific backlog (2026-07-21): explains the documented viewer-count
feedback-loop bias in Stripchat's Popular category, and — grounded in real 2025-2026 platform changes
(BCAMS Magazine reporting) — covers concrete counter-levers most new models don't know exist: female
leaderboards expanded ~100→1,000 positions split by continent, Guys/Trans leaderboards expanded Top
20→Top 100 with cash prizes, category-split contests, and a New Model Promotion visibility window.
Written first in the old template, then rewritten in the new Deep Wine template after discovering
`CLAUDE.md`'s design-system requirement mid-task. Shipped as `/stripchat-popular-new-model-visibility` +
5 locales, cross-linked from the article itself to `/how-cam-algorithm-ranks-rooms`,
`/stripchat-ai-model-recommendations`, `/raise-your-room-ranking-score`, `/stripscore-cam-rank-explained`,
and `/new-model-growth`. Added to blog.astro + resources.astro in all 6 locales. Build verified clean
(138 pages, up from 127).

Remaining topics from the 2026-07-21 Stripchat backlog (not yet written): mobile streaming via Plasma
app, VR/Lovense monetization, 2026 contest categories (partially covered by this article's contest
section — revisit before writing a dedicated piece to avoid overlap), Stripchat-specific token/payout
deep dive, category/tag optimization guide, studio vs independent on Stripchat specifically, Stripchat
vs Chaturbate comparison, first-weeks onboarding guide.

---

## 2026-07-21

### Domain migration: ewo.cam → ewohub.com
Site moved from ewo.cam to **www.ewohub.com** (confirmed planned). `astro.config.mjs` already points to
the new domain; ewo.cam now returns 404. **Search Console is still connected to the old ewo.cam property
only** — `scripts/fetch-search-console.mjs` looks for an `ewohub.com` property but the service account
has no access to one yet. Action needed: add `ewohub.com` as a property in Search Console (DNS TXT
verification), then add `ewo-seo-bot@imposing-fin-300612.iam.gserviceaccount.com` as a Full user on it.
Until then, GSC-driven analysis in this plan is stale (last real pull was against ewo.cam pre-migration).

### Shipped: "Stripchat AI Model Recommendations" article (all 6 languages)
First topic from the new 10-topic Stripchat-specific backlog (2026-07-21): explains Stripchat's 2026 AI
"Recommended for You" feed (matches viewer interaction history/"vibe" to models) as a second discovery
channel separate from Popular-category rankings, and gives concrete optimization steps (accurate
category/tag signal, consistent identity, encouraging follows) grounded in what's publicly reported
about the feature. Shipped as `/stripchat-ai-model-recommendations` + 5 locales, cross-linked from
`/how-cam-algorithm-ranks-rooms` and `/raise-your-room-ranking-score`. Build verified clean (127 pages,
up from 121).

Remaining 9 Stripchat topics from the 2026-07-21 backlog (not yet written): Popular-category discovery
bias for new models, mobile streaming via Plasma app, VR/Lovense monetization, 2026 contest categories,
Stripchat-specific token/payout deep dive, category/tag optimization guide, studio vs independent on
Stripchat specifically, Stripchat vs Chaturbate comparison, first-weeks onboarding guide.

---

## 2026-07-19

### Shipped: "What Is Stripscore? Cam Rank Explained" article (all 6 languages)
Published item #5 from the 10-topic backlog: a terminology/glossary explainer for "stripscore" and
"cam rank" — the two query terms already getting real impressions in Search Console (stripscore at
position 4.1, cam rank at position 52.5). Deliberately scoped as a definitional/comparison piece
(what the terms mean, how the concept maps across Chaturbate/Stripchat/BongaCams/LiveJasmin) rather
than duplicating the existing `/how-cam-algorithm-ranks-rooms` (full signal breakdown) or
`/raise-your-room-ranking-score` (legitimate playbook) — this avoids the keyword-cannibalization
pattern already found once (homepage vs `/stripchat_promo` competing for the same query). Shipped as
`/stripscore-cam-rank-explained` + 5 locales, cross-linked from both existing algorithm pages and
`/stripchat_promo`.

**Note**: while translating, found that all locale versions had been linking (or would have linked)
to `/raise-your-room-ranking-score` using locale-prefixed URLs (`/de/raise-your-room-ranking-score`
etc.) — but that page is still English-only (the Priority 1 gap flagged 2026-07-10, not yet fixed).
Fixed by pointing all new cross-links to the English URL instead of a 404. The underlying gap
(translating that page into all 5 locales) is still open and remains Priority 1.

Build verified clean (121 pages, up from 115).

### Shipped: "Webcam Earnings by Platform" article (all 6 languages)
Published item #2 from the 10-topic content backlog (2026-07-10 plan): a Chaturbate vs Stripchat vs
BongaCams vs LiveJasmin payout comparison, grounded in real researched payout data (Chaturbate flat
$0.05/token ~40-50% effective; Stripchat 50-60%; BongaCams 25-65% tiered; LiveJasmin 30-80% tiered by
level). Shipped as `/webcam-earnings-by-platform` + `/de/`, `/es/`, `/ro/`, `/uk/`, `/ru/` — full-depth
in every locale (not a shortened translation), matching the "all languages together" rule. Cross-linked
both directions with `/webcam-model-income-guide` to reinforce internal signals for that page's
underperforming query cluster (see re-check below). Added to `blog.astro` and `resources.astro` in all
6 locales. Build verified clean (115 pages).

Intentionally did NOT ship the other 9 backlog topics in the same pass — batching 10 topics × 6
languages at once was flagged and paused earlier today as a scaled-content-abuse risk; this was a
single-topic, full-quality pass instead.

### Search Console re-check — traffic is growing, still pre-click stage
28-day window (2026-06-20 → 2026-07-17), vs. the 2026-07-10 check (4 impressions/4 pages total): now **19 pages and 16 distinct queries getting impressions**, but still only **1 total click** across everything.

**Priority 1 — push `"stripscore" stripchat` over the edge**: 8 impressions at position **4.1**, the best-positioned query in the whole account. Identify which page ranks for it and strengthen title/meta/internal links to push into top 3 — closest thing to a quick win right now.

**Priority 2 — `/webcam-model-income-guide` is under-ranking for its own target queries**: 27 impressions matching exactly the queries it targets ("how much do webcam models earn/make", "webcam earnings", "webcam income", "make money on/with web cam"), but position 49-78 (page 5-8). Google knows it's relevant but doesn't rank it — likely needs more depth/data or a more engaging format (recall arunatalent.com's interactive earnings calculator competing for this same intent, noted 2026-07-10). Biggest single content-investment opportunity right now.

**Weak spots to investigate:**
- `/blog` — position 88, essentially invisible
- `/uk/model-promotion` — position 99, worst in the dataset
- `/model-promotion` (root) — only 2 impressions, position 43.5

**Small positive signal**: `/platforms-we-work-with` has 1 click / 4 impressions (25% CTR) at position 18.5 — when it does show, people click. Worth pushing its position up.

Homepage: 34 impressions at position ~6.9 but 0 clicks — title/meta may not be compelling for whatever queries are actually triggering it (not enough per-query volume yet to break this out further).

---

## 2026-07-10

### Correction
- Project memory had the wrong production domain (`ewo.com`). The real domain is **`ewo.cam`** (per `astro.config.mjs` `site:` field and live DNS). `ewo.com` belongs to an unrelated Italian LED-lighting company. All future technical checks/monitoring must target `ewo.cam`.

### Search Console connected (update, same day)
- Google Search Console API is now live: service account `ewo-seo-bot@imposing-fin-300612.iam.gserviceaccount.com` has "Full" access on the `sc-domain:ewo.cam` property. Data pulled via `scripts/fetch-search-console.mjs`.
- Last 28 days (2026-06-12 → 2026-07-09): **4 total impressions, 0 clicks, across only 4 pages** (`/`, `/platforms-we-work-with`, `/studio-traffic`, `/why-low-viewers-webcam`). `topQueries` came back empty — too little volume for Google to report individual queries.
- Reading: this is expected for a domain this young — there isn't yet enough signal to data-drive page-level SEO decisions (can't tell which titles/CTAs work, no real query data to chase). Don't over-index on the single "position 1" impression on `/studio-traffic` — that's one impression on an unknown long-tail query, not a ranking win to build on.
- **Consequence for priorities**: the bottleneck right now isn't on-page optimization, it's *getting indexed and getting enough impression volume to have data at all*. That reframes Priority 1 and 2 below — more indexable, correctly-linked pages (translations, geo pages) matter more right now than micro-optimizing existing pages, since there's no CTR/position data yet to optimize against.
- Re-run this script in 2-4 weeks once impression volume is high enough (dozens+ per page) for query/CTR patterns to be meaningful.

### Correction — wrong competitor category (2026-07-10, later same day)
The two competitor-analysis passes below (all-14-countries and the first generic pass) searched "webcam model promotion agency [X]" and mostly surfaced **talent/studio agencies** — companies that recruit and host models, take a revenue split, provide physical studio space. That is NOT EWO's business. EWO is a **promotion/traffic/SEO/analytics service** (per its own page set: `/model-promotion`, `/studio-traffic`, `/how-cam-algorithm-ranks-rooms`, `/raise-your-room-ranking-score`, `/best-streaming-times-by-region`, `/stripchat_promo`) — it doesn't recruit or host models. Keep the sections below for country/market context (they're still useful background on local industry scale/legality), but treat the "competitor" framing in them with caution — most of those studio brands are not actually competing with EWO for the same customer intent.

### Competitor analysis — correct category: promotion/traffic/SEO/analytics services (2026-07-10)
Searched: "webcam model traffic promotion service SEO marketing", "webcam room ranking booster service", "chaturbate stats analytics tool best hours to stream", "cam model traffic growth service not agency", "stripchat promotion service bot viewer boost", "webcam studio traffic growth marketing company".

**SEO/marketing agencies (compete with `/model-promotion`, `/studio-traffic`):**
- seocircular.com — "Cam Site SEO & Digital Marketing for Adult Webcam Sites"
- bird.marketing — "Adult SEO Agency, Webcam Model SEO" (has a public case study, "Camiplay")
- trafficpills.com — "Adult SEO Services — Escort and OnlyFans SEO Agency"
- zigma.ca — "Internet Marketing Strategies for Public Webcam" (SEO/PPC)
- kgbwebcammodels.com — combines model management with promotion

**Analytics/stats tools (compete with the homepage "best hours" trends widget and `/best-streaming-times-by-region`):**
- cbcaminsights.com (CB Cam Insights) — tip/tipper tracking, best-hours analytics, scheduling
- camcashgrl.com (CamCash) — Chaturbate earnings tracker: tips, tokens, best hours, top fans dashboard
- streamersuite.com — SEO/marketing blog *and* an Analytics Dashboard for best-performing times (dual-purpose, direct overlap with EWO's positioning)
- togetherwecam.com — analytics-for-growth guides

**Viewer/traffic bot sellers (the explicit target of `/raise-your-room-ranking-score`'s "not bots" angle):**
- viewerbot.webcam — sells viewer bots for Stripchat/Chaturbate/Bongacams/Camsoda/Cam4/Amateur.tv directly
- stream-promotion.ru — viewer/follower boosting (cross-platform, cam-adjacent)
- BlackHatWorld forum sellers — informal marketplace for Chaturbate/Stripchat/Bongacams follower bots
- onlytraffic.com — CPA/affiliate network with Stripchat offers (17% revshare) — adjacent traffic channel, not a direct competitor

**Implication:** unlike studios, most of these are global service brands without country-specific landing pages, so the earlier per-country search loop (built for studios) isn't the right mechanism for this category — a handful of focused non-geo searches surfaces them more efficiently. The promotion-planner agent has been updated to search this category by default; per-country studio searches are demoted to optional background context only.

### Competitor analysis — all 14 target countries (2026-07-10, extended pass, studio-focused — see correction above)
Searched "webcam model promotion agency [country]" for all 14 target markets (6 built + 8 backlog). Caveat: the search tool queries a single US-indexed English source, not localized google.de/google.pl/etc. — real local-language searches (German, Polish, Romanian…) would surface different, more locally-relevant competitors. Treat this as a first pass, not definitive local SEO research.

**Cross-market competitors — the same handful of brands surface almost everywhere, regardless of country:**
- **arunatalent.com** — showed up in 9 of 14 country searches (USA, Canada, Bulgaria, Germany, Sweden, France, Netherlands, Spain, +the generic queries from the first pass). Their "Best Webcam Agencies 2026" roundup and "How Webcam Modeling Agencies Work" guide are ranking as generic authority content across markets, not localized — this is the single most dominant competitor content-wise.
- **highsocietymodelsxoxo.com**, **zephora.work** — recurring across 5-6 countries each, same pattern (generic international content ranking broadly).
- **cmmodels.com** — structurally the most relevant competitor to watch: they run **per-country landing pages** (`cmmodels.com/europe/russia`, `/europe/sweden`, `/europe/netherlands`, `/europe/spain`, `/europe/spain/madrid`), which is exactly the geo-page strategy EWO is executing. Worth periodically checking their page count/coverage as a proxy for how fast a competitor is executing the same playbook.
- **adent.io** "Top 10 Webcam Model Studios and Agencies of 2026" — recurring roundup, same generic-authority pattern as arunatalent.com.

**Per-country competitive density (informs backlog prioritization):**
- **Low local competition (best opportunities):** France (no dedicated local agency found at all — only international brands), Sweden (no webcam-specific local agency, just traditional fashion agencies + CM Models' generic page), Poland (per earlier search — legal/tax content dominates, no agency competitor), Germany (despite already being built — only one unrelated general modeling agency found locally, weak local competition for the existing `/model-promotion-germany` page).
- **High local competition (harder, but validates market size):** England/UK (most saturated market found — 9+ dedicated UK webcam agencies: OTR Models, Twilight Models, Eden Collective, Platinum Dolls, Moonlit Models, Strictly Models, Dollhouse Live, ShyGirl), Colombia (already built — mature market, 5+ established Bogotá/Medellín studios), Canada (2 agencies explicitly claim "#1 in Canada" positioning — Canadian Webcam, Apex Cam Studios — more contested than assumed when Canada was suggested as a quick win earlier today).
- **Flag before targeting — legal/reputational sensitivity:** Russia (industry described as "underground"/semi-legal in search results, models in unregistered studios — targeting this market with promotional content carries compliance and reputational risk worth a deliberate decision, not a default yes), Ukraine (sources describe studios as "openly advertising... despite being illegal" — same caution applies), Romania (huge legitimate market — 400k+ workers, $373M/year — but recent press ties the industry to the Andrew Tate case, a reputational association worth being deliberate about in any Romania content/messaging, even though a Romania page is already built and live).

**Revised recommendation for next geo pages** (supersedes this morning's Canada/Poland suggestion): **France and Sweden look like the most open opportunities** — real market size (both are established EU markets referenced repeatedly in search results) with no entrenched local webcam-agency competitor found. Poland remains a good pick too (from the earlier pass). Canada is still viable but should be scoped knowing two competitors already claim the "#1 in Canada" position.

---

### Competitor analysis via search (first pass, generic + Poland — same day)
Searched: "webcam model promotion service agency", "cam model traffic growth agency", "studio traffic promotion webcam models", "webcam model promotion Poland" (geo query for current build priority).

**Recurring competitor domains (showed up across multiple searches — watch these specifically):**
- **arunatalent.com** — appeared repeatedly: agency page, a "webcam agency guide" blog post, a "Best Webcam Agencies 2026" roundup, *and* an interactive "Cam Model Earnings Calculator" tool. This is the most SEO-invested competitor seen — they're covering the same ground as EWO's `/webcam-model-income-guide` but with an interactive calculator instead of a static guide, plus a comparison/roundup format ("Best Webcam Agencies 2026") that's a strong link-magnet content type EWO doesn't have.
- **adent.io** — "Top 10 Webcam Model Studios and Agencies of 2026" roundup, appeared in 3 of 4 searches.
- **newindustrymodels.com** — appeared twice, positions itself on "highest paying" angle.
- **promostudio.biz** — self-describes as "the first digital agency for webcam business in the world," direct studio-traffic-promotion competitor.

**EWO did not appear in any of these result sets** — consistent with the Search Console finding (site is too new/under-indexed to compete for these terms yet). Not a surprise, just confirms the current priority (indexation/volume) over competing head-on for these queries today.

**Content-gap ideas surfaced:**
- A "Best Webcam Promotion Agencies/Services" comparison/roundup page is a proven format (arunatalent.com and adent.io both rank with this exact content type) — EWO doesn't have an equivalent. Worth considering once there's enough indexed content to link from.
- An interactive earnings calculator (like arunatalent.com's) could out-perform EWO's static `/webcam-model-income-guide` for engagement/backlinks — flagging as a possible future enhancement, not urgent.

**Poland-specific finding**: no direct agency competitor dominates "webcam model promotion Poland" — top results are legal/tax explainer content (aksis.agency: webcam modeling legality, JDG sole-proprietorship registration, PKD business codes) and generic social-media-promotion advice, not competing agency service pages. This validates Poland as a genuinely open opportunity, and confirms the local-differentiation angle to use when that page gets built: lead with Poland's specific legal/tax registration process (JDG, PKD 59.12.Z/63.12.Z), not a generic country-swapped page.

### Technical check (ewo.cam) — no issues found
- Homepage: HTTP 200, title/meta description present and reasonable, canonical tag present, hreflang set correctly (en/de/es/ro/uk/ru + x-default).
- `robots.txt`: permissive, points to correct sitemap.
- `sitemap-index.xml` → `sitemap-0.xml`: valid.

### Priority 1 — Fix missing translation (violates the "all languages together" rule)
- `/raise-your-room-ranking-score` exists only in English (`src/pages/raise-your-room-ranking-score.astro`). All 5 translated locales 404 on it: `/de/`, `/es/`, `/ro/`, `/uk/`, `/ru/raise-your-room-ranking-score`.
- Action: translate and add this page to all 5 locale folders before any other content work ships, per the standing rule that site changes must be mirrored across all languages.

### Priority 2 — Phase 2 geo-page backlog status
Built so far (6 of original 13 target countries, plus one addition):
- USA, Germany, Romania, Ukraine (root + `uk`/`ru` locales), Colombia (`es`), Spain (`es`, not in original 13-country list — scope was expanded).

Still missing (8 of the original 13): **Canada, Bulgaria, Russia, Sweden, Poland, France, England, Netherlands.**

Suggested next 2 to build (pick countries with a real distinct angle, not template swaps):
- **Canada** — bilingual EN/FR market, overlaps US streaming peak hours but distinct payment/tax and platform-availability considerations for models; page should live at root (English) with a genuine Canada-specific section, not a US clone.
- **Poland** — large, fast-growing Central European cam-model source market; CET timezone differentiation from Romania/Ukraine already covered; would pair well with existing `ro`/`uk` content strategy but needs its own locale-appropriate framing (can ship in English root first if no `pl` locale exists yet — confirm before adding a new locale).

### Priority 3 — Internal linking
- `/raise-your-room-ranking-score` and `/how-cam-algorithm-ranks-rooms` cover adjacent topics (ranking mechanics vs. how to raise ranking) — add reciprocal internal links between them once the translation gap (Priority 1) is closed, in all locales.
- `/webcam-model-income-guide` and `/best-streaming-times-by-region` are natural links from the geo pages (USA/Germany/Romania/Ukraine/Colombia/Spain) — verify each geo page links out to both.

### Data availability note
- Search Console is now connected (see update above), but volume is still too low (4 impressions/28 days) to drive page-level decisions. GA / rank-tracking beyond Search Console is still not connected. This plan is still primarily based on site structure and git history, with GSC data used only to confirm the site is indexed at all, not to prioritize individual pages yet.

### Not done (out of scope for a planning pass)
- No site content was changed, no pages created/edited, no commits made.
