const fs = require('fs');
const p = 'stripchat-bot-classic-red.html';
let s = fs.readFileSync(p, 'utf8');
const U = '?utm_source=stripchat_traffic_bot&amp;utm_medium=webapp';
const B = 'https://www.ewohub.com/';
const ico = {
  clock: '<path d="M12 7v5l3 2"/><circle cx="12" cy="12" r="9"/>',
  trophy: '<path d="M8 4h8v5a4 4 0 0 1-8 0V4z"/><path d="M8 6H5a3 3 0 0 0 3 4"/><path d="M16 6h3a3 3 0 0 1-3 4"/><path d="M12 13v4"/><path d="M8 20h8"/>',
  calc: '<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M8 7h8"/><path d="M8 12h.01"/><path d="M12 12h.01"/><path d="M16 12h.01"/><path d="M8 16h.01"/><path d="M12 16h.01"/><path d="M16 16h.01"/>',
  eye: '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
  book: '<path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2V5z"/><path d="M8 7h7"/>',
};
const svg = (k) => `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${ico[k]}</svg>`;
const item = (href, icon, title, desc) => `
          <a class="tool" href="${B}${href}${U}" target="_blank" rel="noopener">
            <span class="tool__icon">${svg(icon)}</span>
            <span class="tool__text"><b>${title}</b><small>${desc}</small></span>
            <span class="tool__arrow">↗</span>
          </a>`;
const figure = `
  <!-- 6. Полезные инструменты -->
  <figure id="tools">
    <figcaption>6 · Полезные инструменты</figcaption>
    <div class="phone">
      <div class="tg-head"><b>Stripchat traffic promo</b><span>⋮</span></div>
      <div class="sheet">
        <div class="btns btns--center"><a class="btn btn--primary" href="#history">История заказов</a></div>
        <h2 style="margin:4px 0 0;text-align:center;font-size:26px;font-weight:800">Полезные инструменты</h2>
        <p style="margin:0;text-align:center;color:var(--muted);font-size:15px;line-height:1.5">Бесплатные виджеты и гайды для моделей Stripchat на ewohub.com</p>
        <span class="tools-label">Живые данные</span>
        <div class="tools">${item('ru/best-hours-to-stream-chaturbate', 'clock', 'Лучшие часы для стрима', 'Когда на Stripchat больше зрителей на комнату + топ-20 тегов сейчас')}${item('ru/live-model-lookup', 'trophy', 'Рейтинг сегодня', 'Топ-комнаты Stripchat и лидеры трафика по часам')}${item('stripchat-chaturbate-token-calculator', 'calc', 'Калькулятор токенов', 'Токены Stripchat в доллары, доля студии и налоги')}
        </div>
        <span class="tools-label">Гайды</span>
        <div class="tools">${item('ru/stripchat-first-14-days-guide', 'book', 'Первые 14 дней на Stripchat', 'План старта для новой модели')}${item('ru/stripscore-cam-rank-explained', 'book', 'Как работает StripScore', 'От чего зависит место комнаты в выдаче')}${item('ru/stripchat-goals-tip-menu-structure', 'book', 'Цели и тип-меню', 'Как собрать меню, которое платят')}${item('ru/stripchat-viewer-mode-stream-check', 'eye', 'Viewer Mode', 'Проверить стрим глазами зрителя')}
        </div>
      </div>
      <div class="tg-foot">@Stripchat_traffic_bot</div>
    </div>
  </figure>
`;
const css = `
  /* tools page */
  .tools-label { font-size: 12px; font-weight: 700; color: var(--muted); text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: -8px; }
  .tools { border: 1px solid var(--border); border-radius: 14px; background: var(--surface); overflow: hidden; }
  .tool { display: flex; align-items: center; gap: 12px; padding: 12px 14px; color: var(--text); text-decoration: none; border-bottom: 1px solid var(--divider); }
  .tool:last-child { border-bottom: 0; }
  .tool:hover { background: var(--surface-2); }
  .tool__icon { flex: none; width: 38px; height: 38px; border-radius: 10px; background: var(--accent-soft); color: var(--accent-text); display: flex; align-items: center; justify-content: center; }
  .tool__text { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 2px; }
  .tool__text b { font-size: 15px; font-weight: 700; }
  .tool__text small { font-size: 12.5px; color: var(--muted); line-height: 1.35; }
  .tool__arrow { flex: none; color: var(--faint); font-size: 16px; }
`;
if (!s.includes('id="tools"')) {
  s = s.replace('\n</main>', figure + '\n</main>');
  s = s.replace('  @media (max-width: 460px)', css + '  @media (max-width: 460px)');
  s = s.replace('<a class="btn btn--balance" href="#profile">', '<a class="btn btn--secondary" href="#tools">Инструменты</a>\n          <a class="btn btn--balance" href="#profile">');
}
fs.writeFileSync(p, s, 'utf8');
// sheet variant
let sh = s.replace('.gallery { display: flex; flex-wrap: wrap; gap: 40px; padding: 32px; align-items: flex-start; }', '.gallery { display: grid; grid-template-columns: repeat(4, 390px); gap: 48px 40px; padding: 24px 40px 48px; align-items: start; width: max-content; }')
  .replace('header.page { padding: 32px 32px 8px; }', 'header.page { padding: 40px 40px 8px; }')
  .replace(/  @media \(max-width: 460px\)[^\n]*\n/, '');
fs.writeFileSync('stripchat-bot-classic-red-sheet.html', sh, 'utf8');
console.log('ok', s.includes('id="tools"'));
