const fs = require('fs');
const U = '?utm_source=stripchat_traffic_bot&amp;utm_medium=webapp';
const B = 'https://www.ewohub.com/';
const ico = {
  clock: '<path d="M12 7v5l3 2"/><circle cx="12" cy="12" r="9"/>',
  tag: '<path d="M3 12V4a1 1 0 0 1 1-1h8l9 9-9 9-9-9z"/><circle cx="7.5" cy="7.5" r="1.5"/>',
  book: '<path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2V5z"/><path d="M8 7h7"/>',
  star: '<path d="M12 3l2.8 5.7 6.2.9-4.5 4.4 1 6.2L12 17.3 6.5 20.2l1-6.2L3 9.6l6.2-.9z"/>',
};
const svg = (k) => `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${ico[k]}</svg>`;
const item = (href, icon, title, desc) => `
          <a class="tool" href="${B}${href}${href.includes('#') ? U.replace('?', '&amp;') : U}" target="_blank" rel="noopener">
            <span class="tool__icon">${svg(icon)}</span>
            <span class="tool__text"><b>${title}</b><small>${desc}</small></span>
            <span class="tool__arrow">↗</span>
          </a>`;
// UTM must go before the #anchor
const link = (path, anchor) => path + U + (anchor ? '#' + anchor : '');
const item2 = (path, anchor, icon, title, desc) => `
          <a class="tool" href="${B}${link(path, anchor)}" target="_blank" rel="noopener">
            <span class="tool__icon">${svg(icon)}</span>
            <span class="tool__text"><b>${title}</b><small>${desc}</small></span>
            <span class="tool__arrow">↗</span>
          </a>`;
const block = `<div class="tools">${item2('ru/best-hours-to-stream-chaturbate', 'sc-hours', 'clock', 'Лучшие часы для стрима на Stripchat', 'Когда у комнаты больше всего зрителей — обновляется каждые 15 минут')}${item2('ru/best-hours-to-stream-chaturbate', 'sc-tags', 'tag', 'Топ-20 тегов прямо сейчас на Stripchat', 'Сколько моделей онлайн по каждому тегу')}${item2('ru/stripchat-first-14-days-guide', '', 'book', 'Твои первые 14 дней на Stripchat', 'Пошаговый гид для старта новой модели')}${item2('ru/stripchat-fan-club-pricing-guide', '', 'star', 'Цены Fan Club на Stripchat', 'Тарифы, которые конвертируют')}
        </div>`;
for (const p of ['stripchat-bot-classic-red.html', 'stripchat-bot-classic-red-sheet.html']) {
  let s = fs.readFileSync(p, 'utf8');
  const start = s.indexOf('<span class="tools-label">Живые данные</span>');
  const endMarker = '</div>\n      </div>\n      <div class="tg-foot">';
  const end = s.indexOf(endMarker, start);
  if (start < 0 || end < 0) throw new Error('markers not found in ' + p);
  s = s.slice(0, start) + block + '\n      ' + s.slice(end + '</div>\n'.length);
  fs.writeFileSync(p, s, 'utf8');
}
console.log('ok');
