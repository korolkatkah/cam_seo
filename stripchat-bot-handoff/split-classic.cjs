// Splits stripchat-bot-classic-red.html into one HTML file per screen (classic-red/).
const fs = require('fs');
const src = fs.readFileSync('stripchat-bot-classic-red.html', 'utf8');
const head = src.slice(0, src.indexOf('<body>'));
const names = { history: '1-istoriya-zakazov', create: '2-sozdat-zakaz', time: '2b-vybor-vremeni', profile: '3-profil', topup: '4-popolnenie', referral: '5-referalnaya-sistema', tools: '6-poleznye-instrumenty' };
fs.mkdirSync('classic-red', { recursive: true });
const re = /<figure id="(\w+)">\s*<figcaption>(.*?)<\/figcaption>\s*([\s\S]*?)<\/figure>/g;
let m, n = 0;
while ((m = re.exec(src))) {
  const [, id, title, body] = m;
  let phone = body.replace(/href="#(\w+)"/g, (_, t) => `href="${names[t]}.html"`);
  const h = head.replace(/<title>.*?<\/title>/, `<title>${title.replace(/^[\w]+ · /, '')} — Stripchat traffic promo</title>`)
    + '<body>\n<main class="gallery" style="justify-content:center">\n' + phone.trim() + '\n</main>\n</body>\n</html>\n';
  fs.writeFileSync(`classic-red/${names[id]}.html`, h, 'utf8');
  n++;
}
console.log(n, fs.readdirSync('classic-red'));
