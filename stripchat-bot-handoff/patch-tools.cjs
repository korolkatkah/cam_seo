const fs = require('fs');
const p = __dirname + '/webapp/app.js';
let s = fs.readFileSync(p, 'utf8');
const rep = (a, b) => { if (!s.includes(a)) throw new Error('missing: ' + a.slice(0, 60)); s = s.replace(a, () => b); };

rep(`const TABS = [['order', 'Заказ', I.plus], ['orders', 'Мои заказы', I.list], ['wallet', 'Баланс', I.wallet], ['referral', 'Партнёрка', I.users]];`,
`I.grid = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="7" height="7" rx="2"/><rect x="13" y="4" width="7" height="7" rx="2"/><rect x="4" y="13" width="7" height="7" rx="2"/><rect x="13" y="13" width="7" height="7" rx="2"/></svg>';
const TABS = [['order', 'Заказ', I.plus], ['orders', 'Заказы', I.list], ['wallet', 'Баланс', I.wallet], ['tools', 'Полезное', I.grid], ['referral', 'Партнёрка', I.users]];

// Links to free Stripchat widgets and guides on ewohub.com (UTM goes before the #anchor).
const EWO_UTM = '?utm_source=stripchat_traffic_bot&utm_medium=webapp';
const TOOLS = [
  { url: 'https://www.ewohub.com/ru/best-hours-to-stream-chaturbate' + EWO_UTM + '#sc-hours', title: 'Лучшие часы для стрима на Stripchat', desc: 'Когда у комнаты больше всего зрителей — обновляется каждые 15 минут', icon: '<path d="M12 7v5l3 2"/><circle cx="12" cy="12" r="9"/>' },
  { url: 'https://www.ewohub.com/ru/best-hours-to-stream-chaturbate' + EWO_UTM + '#sc-tags', title: 'Топ-20 тегов прямо сейчас на Stripchat', desc: 'Сколько моделей онлайн по каждому тегу', icon: '<path d="M3 12V4a1 1 0 0 1 1-1h8l9 9-9 9-9-9z"/><circle cx="7.5" cy="7.5" r="1.5"/>' },
  { url: 'https://www.ewohub.com/ru/stripchat-first-14-days-guide' + EWO_UTM, title: 'Твои первые 14 дней на Stripchat', desc: 'Пошаговый гид для старта новой модели', icon: '<path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2V5z"/><path d="M8 7h7"/>' },
  { url: 'https://www.ewohub.com/ru/stripchat-fan-club-pricing-guide' + EWO_UTM, title: 'Цены Fan Club на Stripchat', desc: 'Тарифы, которые конвертируют', icon: '<path d="M12 3l2.8 5.7 6.2.9-4.5 4.4 1 6.2L12 17.3 6.5 20.2l1-6.2L3 9.6l6.2-.9z"/>' },
];`);
rep(`referral: viewReferral };`, `referral: viewReferral, tools: viewTools };`);
rep(`function viewReferral() {`, `function viewTools() {
  const rows = TOOLS.map((t) => \`<a class="tool" href="#" data-link="\${esc(t.url)}">
      <span class="tool__icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">\${t.icon}</svg></span>
      <span class="tool__text"><b>\${t.title}</b><small>\${t.desc}</small></span>
      <span class="tool__arrow">↗</span></a>\`).join('');
  return \`<main class="screen" style="padding-bottom:calc(var(--tabbar-h) + 24px)">
    <div class="col" style="gap:6px"><h1>Полезное</h1><p class="muted" style="margin:0;font-size:15px;line-height:1.5">Бесплатные виджеты и гайды для моделей Stripchat на ewohub.com</p></div>
    <div class="tools">\${rows}</div>
  </main>\`;
}

function viewReferral() {`);
fs.writeFileSync(p, s, 'utf8');

const c = __dirname + '/webapp/styles.css';
let css = fs.readFileSync(c, 'utf8');
if (!css.includes('.tools {')) css += `
.tools { border: 1px solid var(--border); border-radius: var(--radius-l); background: var(--surface); overflow: hidden; }
.tool { display: flex; align-items: center; gap: 12px; padding: 14px 16px; color: var(--text); text-decoration: none; border-bottom: 1px solid var(--divider); min-height: 64px; }
.tool:last-child { border-bottom: 0; }
.tool:active { background: var(--surface-2); }
.tool__icon { flex: none; width: 40px; height: 40px; border-radius: 12px; background: var(--accent-soft); color: var(--accent-text); display: flex; align-items: center; justify-content: center; }
.tool__text { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 3px; }
.tool__text b { font-size: 15px; font-weight: 700; line-height: 1.3; }
.tool__text small { font-size: 13px; color: var(--muted); line-height: 1.35; }
.tool__arrow { flex: none; color: var(--faint); }
.tabbar { grid-template-columns: repeat(5, minmax(0, 1fr)); }
.tab { font-size: 10.5px; }
`;
fs.writeFileSync(c, css, 'utf8');
console.log('ok');
