# EWO Site — Claude Instructions

## Design System: Deep Wine Theme

**ALL pages use the Deep Wine design system. Never use the old design.**

The site was fully migrated from an old indigo/purple theme to the "Deep Wine" theme. Any new page MUST follow the new design.

### ❌ OLD design — DO NOT USE

```astro
<article class="page-content">
  <div class="container">
    <header class="page-header">
      <p class="eyebrow">Guide</p>
      <h1>Title</h1>
      <p class="lead">...</p>
    </header>
    <section>...</section>
  </div>
</article>
<style>
  .page-content { ... }
  .page-header { ... }
  .eyebrow { ... }
</style>
```

### ✅ NEW design — ALWAYS USE THIS

Copy the template from `src/pages/_article-template.astro`.

Structure overview:
```astro
<Base title="..." description="..." lang="en" hreflang={[...]}>

  <section class="art-hero">
    <div class="art-orb art-orb--1"></div>
    <div class="art-orb art-orb--2"></div>
    <div class="art-grid"></div>
    <div class="art-hero__inner container">
      <div class="art-meta">
        <span class="art-tag">Category</span>
      </div>
      <h1 class="art-title">Title with <span class="art-grad">gradient word</span></h1>
      <p class="art-lead">Lead paragraph.</p>
    </div>
  </section>

  <div class="art-body">
    <div class="container">
      <p class="art-intro">Short intro paragraph.</p>

      <!-- Content sections -->
      <section class="section">
        <h2>Section Title</h2>
        <div class="glass-card" style="margin-top:1.25rem;">
          <p>Content...</p>
        </div>
      </section>

      <!-- Numbered reasons/steps -->
      <section class="section">
        <div class="reason-card">
          <div class="reason-num">01</div>
          <div class="reason-content">
            <h3>Step title</h3>
            <p>Description.</p>
          </div>
        </div>
      </section>

      <!-- FAQ -->
      <section class="faq-section section">
        <h2>FAQ</h2>
        <div class="faq-item">
          <button class="faq-chevron" aria-expanded="false">
            <span>Question?</span>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M5 7.5l5 5 5-5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </button>
          <div class="faq-body"><p>Answer.</p></div>
        </div>
      </section>

      <!-- CTA -->
      <section class="art-cta section">
        <div class="art-cta__orb"></div>
        <div class="art-cta__inner">
          <span class="art-cta__badge">Badge text</span>
          <h2>CTA Heading</h2>
          <p>CTA description.</p>
          <div class="art-cta__actions">
            <a href="/model-promotion" class="art-cta__btn--primary btn btn-primary">CTA Button →</a>
          </div>
        </div>
      </section>

      <!-- Related articles -->
      <section class="section">
        <h2>Related Articles</h2>
        <div class="related-grid">
          <a href="/some-page" class="related-card">
            <span class="related-card__icon">📈</span>
            <span>Article title</span>
          </a>
        </div>
      </section>

    </div>
  </div>

</Base>
```

## Available CSS Classes (all global, defined in Base.astro)

### Layout
- `art-hero` — hero section with gradient bg
- `art-hero__inner container` — ALWAYS include BOTH classes
- `art-orb art-orb--1` / `art-orb art-orb--2` — decorative orbs in hero
- `art-grid` — grid pattern overlay in hero
- `art-body` — main content wrapper
- `art-intro` — intro paragraph after hero

### Typography
- `art-title` — large hero h1
- `art-grad` — gradient text (pink→magenta), use on span inside h1
- `art-lead` — hero lead paragraph
- `art-meta` / `art-tag` / `art-tag--green` — tag pills

### Content Blocks
- `glass-card` — glassmorphism card for info sections
- `reason-card` + `reason-num` + `reason-content` — numbered reason/step blocks
- `highlight-box` — highlighted info box
- `highlight-box--warning` — warning variant
- `checklist` — styled checklist with ul/li
- `pull-quote` — blockquote-style callout
- `two-col-box` — two-column layout box
- `summary-card` — summary/conclusion card

### Interactive
- `faq-section` — FAQ wrapper
- `faq-item` — individual FAQ item
- `faq-chevron` — FAQ toggle button (needs JS from Base.astro)
- `faq-body` — collapsible FAQ answer

### CTA
- `art-cta section` — CTA section (use BOTH classes)
- `art-cta__orb` — decorative orb
- `art-cta__inner` — content wrapper
- `art-cta__badge` — small badge label
- `art-cta__btn--primary btn btn-primary` — primary CTA button

### Related
- `related-grid` — CSS grid for related cards
- `related-card` — individual related article link
- `related-card__icon` — emoji icon in card

### Utilities
- `section` — adds block padding (4–7rem top/bottom)
- `container` — centers content, max-width 1200px

## Color Palette
- Background: `#0f0609`
- Raised: `#190812`
- Accent: `#e879a0` (pink)
- CTA gradient: `linear-gradient(135deg, #be185d, #e879a0)`
- Text: `#fce7f3`
- Muted: `#d1a0b8`

## Rules for New Pages

1. **Always use `<Base>` layout** — `import Base from '@/layouts/Base.astro'`
2. **Never add `<style>` blocks** — all styles are in Base.astro globally
3. **Hero always needs**: `art-hero__inner container` (BOTH classes, not just one)
4. **All 6 languages** — when creating a page in English, also create de/es/ro/ru/uk versions
5. **No old classes**: `page-content`, `page-header`, `eyebrow`, `lead` (standalone), `cta-section`, `related-articles` are the OLD design

## Languages
Pages exist in: `src/pages/` (en), `src/pages/de/`, `src/pages/es/`, `src/pages/ro/`, `src/pages/ru/`, `src/pages/uk/`

## Template
See `src/pages/_article-template.astro` for a ready-to-copy template.
