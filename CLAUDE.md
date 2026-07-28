# EWO Site — Reference

Single source of truth for how this site is built. Verified against the actual code on 2026-07-27 — where this doc and the code ever disagree again in the future, trust the code and fix this file, not the other way around.

## Stack & deploy

- Astro 5, static output, TypeScript in frontmatter (`const x: string` is fine in `.astro` files)
- Repo → GitHub → Vercel autodeploy on push to `main`
- **Canonical domain: `https://www.ewohub.com`** (set in `astro.config.mjs` `site:`). `ewo.cam` and `www.ewo.cam` 301-redirect to it via `vercel.json`. Do not hardcode `https://ewohub.com` (no `www`) in new pages — copy the `const site = 'https://www.ewohub.com';` line from an existing page.
- **Live-site verification gotcha:** `curl https://www.ewohub.com/...` without `-L` hits a redirect and returns an empty-ish body — looks like "nothing deployed" when it isn't. Always use `curl -sL`. Also, CSS is bundled into a hashed `/_astro/*.css` file in production, not inlined — grepping the HTML response for a CSS rule will never match; fetch the linked stylesheet separately if you need to confirm a style change is live.
- Push automatically once a change is verified (build passes + browser check) — don't wait for explicit "push" instruction, per standing user preference.

## Locales

**8 locales are live:** `en` (root, no prefix), `de`, `es`, `ro`, `uk`, `ru`, `fr`, `pt` (`fr`/`pt` added later — 31 pages each vs ~32 for the older ones, close to full parity).

**Known gap (unresolved as of 2026-07-27):** `src/layouts/Base.astro` has `fr`/`pt` in `langLabels` (so they show correctly in the language switcher), but **`navLabels`, `ctaLabels`, `menuLabels`, and `footerData` have no `fr`/`pt` entries** — those all fall back to the English strings (`?? navLabels.en` etc.), so French/Portuguese pages currently render nav ("For Models"/"For Studios"/"Guides"), the "Get Started" CTA, the mobile "Menu" label, and the entire footer in English even though the page body is translated. Fix by adding `fr`/`pt` blocks to all four dictionaries in `Base.astro`, mirroring the `es`/`ro`/etc. entries.

Also: `vercel.json`'s `accept-language` auto-redirect rules only cover `de/es/ro/ru/uk` — no `fr`/`pt` rule was added, so French/Portuguese browsers won't auto-redirect off the English homepage.

**Rule: when you ship a content change, ship it in all 8 locales, same day, same commit or same session.** Don't leave a page translated in 6 and missing in 2 — that's exactly the kind of drift this doc exists to prevent. `raise-your-room-ranking-score` and a few other early pages are historically missing from `de`/`es`/etc. `blog.astro` listings even though the page itself exists in that locale — check both the page file AND its listing entry in `blog.astro`/`resources.astro` when adding a language.

## Design system (actual, not aspirational)

The site is **grayscale/black-white ("EWOhub" branding)**, not the pink "Deep Wine" theme old docs used to describe. Tokens (`Base.astro` `:root`):

- `--bg: #fafaf8` · `--bg-raised: #f4f4f2` · `--bg-subtle: #f0f0ee`
- `--fg: #0a0a0a` · `--fg-muted: rgba(10,10,10,.68)` · `--fg-faint: rgba(10,10,10,.48)`
- `--accent: #0a0a0a` · `--accent-2: #555555`
- `--font-heading: 'Josefin Sans'` (headings) · `--font-body: 'Nunito'` (body)
- Site name in `<title>` suffix: `| EWO`. Logo brand text: `EWOhub`.

**Before styling anything, read the live values in `Base.astro` — don't trust any color/token described in prose (including this file) without a quick grep, since this has drifted from docs before.**

## Article page structure — two variants exist, pick TOC for new content

All content pages use `<Base>` + the global `art-*` classes (never add a `<style>` block to a page — everything lives in `Base.astro`).

**Variant A — flat (older/simpler pages):**
```
<div class="art-body">
  <div class="container">
    <p class="art-intro">...</p>
    <section class="section">...</section>
    ...
  </div>
</div>
```

**Variant B — sticky TOC sidebar (now the standard for any content-heavy article, i.e. anything with 4+ H2 sections):**
```
<div class="art-body container">
  <div class="art-layout">
    <aside class="art-toc">
      <p class="art-toc__title">Contents</p>
      <ol class="art-toc__list">
        <li><a href="#some-id">Section Label</a></li>
        ...
        <li><a href="#faq">FAQ</a></li>
      </ol>
      <a href="#cta" class="art-toc__cta">Get help →</a>
    </aside>
    <main class="art-main">
      <p class="art-intro">...</p>
      <section class="section" id="some-id">...</section>
      ...
      <section class="faq-section section" id="faq">...</section>
      <section id="cta" class="art-cta section">...</section>  <!-- must have id="cta" for the TOC "Get help" link -->
      <section class="section">...Related Articles (no TOC entry)...</section>
    </main>
  </div>
</div>
```
- Every top-level content `<section>` that has an `<h2>` gets a TOC entry **except** the "Trending right now" promo section, the CTA section, and the "Related Articles" section — those three are intentionally excluded.
- `.art-layout` collapses to one column and hides `.art-toc` under 900px (already handled in CSS, nothing to do).
- **All 8 Stripchat-tagged articles now use Variant B, consistently, across all locales** (fixed 2026-07-27 — they used to be split flat/TOC and it looked broken once several were listed together on `/blog`). Match this for any new multi-section article regardless of topic.
- `"Contents"` / `"Get help →"` per-locale strings: en "Contents"/"Get help →", de "Inhalt"/"Hilfe erhalten →", es "Contenido"/"Obtener ayuda →", ro "Cuprins"/"Obține ajutor →", uk "Зміст"/"Отримати допомогу →", ru "Содержание"/"Получить помощь →". (fr/pt not yet established — pick something consistent when those locales get TOC pages.)

### CTA button classes — two patterns both work, prefer the explicit one for new pages

The CSS defines **both** `.btn.btn-primary` (generic) and `.art-cta__btn.art-cta__btn--primary` (CTA-specific, includes hover/opacity). Existing pages are split roughly 50/50 between `class="art-cta__btn--primary btn btn-primary"` and `class="art-cta__btn art-cta__btn--primary"`. **For new pages, use `art-cta__btn art-cta__btn--primary` / `art-cta__btn art-cta__btn--ghost`** — it's the only pattern that supports a clean two-button CTA (primary + ghost side by side), which is increasingly the norm for dual-audience (models + studios) content.

### Other global classes (non-exhaustive, check `Base.astro` before assuming a name)
`glass-card`, `reason-card`/`reason-num`/`reason-content`, `highlight-box`(`--warning`), `checklist`, `pull-quote`, `two-col-box`(`__item--good`/`--bad`), `summary-card`, `faq-section`/`faq-item`/`faq-chevron`/`faq-body`, `related-grid`/`related-card`, `card-date` (publish-date text on blog/guide cards).

## `/blog` vs `/resources` ("Guides")

- **`/resources`** shows ONLY entries with `category: 'guides'` in each locale's `resources.astro` (currently just `stripchat-first-14-days-guide`) — step-by-step onboarding-style content only.
- **`/blog`** shows everything else — analytical/explainer/comparison content (algorithm breakdowns, income guides, platform comparisons, reviews).
- A page lives on ONE of the two, not both.
- Both listings share the same card shape: `{ href, title, desc, tag, mins (blog only), date, category (resources only) }`. `tag` drives the filter-pill bar (`data-tag` on the card, `.blog-filter-btn` buttons toggle `.is-hidden`). Platform-specific content should be tagged with the platform name (`Stripchat`) not a generic label like `Algorithm`.
- **Date field:** every entry has `date: 'YYYY-MM-DD'` — this must be the article's real first-publish date (check `git log --follow --diff-filter=A --format=%ad --date=short -- <file>` if unsure, don't guess), same value across all locales. Rendered via a per-file `fmtDate()` helper using `Intl.DateTimeFormat` with a locale-appropriate `dateLocale` const (`en-US`, `de-DE`, `es-ES`, `ro-RO`, `uk-UA`, `ru-RU`) — don't hand-translate month names.
- **CSS specificity trap already bit us once:** `.is-hidden` must stay `display: none !important` (Base.astro) — a bare `.is-hidden` without `!important` loses to `.related-card { display: flex }` by source order and silently breaks the filter buttons (looked like they worked — button highlighted — but nothing actually hid). If the filter ever looks broken again, check this first before assuming JS is at fault.

## "Trending right now" promo block

Every Stripchat-tagged article (except `stripchat-promo` itself) ends with a promo card linking to `/stripchat-promo`, placed directly above the closing CTA section. Copy is reused verbatim from the homepage's already-translated version per locale (don't re-translate). Markup (inline styles, since it's a one-off not worth a new global class):
```html
<section class="section">
  <h2>Trending right now</h2>
  <p style="color:var(--fg-muted);margin:-0.5rem 0 1.25rem;">The promotion service our clients ask about most this month.</p>
  <a href="/stripchat-promo" class="glass-card" style="display:flex;flex-wrap:wrap;overflow:hidden;padding:0;text-decoration:none;">
    <div style="flex:1 1 280px;min-height:200px;">
      <img src="/images/stripchat-traffic-promo-banner.webp" alt="..." style="width:100%;height:100%;object-fit:cover;display:block;" loading="lazy">
    </div>
    <div style="flex:1 1 320px;padding:1.75rem;display:flex;flex-direction:column;justify-content:center;">
      <span class="art-tag" style="width:fit-content;margin-bottom:.875rem;">Stripchat</span>
      <h3 style="font-size:1.3rem;font-weight:700;color:var(--fg);margin-bottom:.625rem;">Stripchat Traffic Promo</h3>
      <p style="font-size:.9rem;color:var(--fg-muted);line-height:1.65;margin-bottom:0;">...</p>
      <span style="font-size:.875rem;font-weight:600;color:var(--fg);margin-top:.875rem;">Read the full review →</span>
    </div>
  </a>
</section>
```
If this section ever gets picked up by an automated TOC script, **exclude it explicitly** (match on `stripchat-traffic-promo-banner` in the section body) — it is not a content section and should never get a `#sec-N` id or TOC entry.

## Autonomous content pipeline

Two scheduled cloud tasks publish articles automatically: `ewo-daily-article` (10:00) and `ewo-daily-article-pm` (15:00). **Hard scope: Stripchat-only topics** — no cross-platform/generic/studio-business topics unless explicitly re-authorized. Cadence is one article per slot (2/day total), each slot checks what the other already published that day to avoid overlap. If scope or cadence ever changes, update both task prompts via `update_scheduled_task`, not just one.

## Known content/structure gaps (2026-07-27 snapshot — re-check before assuming still true)

- **fr/pt nav/footer localization incomplete** (see Locales section above) — highest-priority fix, it's a live rendering bug on ~62 pages.
- No deep content for BongaCams / MyFreeCams / LiveJasmin / CamSoda — only Stripchat and Chaturbate have article clusters; competitors cover multi-platform comparisons where this site doesn't.
- Phase 2 geo-page plan (13 countries) is only ~6 built (USA, Germany, Romania, Ukraine, Colombia, Spain); Canada, Bulgaria, Russia, Sweden, Poland, France, England, Netherlands still missing.
- No BreadcrumbList or Article/BlogPosting structured data on content pages (only Organization/WebSite + client-side-generated FAQPage).

## Where else to check

- `PROMOTION_PLAN.md` — dated running log of what shipped and why (chronological, not a reference doc — don't duplicate its content here, just consult it for history).
- `src/pages/_article-template.astro` — copy-paste starting point, currently Variant A (flat). If you're starting a new content-heavy article, build it as Variant B (TOC) directly rather than copying the template and retrofitting.
