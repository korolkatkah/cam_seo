// Stripchat Traffic Bot — Telegram WebApp UI (vanilla JS, no build step).
const tg = window.Telegram?.WebApp;
tg?.ready();
tg?.expand();
tg?.setHeaderColor?.('#141414');
tg?.setBackgroundColor?.('#141414');

const WD = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
const MON = ['янв', 'фев', 'мар', 'апр', 'мая', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];
const MAX_HOURS = 12;
const TIERS = [ // keep in sync with backend pricing
  { from: 0, price: 10, range: 'до $50', note: 'за час' },
  { from: 50, price: 9, range: 'от $50', note: '−10%' },
  { from: 200, price: 8, range: 'от $200', note: '−20%' },
];
const priceForTopup = (a) => [...TIERS].reverse().find((t) => a >= t.from).price;

const S = {
  screen: 'order',
  me: null,
  dayIdx: 0,
  slots: null,
  start: null,
  dur: 3,
  model: '',
  remind: true,
  lastOrder: null,
  ordersTab: 'upcoming',
  orders: null,
  topup: 50,
  tx: null,
  ref: null,
  busy: false,
};

// ---------- utils ----------
const $app = document.getElementById('app');
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const pad = (h) => String(((h % 24) + 24) % 24).padStart(2, '0') + ':00';
const money = (n) => '$' + Number(n).toFixed(2);
const haptic = (t = 'light') => tg?.HapticFeedback?.impactOccurred?.(t);
const days = () => Array.from({ length: 7 }, (_, i) => { const d = new Date(); d.setHours(0, 0, 0, 0); d.setDate(d.getDate() + i); return d; });
const dayLabel = (d, i) => (i === 0 ? 'Сегодня' : i === 1 ? 'Завтра' : WD[d.getDay()]) + ', ' + d.getDate() + ' ' + MON[d.getMonth()];
const fmtDate = (iso) => { const d = new Date(iso); const today = localDate(new Date()); const tm = new Date(); tm.setDate(tm.getDate() + 1); if (localDate(d) === localDate(tm)) return 'Завтра'; return localDate(d) === today ? 'Сегодня' :d.getDate() + ' ' + MON[d.getMonth()] + (d.getFullYear() !== new Date().getFullYear() ? ' ' + d.getFullYear() : ''); };
const fmtTime = (d) => String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0');
const until = (ms) => { const m = Math.max(0, Math.round(ms / 60e3)); const h = Math.floor(m / 60); return (h ? h + ' ч ' : '') + (m % 60) + ' мин'; };
function toast(text) { const el = document.createElement('div'); el.className = 'toast'; el.textContent = text; document.body.appendChild(el); setTimeout(() => el.remove(), 2000); }

const I = {
  wallet: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="6" width="18" height="14" rx="3"/><path d="M3 10h18"/><path d="M16 15h2"/></svg>',
  plus: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 8v8"/><path d="M8 12h8"/></svg>',
  list: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="3"/><path d="M8 9h8"/><path d="M8 13h8"/><path d="M8 17h5"/></svg>',
  users: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c.8-3.5 3.4-5.5 6.5-5.5s5.7 2 6.5 5.5"/><path d="M16 4.5a3.5 3.5 0 0 1 0 7"/><path d="M18 14.5c2 .6 3.2 2.5 3.5 5.5"/></svg>',
  clock: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
  info: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5B9BFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 11v5"/><path d="M12 8h.01"/></svg>',
  alert: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 8v5"/><path d="M12 16h.01"/></svg>',
  check: '<svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>',
  repeat: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12a8 8 0 0 1 14-5.3L20 9"/><path d="M20 4v5h-5"/><path d="M20 12a8 8 0 0 1-14 5.3L4 15"/></svg>',
  up: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5B9BFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5"/><path d="M5 12l7-7 7 7"/></svg>',
  send: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 3L10 14"/><path d="M21 3l-7 18-4-7-7-4 18-7z"/></svg>',
};

// ---------- navigation ----------
I.grid = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="7" height="7" rx="2"/><rect x="13" y="4" width="7" height="7" rx="2"/><rect x="4" y="13" width="7" height="7" rx="2"/><rect x="13" y="13" width="7" height="7" rx="2"/></svg>';
const TABS = [['order', 'Заказ', I.plus], ['orders', 'Заказы', I.list], ['wallet', 'Баланс', I.wallet], ['tools', 'Полезное', I.grid], ['referral', 'Партнёрка', I.users]];

// Links to free Stripchat widgets and guides on ewohub.com (UTM goes before the #anchor).
const EWO_UTM = '?utm_source=stripchat_traffic_bot&utm_medium=webapp';
const TOOLS = [
  { url: 'https://www.ewohub.com/ru/best-hours-to-stream-chaturbate' + EWO_UTM + '#sc-hours', title: 'Лучшие часы для стрима на Stripchat', desc: 'Когда у комнаты больше всего зрителей — обновляется каждые 15 минут', icon: '<path d="M12 7v5l3 2"/><circle cx="12" cy="12" r="9"/>' },
  { url: 'https://www.ewohub.com/ru/best-hours-to-stream-chaturbate' + EWO_UTM + '#sc-tags', title: 'Топ-20 тегов прямо сейчас на Stripchat', desc: 'Сколько моделей онлайн по каждому тегу', icon: '<path d="M3 12V4a1 1 0 0 1 1-1h8l9 9-9 9-9-9z"/><circle cx="7.5" cy="7.5" r="1.5"/>' },
  { url: 'https://www.ewohub.com/ru/stripchat-first-14-days-guide' + EWO_UTM, title: 'Твои первые 14 дней на Stripchat', desc: 'Пошаговый гид для старта новой модели', icon: '<path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2V5z"/><path d="M8 7h7"/>' },
  { url: 'https://www.ewohub.com/ru/stripchat-fan-club-pricing-guide' + EWO_UTM, title: 'Цены Fan Club на Stripchat', desc: 'Тарифы, которые конвертируют', icon: '<path d="M12 3l2.8 5.7 6.2.9-4.5 4.4 1 6.2L12 17.3 6.5 20.2l1-6.2L3 9.6l6.2-.9z"/>' },
];
const NO_TABS = new Set(['onboarding', 'confirm']);

function go(screen) {
  S.screen = screen;
  window.scrollTo(0, 0);
  if (screen === 'orders' && !S.orders) loadOrders();
  if (screen === 'wallet' && !S.tx) loadTx();
  if (screen === 'referral' && !S.ref) loadRef();
  if (screen === 'order' && !S.slots) loadSlots();
  if (tg?.BackButton) screen === 'confirm' ? tg.BackButton.show() : tg.BackButton.hide();
  render();
}
tg?.BackButton?.onClick(() => go('order'));

function render() {
  const screens = { onboarding: viewOnboarding, order: viewOrder, confirm: viewConfirm, orders: viewOrders, wallet: viewWallet, referral: viewReferral, tools: viewTools };
  let html = screens[S.screen]();
  if (!NO_TABS.has(S.screen)) {
    html += '<nav class="tabbar">' + TABS.map(([id, label, icon]) => `<button class="tab ${S.screen === id ? 'is-on' : ''}" data-go="${id}">${icon}${label}</button>`).join('') + '</nav>';
  }
  $app.innerHTML = html;
}

// ---------- data ----------
async function loadMe() { S.me = await api.me(); if (!S.model) S.model = S.me.recent_models?.[0] || ''; }
async function loadSlots() {
  S.slots = null; render();
  const date = localDate(days()[S.dayIdx]);
  const res = await api.slots(date);
  if (localDate(days()[S.dayIdx]) !== date) return; // user switched day meanwhile
  S.slots = res.hours;
  if (S.start == null || !fits(S.start, S.dur)) S.start = firstFit(S.dur);
  render();
}
async function loadOrders() { S.orders = null; render(); S.orders = (await api.orders(S.ordersTab)).orders; render(); }
async function loadTx() { S.tx = (await api.transactions()).transactions; render(); }
async function loadRef() { S.ref = await api.referral(); render(); }

// ---------- order logic ----------
const slot = (h) => S.slots?.find((s) => s.hour === h);
function fits(start, dur) {
  for (let h = start; h < start + dur; h++) { if (h > 23 || slot(h)?.status !== 'free') return false; }
  return true;
}
function firstFit(dur) { for (let h = 0; h < 24; h++) if (fits(h, dur)) return h; return null; }
function orderError() {
  if (!S.model.trim()) return 'Укажите ник модели на Stripchat.';
  if (!S.slots) return null;
  if (S.start == null) return 'На этот день нет свободного окна такой длины — выберите другой день или уменьшите длительность.';
  for (let h = S.start; h < S.start + S.dur; h++) {
    if (h > 23) return 'Заказ должен закончиться до 24:00 — уменьшите длительность или выберите время раньше.';
    const st = slot(h)?.status;
    if (st === 'busy') return pad(h) + ' уже занято — уменьшите длительность или сдвиньте старт.';
    if (st === 'past') return 'Это время уже прошло.';
  }
  if (S.me && S.dur * S.me.price_per_hour > S.me.balance) return 'insufficient';
  return null;
}

// ---------- views ----------
function viewOnboarding() {
  const step = (n, t, d) => `<li><span class="steps__n">${n}</span><div class="col" style="gap:4px"><b>${t}</b><span class="muted" style="font-size:14px;line-height:1.45">${d}</span></div></li>`;
  return `<main class="screen screen--plain">
    <div class="col" style="gap:14px">
      <h1 style="font-size:28px;line-height:1.15">Трафик в комнату<br>на Stripchat по расписанию</h1>
      <p class="muted" style="margin:0;font-size:15px;line-height:1.5">Выберите модель и час — продвижение включится само. Оплата с баланса, почасово.</p>
    </div>
    <ol class="steps">
      ${step(1, 'Пополните баланс', 'Криптой: BTC, ETH, USDT. Чем больше пополнение — тем дешевле час: $10 → $9 → $8.')}
      ${step(2, 'Выберите свободное время', 'Сетка показывает время в вашем часовом поясе. Занятые часы зачёркнуты.')}
      ${step(3, 'Будьте онлайн за 15 минут', 'Бот напомнит в Telegram. Продвижение стартует автоматически.')}
    </ol>
    <a class="list__row" style="border:1px solid var(--line);border-radius:14px;padding:14px 16px;color:var(--text-2);text-decoration:none" href="#" data-link="https://teletype.in/@webcamtraffic/stripchat-traffic-bot">Подробная инструкция <span>↗</span></a>
    <div style="flex:1"></div>
    <div class="col">
      <button class="btn btn--primary" data-action="onboard" data-to="order">Создать первый заказ</button>
      <button class="btn btn--secondary" data-action="onboard" data-to="wallet">Сначала пополнить баланс</button>
    </div>
  </main>`;
}

function viewOrder() {
  const me = S.me;
  const ds = days();
  const err = orderError();
  const recent = (me?.recent_models || []).map((m) => `<button class="chip ${m === S.model ? 'is-on' : ''}" data-model="${esc(m)}">${esc(m)}</button>`).join('');
  const dayBtns = ds.map((d, i) => `<button class="day ${i === S.dayIdx ? 'is-on' : ''}" data-day="${i}"><small>${i === 0 ? 'Сег' : WD[d.getDay()]}</small><b>${d.getDate()}</b></button>`).join('');
  let hours = '<div class="skeleton"></div>';
  if (S.slots) {
    hours = '<div class="hours">' + S.slots.map(({ hour, status }) => {
      const inR = S.start != null && hour >= S.start && hour < S.start + S.dur;
      let cls = 'hour';
      if (status === 'past') cls += ' hour--past';
      else if (inR && status === 'busy') cls += ' hour--conflict';
      else if (inR) cls += ' hour--sel';
      else if (status === 'busy') cls += ' hour--busy';
      const dis = status === 'past' || (status === 'busy' && !inR);
      return `<button class="${cls}" data-hour="${hour}" ${dis ? 'disabled' : ''} aria-label="${pad(hour)}, ${status === 'busy' ? 'занято' : status === 'past' ? 'прошло' : 'свободно'}">${String(hour).padStart(2, '0')}</button>`;
    }).join('') + '</div>';
  }
  const now = new Date();
  const tzOff = -now.getTimezoneOffset() / 60;
  return `<main class="screen">
    <div class="head">
      <div class="col" style="gap:2px"><span class="head__sub">Stripchat traffic</span><h1>Новый заказ</h1></div>
      <button class="pill" data-go="wallet"><span style="color:var(--accent-text);display:flex">${I.wallet}</span>${me ? money(me.balance) : '…'}</button>
    </div>
    <section class="col">
      <label class="label" for="model">Модель</label>
      <div class="field"><span class="field__prefix">stripchat.com/</span><input id="model" value="${esc(S.model)}" placeholder="username" autocomplete="off" autocapitalize="off" spellcheck="false"></div>
      ${recent ? `<div class="chips"><span class="small" style="color:var(--faint)">Недавние:</span>${recent}</div>` : ''}
    </section>
    <section class="col">
      <div class="row"><span class="label">Дата</span><span class="small muted">${dayLabel(ds[S.dayIdx], S.dayIdx)}</span></div>
      <div class="days">${dayBtns}</div>
    </section>
    <section class="col">
      <div class="row"><span class="label">Время старта</span><span class="small muted" style="display:flex;align-items:center;gap:6px">${I.clock}UTC${tzOff >= 0 ? '+' : ''}${tzOff} · сейчас ${fmtTime(now)}</span></div>
      ${hours}
      <div class="legend"><span><i style="background:var(--surface-2);border:1px solid var(--border-2)"></i>Свободно</span><span><i style="background:repeating-linear-gradient(135deg,var(--surface) 0 3px,var(--border-2) 3px 6px)"></i>Занято</span><span><i style="background:var(--accent)"></i>Ваш заказ</span></div>
    </section>
    <section class="card" style="flex-direction:row;align-items:center;justify-content:space-between;padding:12px 12px 12px 16px">
      <div class="col" style="gap:2px"><b>Длительность</b><span class="small muted">${S.start != null ? pad(S.start) + ' – ' + pad(S.start + S.dur) : '—'}</span></div>
      <div class="stepper"><button data-dur="-1" aria-label="Меньше">−</button><b>${S.dur} ч</b><button data-dur="1" aria-label="Больше">+</button></div>
    </section>
    <div id="order-msg">${orderMsg(err)}</div>
  </main>
  <div class="foot" id="order-foot">${orderFoot(err)}</div>`;
}
function orderMsg(err) {
  if (err === 'insufficient') return `<div class="note note--err">${I.alert}<span>Не хватает ${money(S.dur * S.me.price_per_hour - S.me.balance)} на балансе.</span></div>`;
  if (err) return `<div class="note note--err">${I.alert}<span>${esc(err)}</span></div>`;
  if (S.start == null) return '';
  return `<div class="note">${I.info}<span>Модель должна быть онлайн с <b style="color:var(--text)">${String((S.start + 23) % 24).padStart(2, '0')}:45</b> — за 15 минут до старта. <a href="#" data-go="onboarding">Как это работает</a></span></div>`;
}
function orderFoot(err) {
  const price = S.me?.price_per_hour ?? 10;
  const cost = S.dur * price;
  const after = S.me ? money(S.me.balance - cost) : '…';
  let btn;
  if (err === 'insufficient') btn = `<button class="btn btn--primary" data-go="wallet">Пополнить баланс</button>`;
  else if (err || !S.slots) btn = `<button class="btn" disabled>${S.slots ? 'Выберите свободное время' : 'Загружаем слоты…'}</button>`;
  else btn = `<button class="btn btn--primary" data-action="create" ${S.busy ? 'disabled' : ''}>${S.busy ? 'Создаём…' : 'Заказать за $' + cost}</button>`;
  return `<div class="foot__inner"><div class="row small" style="font-size:14px"><span class="muted">${S.dur} ч × $${price}</span><span class="muted">Остаток <b style="color:var(--text)">${after}</b></span></div>${btn}</div>`;
}

function viewConfirm() {
  const o = S.lastOrder;
  const start = new Date(o.start);
  const end = new Date(start.getTime() + o.hours * 3600e3);
  const remindAt = new Date(start.getTime() - 30 * 60e3);
  const onlineAt = new Date(start.getTime() - 15 * 60e3);
  return `<main class="screen screen--plain" style="padding-top:40px">
    <div class="success"><div class="success__icon">${I.check}</div><h1>Заказ принят</h1><p class="muted" style="margin:0">Старт через ${until(start - Date.now())}</p></div>
    <div class="list">
      <div class="list__row"><span class="muted">Модель</span><b>${esc(o.model)}</b></div>
      <div class="list__row"><span class="muted">Дата</span><b>${fmtDate(o.start)}</b></div>
      <div class="list__row"><span class="muted">Время</span><b>${fmtTime(start)} – ${fmtTime(end)} · ${o.hours} ч</b></div>
      <div class="list__row"><span class="muted">Списано</span><b>${money(o.cost)}</b></div>
      <div class="list__row"><span class="muted">Остаток</span><b>${money(S.me.balance)}</b></div>
    </div>
    <button class="toggle-row" data-action="remind" aria-pressed="${o.remind}">
      <span class="col" style="gap:2px"><b>Напомнить в Telegram</b><span class="small muted">В ${fmtTime(remindAt)} — за 30 минут до старта</span></span>
      <span class="switch ${o.remind ? 'is-on' : ''}"></span>
    </button>
    <div class="note" style="background:var(--bg-bar)">${I.info}<span>Модель должна быть онлайн с <b style="color:var(--text)">${fmtTime(onlineAt)}</b>. Отменить заказ можно до старта — деньги вернутся на баланс.</span></div>
    <div style="flex:1"></div>
    <div class="col"><button class="btn btn--primary" data-go="orders" data-action="reload-orders">Мои заказы</button><button class="btn btn--secondary" data-go="order">Ещё один заказ</button></div>
  </main>`;
}

function orderCard(o) {
  const start = new Date(o.start);
  const end = new Date(start.getTime() + o.hours * 3600e3);
  const now = Date.now();
  const meta = `${fmtDate(o.start)} · ${fmtTime(start)} – ${fmtTime(end)} · ${o.hours} ч · $${o.cost}`;
  if (o.status === 'running' || (o.status === 'scheduled' && now >= start && now < end)) {
    const pct = Math.min(100, Math.round(((now - start) / (end - start)) * 100));
    return `<article class="card"><div class="row"><b style="font-size:17px">${esc(o.model)}</b><span class="status status--running"><i></i>Идёт</span></div>
      <div class="small muted" style="font-size:14px">${meta}</div>
      <div class="col" style="gap:6px"><div class="progress"><div style="width:${pct}%"></div></div><span class="small muted">Осталось ${until(end - now)}</span></div></article>`;
  }
  if (o.status === 'scheduled') {
    return `<article class="card"><div class="row"><b style="font-size:17px">${esc(o.model)}</b><span class="status status--scheduled"><i></i>Запланирован</span></div>
      <div class="small muted" style="font-size:14px">${meta}</div>
      <div class="small" style="color:var(--text-2)">Старт через ${until(start - now)} · онлайн с ${fmtTime(new Date(start - 15 * 60e3))}${o.remind ? ' · напомним' : ''}</div>
      <div class="grid2"><button class="btn btn--ghost-danger" data-cancel="${o.id}">Отменить</button><button class="btn btn--secondary btn--small" data-repeat="${o.id}">Повторить</button></div></article>`;
  }
  const label = o.status === 'done' ? 'Завершён' : 'Отменён';
  const sub = o.status === 'cancelled' ? `${fmtDate(o.start)} · ${fmtTime(start)} – ${fmtTime(end)} · $${o.refunded ?? o.cost} возвращено` : meta;
  return `<article class="card ${o.status === 'cancelled' ? 'card--dim' : ''}" style="flex-direction:row;align-items:center;justify-content:space-between;padding:14px 16px">
    <div class="col" style="gap:4px"><b style="font-size:16px">${esc(o.model)}</b><span class="small muted">${sub}</span><span class="status status--${o.status}" style="height:22px;width:fit-content">${label}</span></div>
    <button class="pill" style="height:40px;font-size:14px;flex:none" data-repeat="${o.id}">${I.repeat}Повторить</button></article>`;
}
function viewOrders() {
  const list = S.orders == null ? '<div class="skeleton"></div>'
    : S.orders.length ? S.orders.map(orderCard).join('')
    : `<div class="empty"><b>${S.ordersTab === 'upcoming' ? 'Нет активных заказов' : 'История пуста'}</b><span class="small muted">Заказы появятся здесь</span></div>`;
  return `<main class="screen">
    <h1>Мои заказы</h1>
    <div class="seg" role="tablist"><button class="${S.ordersTab === 'upcoming' ? 'is-on' : ''}" data-otab="upcoming">Предстоящие</button><button class="${S.ordersTab === 'history' ? 'is-on' : ''}" data-otab="history">История</button></div>
    <div class="col" style="gap:12px">${list}
      <button class="btn btn--secondary" style="border:1px dashed var(--border-2);background:transparent" data-go="order">+ Новый заказ</button></div>
  </main>`;
}

function viewWallet() {
  const me = S.me;
  const a = S.topup;
  const p = priceForTopup(a);
  const hours = a > 0 ? Math.floor((a / p) * 10) / 10 : 0;
  let upsell = '';
  if (a > 0 && a < 50) upsell = { to: 50, text: `Добавьте $${50 - a} — и час будет стоить $9 вместо $10` };
  else if (a >= 50 && a < 200) upsell = { to: 200, text: `От $200 час стоит $8 — это ${Math.floor(200 / 8)} ч вместо ${Math.floor(200 / 9)} ч` };
  const tx = S.tx == null ? '<div class="skeleton" style="height:120px"></div>'
    : S.tx.length ? '<div class="list">' + S.tx.map((t) => `<div class="list__row" style="padding:12px 0"><span class="col" style="gap:2px"><b>${esc(t.title)}</b><span class="small muted" style="font-size:12px">${fmtDate(t.at)}</span></span><b style="color:${t.amount > 0 ? 'var(--info-text)' : 'var(--text-2)'}">${t.amount > 0 ? '+' : '−'}${money(Math.abs(t.amount))}</b></div>`).join('') + '</div>'
    : '<div class="empty"><span class="small muted">Операций пока нет</span></div>';
  return `<main class="screen" style="padding-bottom:calc(var(--tabbar-h) + 100px)">
    <h1>Баланс</h1>
    <div class="card" style="gap:6px"><span class="small muted" style="font-weight:600">Доступно</span><span class="balance-big">${me ? money(me.balance) : '…'}</span>
      <span style="font-size:14px;color:var(--text-2)">${me ? '≈ ' + Math.floor(me.balance / me.price_per_hour) + ' ч продвижения по вашему тарифу $' + me.price_per_hour + '/ч' : ''}</span></div>
    <section class="col"><span class="label">Цена часа зависит от пополнения</span>
      <div class="tiers">${TIERS.map((t) => `<div class="tier ${t.price === p ? 'is-on' : ''}"><small>${t.range}</small><b>$${t.price}</b><small>${t.note}</small></div>`).join('')}</div></section>
    <section class="col"><label class="label" for="amount">Сумма пополнения</label>
      <div class="field field--big"><span style="font-size:24px;font-weight:800;color:var(--muted)">$</span><input id="amount" inputmode="decimal" value="${a}"><span id="amount-hint" style="font-size:14px;font-weight:700;color:var(--accent-soft-text);white-space:nowrap">≈ ${hours} ч по $${p}</span></div>
      <div class="amounts">${[20, 50, 100, 200].map((v) => `<button class="chip ${v === a ? 'is-on' : ''}" data-amount="${v}">$${v}</button>`).join('')}</div>
      ${upsell ? `<button class="note note--info" data-amount="${upsell.to}">${I.up}<span>${upsell.text}</span></button>` : ''}
    </section>
    <section class="col"><span class="label">Операции</span>${tx}</section>
  </main>
  <div class="foot"><div class="foot__inner"><button class="btn btn--primary" data-action="topup" ${a < 1 || S.busy ? 'disabled' : ''}>Оплатить $${a} криптой <span style="font-size:12px;opacity:.75">BTC · ETH · USDT</span></button></div></div>`;
}

function viewTools() {
  const rows = TOOLS.map((t) => `<a class="tool" href="#" data-link="${esc(t.url)}">
      <span class="tool__icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${t.icon}</svg></span>
      <span class="tool__text"><b>${t.title}</b><small>${t.desc}</small></span>
      <span class="tool__arrow">↗</span></a>`).join('');
  return `<main class="screen" style="padding-bottom:calc(var(--tabbar-h) + 24px)">
    <div class="col" style="gap:6px"><h1>Полезное</h1><p class="muted" style="margin:0;font-size:15px;line-height:1.5">Бесплатные виджеты и гайды для моделей Stripchat на ewohub.com</p></div>
    <div class="tools">${rows}</div>
  </main>`;
}

function viewReferral() {
  const r = S.ref;
  const pct = r?.percent != null ? r.percent + '%' : '[X]%';
  return `<main class="screen" style="padding-bottom:calc(var(--tabbar-h) + 24px)">
    <div class="col" style="gap:6px"><h1>Партнёрка</h1><p class="muted" style="margin:0;font-size:15px;line-height:1.5">Приглашайте моделей и студии — получайте ${pct} с каждого их пополнения на свой баланс.</p></div>
    <div class="grid2" style="gap:10px">
      <div class="card" style="gap:4px"><span class="small muted" style="font-weight:600">Приглашено</span><span class="stat">${r ? r.invited : '…'}</span></div>
      <div class="card" style="gap:4px"><span class="small muted" style="font-weight:600">Заработано</span><span class="stat">${r ? money(r.earned) : '…'}</span></div>
    </div>
    <section class="col"><span class="label">Ваша ссылка</span>
      <div class="field" style="padding:6px 6px 6px 14px;height:auto"><span style="flex:1;min-width:0;font-size:14px;font-weight:600;color:var(--text-2);overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${r ? esc(r.link.replace('https://', '')) : '…'}</span><button class="pill" style="height:40px;border-radius:10px;font-size:14px;background:var(--border-2)" data-action="copy">Копировать</button></div>
      <button class="btn btn--primary" data-action="share">${I.send}Поделиться в Telegram</button>
    </section>
    <section class="col"><span class="label">Как это работает</span>
      <div class="list">
        <div class="list__row" style="justify-content:flex-start;font-size:14px;color:var(--text-2)"><b style="color:var(--accent-text)">1</b>Друг открывает бота по вашей ссылке</div>
        <div class="list__row" style="justify-content:flex-start;font-size:14px;color:var(--text-2)"><b style="color:var(--accent-text)">2</b>Пополняет баланс и заказывает продвижение</div>
        <div class="list__row" style="justify-content:flex-start;font-size:14px;color:var(--text-2)"><b style="color:var(--accent-text)">3</b>Вам на баланс приходит ${pct}</div>
      </div></section>
    ${r && r.referrals?.length ? '<div class="list">' + r.referrals.map((x) => `<div class="list__row"><span>${esc(x.name)}</span><b>${money(x.earned)}</b></div>`).join('') + '</div>'
      : '<div class="empty"><b>Пока никого</b><span class="small muted">Здесь появятся приглашённые и начисления</span></div>'}
  </main>`;
}

// ---------- events ----------
$app.addEventListener('click', async (e) => {
  const el = e.target.closest('button, a');
  if (!el) return;
  const d = el.dataset;
  if (el.tagName === 'A') e.preventDefault();

  if (d.link) { tg ? tg.openLink(d.link) : window.open(d.link, '_blank'); return; }
  if (d.action === 'reload-orders') { S.ordersTab = 'upcoming'; S.orders = null; }
  if (d.go) { haptic(); go(d.go); return; }
  if (d.day != null) { S.dayIdx = +d.day; haptic(); loadSlots(); return; }
  if (d.hour != null) { S.start = +d.hour; haptic(); render(); return; }
  if (d.dur) { S.dur = Math.min(MAX_HOURS, Math.max(1, S.dur + +d.dur)); haptic(); render(); return; }
  if (d.model) { S.model = d.model; render(); return; }
  if (d.otab) { S.ordersTab = d.otab; loadOrders(); return; }
  if (d.amount) { S.topup = +d.amount; render(); return; }

  if (d.cancel) {
    const ok = await confirmDialog('Отменить заказ? Деньги вернутся на баланс.');
    if (!ok) return;
    const res = await api.cancelOrder(+d.cancel);
    S.me.balance = res.balance; S.slots = null; tg?.HapticFeedback?.notificationOccurred('success');
    toast('Заказ отменён, ' + money(res.order.refunded ?? res.order.cost) + ' вернулись'); loadOrders(); return;
  }
  if (d.repeat) {
    const o = S.orders.find((x) => x.id === +d.repeat);
    S.model = o.model; S.dur = o.hours; S.start = null; S.dayIdx = 0; S.slots = null;
    go('order'); return;
  }
  switch (d.action) {
    case 'onboard': localStorage.setItem('onboarded', '1'); go(d.to); break;
    case 'create': createOrder(); break;
    case 'remind': {
      S.lastOrder.remind = !S.lastOrder.remind; render();
      api.setReminder(S.lastOrder.id, S.lastOrder.remind); break;
    }
    case 'topup': {
      S.busy = true; render();
      try { const { pay_url } = await api.topup(S.topup); tg ? tg.openLink(pay_url) : window.open(pay_url, '_blank'); }
      finally { S.busy = false; render(); }
      break;
    }
    case 'copy': navigator.clipboard?.writeText(S.ref.link); toast('Ссылка скопирована'); break;
    case 'share': {
      const url = 'https://t.me/share/url?url=' + encodeURIComponent(S.ref.link) + '&text=' + encodeURIComponent('Продвижение комнаты на Stripchat по расписанию');
      tg ? tg.openTelegramLink(url) : window.open(url, '_blank'); break;
    }
  }
});

$app.addEventListener('input', (e) => {
  if (e.target.id === 'model') {
    S.model = e.target.value.trim().replace(/^https?:\/\/(www\.)?stripchat\.com\//i, '').replace(/\/.*$/, '');
    const err = orderError();
    document.getElementById('order-msg').innerHTML = orderMsg(err);
    document.getElementById('order-foot').innerHTML = orderFoot(err);
  }
  if (e.target.id === 'amount') {
    S.topup = Math.max(0, Math.floor(parseFloat(e.target.value.replace(',', '.')) || 0));
    const p = priceForTopup(S.topup);
    document.getElementById('amount-hint').textContent = '≈ ' + (S.topup > 0 ? Math.floor((S.topup / p) * 10) / 10 : 0) + ' ч по $' + p;
  }
});
$app.addEventListener('change', (e) => { if (e.target.id === 'amount') render(); });

function confirmDialog(text) {
  return new Promise((resolve) => (tg?.showConfirm ? tg.showConfirm(text, resolve) : resolve(window.confirm(text))));
}

async function createOrder() {
  const date = localDate(days()[S.dayIdx]);
  const start = parseLocal(date, S.start).toISOString();
  S.busy = true; render();
  try {
    const res = await api.createOrder({ model: S.model, start, hours: S.dur, remind: S.remind });
    S.lastOrder = res.order; S.me.balance = res.balance;
    if (!S.me.recent_models.includes(S.model)) S.me.recent_models.unshift(S.model);
    S.slots = null; S.orders = null; S.tx = null;
    tg?.HapticFeedback?.notificationOccurred('success');
    go('confirm');
  } catch (err) {
    tg?.HapticFeedback?.notificationOccurred('error');
    if (err.status === 409) { toast('Это время только что заняли'); loadSlots(); }
    else if (err.status === 402) { await loadMe(); render(); }
    else toast(err.message || 'Не удалось создать заказ');
  } finally { S.busy = false; if (S.screen === 'order') render(); }
}

// ---------- boot ----------
(async function boot() {
  render();
  await loadMe();
  // Demo mode for the screens gallery: window.INITIAL_SCREEN = 'order' | 'confirm' | 'orders' | 'history' | 'wallet' | 'referral' | 'onboarding'
  const demo = window.INITIAL_SCREEN;
  if (demo) {
    if (demo === 'history') S.ordersTab = 'history';
    if (demo === 'order') S.dayIdx = 1;
    if (demo === 'orders' && window.API_MOCK) {
      const st = days()[1]; st.setHours(15);
      await api.createOrder({ model: 'rubyluxee', start: st.toISOString(), hours: 3, remind: true });
      await loadMe();
    }
    if (demo === 'confirm') {
      const st = days()[1]; st.setHours(15);
      S.lastOrder = { id: 99, model: 'rubyluxee', start: st.toISOString(), hours: 3, cost: 30, remind: true };
      S.me.balance = +(S.me.balance - 30).toFixed(2);
    }
    go(demo === 'history' ? 'orders' : demo);
    return;
  }
  const firstRun = !localStorage.getItem('onboarded') && !S.me.onboarded;
  go(firstRun ? 'onboarding' : 'order');
  if (firstRun) loadSlots();
})();
