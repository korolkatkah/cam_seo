// Builds two standalone files from webapp/:
//   stripchat-bot-red.html          — the working app in one file
//   stripchat-bot-red-screens.html  — all screens side by side (each in its own phone frame)
// Run: node build.js
const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, 'webapp');
const read = (f) => fs.readFileSync(path.join(dir, f), 'utf8');

function inline(initialScreen) {
  let h = read('index.html');
  h = h.replace('<link rel="stylesheet" href="styles.css">', () => '<style>\n' + read('styles.css') + '\n</style>');
  const pre = initialScreen ? `<script>window.INITIAL_SCREEN = ${JSON.stringify(initialScreen)};</script>\n` : '';
  h = h.replace('<script src="api.js"></script>', () => pre + '<script>\n' + read('api.js') + '\n</script>');
  h = h.replace('<script src="app.js"></script>', () => '<script>\n' + read('app.js') + '\n</script>');
  return h;
}

fs.writeFileSync(path.join(__dirname, 'stripchat-bot-red.html'), inline(null), 'utf8');

const screens = [
  ['onboarding', '0 · Первый запуск'],
  ['order', '1 · Новый заказ'],
  ['confirm', '2 · Заказ принят'],
  ['orders', '3 · Мои заказы'],
  ['history', '3b · История заказов'],
  ['wallet', '4 · Баланс'],
  ['tools', '5 · Полезное'],
  ['referral', '6 · Партнёрка'],
];
const attr = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
const frames = screens.map(([id, title]) => `
  <figure>
    <figcaption>${title}</figcaption>
    <iframe title="${title}" srcdoc="${attr(inline(id))}"></iframe>
  </figure>`).join('');

const gallery = `<!doctype html>
<html lang="ru">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Stripchat Traffic Bot — экраны</title>
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@500;700;800&display=swap" rel="stylesheet">
<style>
  body { margin: 0; background: #0B0B0B; color: #FFFFFF; font-family: Manrope, system-ui, sans-serif; }
  header { padding: 32px 32px 8px; }
  h1 { margin: 0 0 6px; font-size: 28px; font-weight: 800; }
  p { margin: 0; color: #A8A8A8; font-size: 15px; }
  main { display: flex; flex-wrap: wrap; gap: 40px; padding: 32px; }
  figure { margin: 0; display: flex; flex-direction: column; gap: 12px; }
  figcaption { font-size: 15px; font-weight: 700; color: #D0D0D0; }
  iframe { width: 390px; height: 844px; border: 1px solid #2B2B2B; border-radius: 28px; background: #141414; }
  @media (max-width: 460px) { main { padding: 16px; } iframe { width: calc(100vw - 32px); } }
</style>
</head>
<body>
<header>
  <h1>Stripchat Traffic Bot — экраны WebApp</h1>
  <p>Каждый экран живой: можно нажимать кнопки. Данные тестовые.</p>
</header>
<main>${frames}
</main>
</body>
</html>`;
fs.writeFileSync(path.join(__dirname, 'stripchat-bot-red-screens.html'), gallery, 'utf8');
console.log('ok', gallery.length);
