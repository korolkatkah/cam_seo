// Build-time index of every article page (pages that pass `articleMeta` to <Base>).
// Read from the page sources so a newly shipped article shows up in the footer's
// "Latest articles" list without touching any listing or config file.
const sources = import.meta.glob<string>('../pages/**/*.astro', {
  query: '?raw',
  import: 'default',
  eager: true,
});

const LOCALES = ['de', 'es', 'ro', 'uk', 'ru', 'fr', 'pt'];

export interface ArticleLink {
  lang: string;
  slug: string;
  title: string;
  date: string;
}

const titleRe = /\n\s*title="([^"]*)"/;
const dateRe = /datePublished:\s*'(\d{4}-\d{2}-\d{2})'/;

const all: ArticleLink[] = [];
for (const [file, src] of Object.entries(sources)) {
  const date = dateRe.exec(src)?.[1];
  const title = titleRe.exec(src)?.[1];
  if (!date || !title) continue;
  const parts = file.replace('../pages/', '').replace(/\.astro$/, '').split('/');
  if (parts.length > 2) continue;
  const lang = parts.length === 2 ? parts[0] : 'en';
  if (parts.length === 2 && !LOCALES.includes(lang)) continue;
  all.push({ lang, slug: parts[parts.length - 1], title: title.replace(/&amp;/g, '&'), date });
}

all.sort((a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug));

// The promo landing page is linked from every article already; keep it out of the list.
export function latestArticles(lang: string, limit = 6): ArticleLink[] {
  return all.filter((a) => a.lang === lang && a.slug !== 'stripchat-promo').slice(0, limit);
}
