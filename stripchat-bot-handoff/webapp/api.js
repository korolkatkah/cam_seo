// API layer. Real backend contract is described in ../SPEC.md (section "API").
// MOCK = true runs the whole UI on fake in-memory data (open index.html in any browser).
// Set MOCK = false and API_BASE to the bot backend for production.
const MOCK = new URLSearchParams(location.search).has('mock') || !window.Telegram?.WebApp?.initData;
const API_BASE = '/api';

async function http(method, path, body) {
  const res = await fetch(API_BASE + path, {
    method,
    headers: {
      'Content-Type': 'application/json',
      // Backend must validate initData signature (HMAC with bot token) on every request.
      'X-Telegram-Init-Data': window.Telegram?.WebApp?.initData || '',
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(data.message || 'Ошибка сервера');
    err.status = res.status;
    err.code = data.code;
    throw err;
  }
  return data;
}

const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;

const realApi = {
  me: () => http('GET', '/me'),
  slots: (date) => http('GET', `/slots?date=${date}&tz=${encodeURIComponent(tz)}`),
  createOrder: (o) => http('POST', '/orders', o),
  orders: (scope) => http('GET', `/orders?scope=${scope}`),
  cancelOrder: (id) => http('POST', `/orders/${id}/cancel`),
  setReminder: (id, remind) => http('PATCH', `/orders/${id}`, { remind }),
  transactions: () => http('GET', '/wallet/transactions'),
  topup: (amount) => http('POST', '/topup', { amount }),
  referral: () => http('GET', '/referral'),
};

// ---------- mock ----------
const wait = (ms = 250) => new Promise((r) => setTimeout(r, ms));
const mockDb = {
  me: {
    user_id: 1, first_seen: '2025-02-27', balance: 199.63, price_per_hour: 10,
    recent_models: ['rubyluxee', 'sunnymoon_13', 'lissyforyou'],
    onboarded: false,
  },
  orders: [
    { id: 3, model: 'rubyluxee', start: '2025-11-06T10:00:00Z', hours: 2, cost: 20, status: 'done', remind: false },
    { id: 2, model: 'sunnymoon_13', start: '2025-02-27T10:00:00Z', hours: 1, cost: 10, status: 'cancelled', refunded: 10, remind: false },
    { id: 1, model: 'lissyforyou', start: '2025-02-27T06:00:00Z', hours: 1, cost: 10, status: 'cancelled', refunded: 10, remind: false },
  ],
  tx: [
    { id: 2, type: 'refund', title: 'Возврат · sunnymoon_13', amount: 10, at: '2025-02-27T09:00:00Z' },
    { id: 1, type: 'topup', title: 'Пополнение · USDT', amount: 200, at: '2025-02-27T05:00:00Z' },
  ],
  nextId: 4,
};
function busyHoursFor(dateStr) {
  // deterministic fake load per date
  let seed = 0;
  for (const c of dateStr) seed = (seed * 31 + c.charCodeAt(0)) % 9973;
  const busy = new Set();
  for (let i = 0; i < 6; i++) busy.add((seed * (i + 7)) % 24);
  return busy;
}
const mockApi = {
  async me() { await wait(); return { ...mockDb.me }; },
  async slots(date) {
    await wait();
    const busy = busyHoursFor(date);
    for (const o of mockDb.orders) {
      if (o.status !== 'scheduled' && o.status !== 'running') continue;
      const s = new Date(o.start);
      for (let k = 0; k < o.hours; k++) {
        const d = new Date(s.getTime() + k * 3600e3);
        if (localDate(d) === date) busy.add(d.getHours());
      }
    }
    const minStart = Date.now() + 15 * 60e3;
    const hours = [];
    for (let h = 0; h < 24; h++) {
      const t = parseLocal(date, h).getTime();
      hours.push({ hour: h, status: t < minStart ? 'past' : busy.has(h) ? 'busy' : 'free' });
    }
    return { date, tz, hours };
  },
  async createOrder({ model, start, hours, remind }) {
    await wait(400);
    const cost = hours * mockDb.me.price_per_hour;
    if (cost > mockDb.me.balance) { const e = new Error('Недостаточно средств'); e.status = 402; e.code = 'insufficient_funds'; throw e; }
    mockDb.me.balance = +(mockDb.me.balance - cost).toFixed(2);
    mockDb.me.recent_models = [model, ...mockDb.me.recent_models.filter((m) => m !== model)].slice(0, 5);
    const order = { id: mockDb.nextId++, model, start, hours, cost, status: 'scheduled', remind };
    mockDb.orders.unshift(order);
    mockDb.tx.unshift({ id: Date.now(), type: 'order', title: 'Заказ · ' + model, amount: -cost, at: new Date().toISOString() });
    return { order, balance: mockDb.me.balance };
  },
  async orders(scope) {
    await wait();
    const up = (o) => o.status === 'scheduled' || o.status === 'running';
    return { orders: mockDb.orders.filter((o) => (scope === 'upcoming' ? up(o) : !up(o))) };
  },
  async cancelOrder(id) {
    await wait();
    const o = mockDb.orders.find((x) => x.id === id);
    o.status = 'cancelled'; o.refunded = o.cost;
    mockDb.me.balance = +(mockDb.me.balance + o.cost).toFixed(2);
    mockDb.tx.unshift({ id: Date.now(), type: 'refund', title: 'Возврат · ' + o.model, amount: o.cost, at: new Date().toISOString() });
    return { order: o, balance: mockDb.me.balance };
  },
  async setReminder(id, remind) { await wait(100); const o = mockDb.orders.find((x) => x.id === id); if (o) o.remind = remind; return { order: o }; },
  async transactions() { await wait(); return { transactions: mockDb.tx }; },
  async topup(amount) { await wait(); return { pay_url: 'https://trybit.example/invoice/mock?amount=' + amount }; },
  async referral() {
    await wait();
    return { link: 'https://t.me/Stripchat_traffic_bot?start=ref_MOCK123', percent: null, invited: 0, earned: 0, referrals: [] };
  },
};

// helpers shared with app.js
function localDate(d) { return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); }
function parseLocal(dateStr, hour) { const [y, m, d] = dateStr.split('-').map(Number); return new Date(y, m - 1, d, hour); }

window.api = MOCK ? mockApi : realApi;
window.API_MOCK = MOCK;
