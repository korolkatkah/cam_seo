// Compact market data for the model cabinet on ewomodels.com/cabinet (fetched cross-origin,
// CORS header in vercel.json). Rebuilt on every deploy, i.e. each time the trends workflows
// commit fresh cb/sc data.
import cb from '../../data/cb-trends.json';
import sc from '../../data/sc-trends.json';

export function GET() {
  const body = {
    generated_at: cb.generated_at,
    chaturbate: {
      generated_at: cb.generated_at,
      live: cb.live,
      best_hours_utc: cb.best_hours_utc,
      top_tags: (cb.top_tags || []).slice(0, 12),
      trending_tags: (cb.trending_tags || []).slice(0, 6),
      recommendation: cb.recommendation,
      economy: cb.economy && {
        goal_median: cb.economy.goal_median,
        goal_p25: cb.economy.goal_p25,
        goal_p75: cb.economy.goal_p75,
        top_patterns: (cb.economy.top_patterns || []).slice(0, 10),
      },
    },
    stripchat: {
      generated_at: sc.generated_at,
      live: sc.live,
      best_hours_utc: sc.best_hours_utc,
      top_tags: ((sc.top_tags_by_niche as Record<string, unknown[]>)?.girls || []).slice(0, 12),
    },
  };
  return new Response(JSON.stringify(body), { headers: { 'Content-Type': 'application/json' } });
}
