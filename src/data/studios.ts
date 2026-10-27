export type PerkKey =
  | 'housing'
  | 'freeBeauty'
  | 'legalContract'
  | 'support247'
  | 'training'
  | 'remoteOption'
  | 'vrTech'
  | 'paidTrip'
  | 'referralBonus';

export type PayoutKey = 'weekly' | 'biweekly' | 'twiceMonthly' | 'daily';

export interface StudioFacts {
  earnings?: string; // numbers/currency/% only — not translated
  experienceYears?: number;
  locations?: string[]; // proper nouns only — not translated
  platforms?: string[]; // proper nouns only — not translated
  payout?: PayoutKey;
  rooms?: number;
  models?: string; // e.g. "150+" — not translated
  perks?: PerkKey[];
  address?: string; // street address — not translated, mini-page only
  phone?: string; // not translated, mini-page only
  email?: string; // not translated, mini-page only
  hours?: string; // e.g. "24/7" or shift times — not translated, mini-page only
}

export interface Studio {
  slug: string;
  name: string;
  city: string;
  website: string;
  blurb: Record<string, string>;
  about: Record<string, string>;
  facts?: StudioFacts;
  article?: StudioArticleSection[]; // optional long-form review, rendered on the mini-page
  extraFaq?: { q: Record<string, string>; a: Record<string, string> }[];
}

export interface StudioArticleSection {
  h2: Record<string, string>;
  p: Record<string, string>[];
  list?: Record<string, string>[];
  images?: { src: string; alt: Record<string, string> }[];
  buttons?: { href: string; label: Record<string, string> }[];
  // paragraphs may contain inline <a> links (trusted, written by us)
}

export type CountryKey = 'romania' | 'ukraine' | 'spain' | 'russia' | 'usa' | 'germany' | 'france';

export interface CountryEntry {
  key: CountryKey;
  studios: Studio[];
}

// Only countries where at least one studio could be independently verified
// (a real address/city and an active, studio-owned website — not just an
// aggregator listing). Expand this list only when a new country clears that bar.
// `facts` and `about` below are pulled from each studio's own website (own
// claims, not verified by EWO) — see the disclaimer rendered on the page.
export const studioDirectory: CountryEntry[] = [
  {
    key: 'romania',
    studios: [
      {
        slug: 'glow-models',
        name: 'Glow Models',
        city: 'Bucharest',
        website: 'https://glowmodels.ro',
        blurb: {
          en: 'Boutique videochat studio in Sector 4, Bucharest, built around private "Glow Rooms", hands-on training and 24/7 support.',
          ro: 'Studio videochat boutique în Sectorul 4 din București, construit în jurul camerelor private „Glow Rooms”, al trainingului practic și al suportului 24/7.',
          ru: 'Бутик-студия видеочата в 4-м секторе Бухареста: приватные «Glow Rooms», практическое обучение и поддержка 24/7.',
        },
        about: {
          en: 'Glow Models is a videochat studio on Strada Cuza Vodă in Sector 4, Bucharest. It presents itself as a partnership rather than just a place to stream: a small dedicated team, private rooms, professional training and 24/7 support, with more than 200 successful collaborations behind it.',
          ro: 'Glow Models este un studio videochat de pe Strada Cuza Vodă, în Sectorul 4 din București. Se prezintă ca un parteneriat, nu doar ca un loc de streaming: o echipă mică și dedicată, camere private, training profesional și suport 24/7, cu peste 200 de colaborări reușite la activ.',
          ru: 'Glow Models — студия видеочата на улице Куза Водэ в 4-м секторе Бухареста. Она позиционирует себя как партнёрство, а не просто место для стримов: небольшая команда, приватные комнаты, профессиональное обучение и поддержка 24/7, за плечами более 200 успешных сотрудничеств.',
        },
        facts: {
          locations: ['Bucharest'],
          perks: ['training', 'support247'],
          address: 'Strada Cuza Vodă, Sector 4, București',
          phone: '+40 746 171 211 (WhatsApp)',
          email: 'contact@glowmodels.ro',
          hours: '24/7',
        },
        article: [
          {
            h2: { en: 'Who Glow Models are', ro: 'Cine sunt Glow Models', ru: 'Кто такие Glow Models' },
            images: [{ src: '/images/studios/glow-models/glow-models-studio-bucharest.webp', alt: { en: 'Glow Models webcam studio room in Bucharest', ro: 'Cameră a studioului videochat Glow Models din București', ru: 'Комната вебкам-студии Glow Models в Бухаресте' } }],
            p: [
              {
                en: '<a href="https://glowmodels.ro" target="_blank" rel="noopener" style="color:var(--fg);font-weight:700;text-decoration:underline;text-underline-offset:3px;">Glow Models</a> describes itself as "the seriousness of a top studio with the warmth of a dedicated team". The studio is based in Bucharest, in Sector 4 near Strada Cuza Vodă, a central and easy-to-reach part of the city. Instead of competing on size, it focuses on a compact team that knows every model personally and on a small number of well-equipped rooms.',
                ro: '<a href="https://glowmodels.ro" target="_blank" rel="noopener" style="color:var(--fg);font-weight:700;text-decoration:underline;text-underline-offset:3px;">Glow Models</a> se descrie drept „seriozitatea unui studio de top, căldura unei echipe dedicate”. Studioul se află în București, în Sectorul 4, lângă Strada Cuza Vodă, o zonă centrală și ușor accesibilă. În loc să concureze prin mărime, pune accent pe o echipă compactă care cunoaște personal fiecare model și pe un număr mic de camere bine echipate.',
                ru: '<a href="https://glowmodels.ro" target="_blank" rel="noopener" style="color:var(--fg);font-weight:700;text-decoration:underline;text-underline-offset:3px;">Glow Models</a> описывает себя как «серьёзность топ-студии и тепло преданной команды». Студия находится в Бухаресте, в 4-м секторе рядом с улицей Куза Водэ — это центральный и удобный по транспорту район. Вместо того чтобы конкурировать размером, студия делает ставку на небольшую команду, которая лично знает каждую модель, и на несколько хорошо оборудованных комнат.',
              },
              {
                en: 'According to the studio, its mission is to raise the standards of the videochat industry through professionalism and discretion, and to give women a safe, encouraging environment where they can reach their full potential. Personal and professional growth of every model is part of the stated goal, not only earnings.',
                ro: 'Potrivit studioului, misiunea sa este să ridice standardele industriei videochat prin profesionalism și discreție și să ofere femeilor un mediu sigur și încurajator în care să își atingă potențialul maxim. Dezvoltarea personală și profesională a fiecărui model face parte din obiectivul declarat, nu doar câștigurile.',
                ru: 'По словам студии, её миссия — поднять стандарты индустрии видеочата за счёт профессионализма и конфиденциальности и дать девушкам безопасную, поддерживающую среду, где они могут раскрыть свой потенциал. Личный и профессиональный рост каждой модели — часть заявленной цели, а не только заработок.',
              },
            ],
          },
          {
            h2: { en: 'The team behind the studio', ro: 'Echipa din spatele studioului', ru: 'Команда студии' },
            p: [
              {
                en: 'Unlike many studios that hide behind a logo, Glow Models introduces its team by name on its website. Each person has a clear role, so a new model knows from day one who to turn to for scheduling, training, promotion or a technical problem.',
                ro: 'Spre deosebire de multe studiouri care se ascund în spatele unui logo, Glow Models își prezintă echipa pe nume pe site. Fiecare persoană are un rol clar, astfel încât un model nou știe din prima zi la cine să apeleze pentru program, training, promovare sau o problemă tehnică.',
                ru: 'В отличие от многих студий, которые прячутся за логотипом, Glow Models представляет команду по именам прямо на сайте. У каждого человека своя роль, поэтому новая модель с первого дня знает, к кому идти с вопросами по графику, обучению, продвижению или технике.',
              },
            ],
            list: [
              { en: 'Oana — Studio Manager', ro: 'Oana — Studio Manager', ru: 'Оана — менеджер студии' },
              { en: 'Corina — Head Trainer', ro: 'Corina — Head Trainer', ru: 'Корина — главный тренер' },
              { en: 'Octavia — Marketing & PR', ro: 'Octavia — Marketing & PR', ru: 'Октавия — маркетинг и PR' },
              { en: 'Tavi — Trainer', ro: 'Tavi — Trainer', ru: 'Тави — тренер' },
              { en: 'Andrei — Trainer & Tech', ro: 'Andrei — Trainer & Tech', ru: 'Андрей — тренер и техническая поддержка' },
            ],
          },
          {
            h2: { en: 'Glow Rooms: where models work', ro: 'Glow Rooms: unde lucrează modelele', ru: 'Glow Rooms: где работают модели' },
            images: [
              { src: '/images/studios/glow-models/glow-room-navy.webp', alt: { en: 'Glow Room with a navy velvet bed', ro: 'Glow Room cu pat din catifea bleumarin', ru: 'Glow Room с тёмно-синей бархатной кроватью' } },
              { src: '/images/studios/glow-models/glow-room-red.webp', alt: { en: 'Glow Room with red bedding and a portrait', ro: 'Glow Room cu lenjerie roșie și tablou', ru: 'Glow Room с красным покрывалом и портретом' } },
              { src: '/images/studios/glow-models/glow-room-beige.webp', alt: { en: 'Beige Glow Room with soft headboard', ro: 'Glow Room bej cu tăblie tapițată', ru: 'Бежевая Glow Room с мягким изголовьем' } },
              { src: '/images/studios/glow-models/glow-room-red-velvet.webp', alt: { en: 'Glow Room with burgundy bedding', ro: 'Glow Room cu lenjerie vișinie', ru: 'Glow Room с бордовым покрывалом' } },
              { src: '/images/studios/glow-models/glow-room-green.webp', alt: { en: 'Glow Room with green velvet wall', ro: 'Glow Room cu perete din catifea verde', ru: 'Glow Room с зелёной бархатной стеной' } },
              { src: '/images/studios/glow-models/glow-room-led.webp', alt: { en: 'Bright Glow Room with LED lighting', ro: 'Glow Room luminoasă cu iluminare LED', ru: 'Светлая Glow Room с LED-подсветкой' } },
            ],
            p: [
              {
                en: 'The studio calls its workspaces "Glow Rooms". Each room is private and designed so the model can focus on her show without distractions: dedicated lighting, a styled set and the equipment needed for HD streaming. The studio stresses discretion: every room is meant to guarantee privacy and an environment where a model can perform at her best.',
                ro: 'Studioul își numește spațiile de lucru „Glow Rooms”. Fiecare cameră este privată și gândită astfel încât modelul să se concentreze pe show fără distrageri: iluminare dedicată, un decor amenajat și echipamentul necesar pentru streaming HD. Studioul pune accent pe discreție: fiecare cameră trebuie să garanteze intimitatea și un mediu în care modelul să dea tot ce are mai bun.',
                ru: 'Рабочие пространства студия называет «Glow Rooms». Каждая комната приватная и устроена так, чтобы модель могла сосредоточиться на шоу без отвлечений: свой свет, оформленный интерьер и оборудование для HD-трансляций. Студия делает акцент на конфиденциальности: каждая комната должна гарантировать приватность и условия, в которых модель покажет лучший результат.',
              },
              {
                en: 'For models this matters more than it seems. A good room means a better picture, more viewers staying in the stream and higher conversion into tips and private shows, without the model having to buy and set up her own equipment.',
                ro: 'Pentru modele, acest lucru contează mai mult decât pare. O cameră bună înseamnă o imagine mai bună, mai mulți spectatori care rămân pe stream și o conversie mai mare în tips și show-uri private, fără ca modelul să își cumpere și să își configureze singur echipamentul.',
                ru: 'Для модели это важнее, чем кажется. Хорошая комната — это лучшая картинка, больше зрителей, которые остаются в эфире, и выше конверсия в чаевые и приваты, при этом не нужно покупать и настраивать технику самой.',
              },
            ],
          },
          {
            h2: { en: 'Benefits for Glow models', ro: 'Beneficii pentru modelele Glow', ru: 'Что получают модели Glow' },
            images: [{ src: '/images/studios/glow-models/glow-models-lounge.webp', alt: { en: 'Glow Models lounge and kitchen area', ro: 'Zona de relaxare și bucătăria Glow Models', ru: 'Зона отдыха и кухня Glow Models' } }, { src: '/images/studios/glow-models/glow-room-camera.webp', alt: { en: 'Professional streaming camera in a Glow Room', ro: 'Cameră profesională de streaming într-o Glow Room', ru: 'Профессиональная камера для стримов в Glow Room' } }],
            p: [
              {
                en: 'The studio lists five core benefits on its website. Exact percentages and bonus rules are not published, so ask for them in writing at the first meeting.',
                ro: 'Studioul enumeră pe site cinci beneficii principale. Procentele exacte și regulile bonusurilor nu sunt publicate, așa că cere-le în scris la prima întâlnire.',
                ru: 'На сайте студия перечисляет пять основных преимуществ. Точные проценты и правила бонусов не опубликованы — уточни их письменно на первой встрече.',
              },
            ],
            list: [
              { en: 'Motivating percentages — a revenue share designed to grow with results', ro: 'Procente motivante — un procent care crește odată cu rezultatele', ru: 'Мотивирующие проценты — доля, которая растёт вместе с результатом' },
              { en: 'Professional training — from first stream to advanced show techniques', ro: 'Training profesional — de la primul stream la tehnici avansate de show', ru: 'Профессиональное обучение — от первого эфира до продвинутых техник шоу' },
              { en: 'Flexibility and understanding — a schedule that fits around your life', ro: 'Flexibilitate și înțelegere — un program care se potrivește vieții tale', ru: 'Гибкость и понимание — график под твою жизнь' },
              { en: 'Dedicated 24/7 support — someone to call at any hour of any shift', ro: 'Suport dedicat 24/7 — cineva la care poți apela în orice tură', ru: 'Поддержка 24/7 — есть к кому обратиться в любую смену' },
              { en: 'Prizes and bonuses — extra rewards for performance', ro: 'Premii și bonusuri — recompense suplimentare pentru performanță', ru: 'Призы и бонусы — дополнительные награды за результат' },
            ],
          },
          {
            h2: { en: 'Skills you build at Glow', ro: 'Ce abilități dezvolți la Glow', ru: 'Какие навыки развивает Glow' },
            p: [
              {
                en: 'Glow Models puts unusual weight on personal development. The studio says models grow not only their income but also skills that stay with them outside the industry: control over their own time, self-confidence, perseverance and discipline, a growth mindset, financial independence, emotional intelligence and communication skills.',
                ro: 'Glow Models pune un accent neobișnuit pe dezvoltarea personală. Studioul spune că modelele își dezvoltă nu doar veniturile, ci și abilități care rămân cu ele și în afara industriei: controlul asupra propriului timp, încrederea în sine, perseverența și disciplina, mindset-ul de succes, independența financiară, inteligența emoțională și abilitățile de comunicare.',
                ru: 'Glow Models делает необычно большой акцент на личном развитии. Студия говорит, что модели растят не только доход, но и навыки, которые остаются с ними и вне индустрии: контроль над своим временем, уверенность в себе, упорство и дисциплину, мышление роста, финансовую независимость, эмоциональный интеллект и навыки общения.',
              },
              {
                en: 'In practice, communication and emotional intelligence are exactly what separate high earners on cam sites from average ones: regulars come back to a model who remembers them, reads the room and keeps the conversation going.',
                ro: 'În practică, comunicarea și inteligența emoțională sunt exact ce le separă pe modelele cu câștiguri mari de cele medii pe site-urile cam: clienții fideli revin la un model care îi ține minte, simte atmosfera și menține conversația.',
                ru: 'На практике именно общение и эмоциональный интеллект отличают топ-моделей на вебкам-сайтах от средних: постоянные зрители возвращаются к той, кто их помнит, чувствует настроение комнаты и умеет поддерживать разговор.',
              },
            ],
          },
          {
            h2: { en: 'What models say', ro: 'Ce spun modelele', ru: 'Что говорят модели' },
            p: [
              {
                en: 'The testimonials on the studio website focus on atmosphere rather than numbers. One model, Ana M., writes that at Glow she found "not just a career, but a family", and that the professionalism and support helped her reach her financial goals and grow personally. As with any studio, treat testimonials on the studio’s own site as marketing and ask to speak with a current model before you sign.',
                ro: 'Testimonialele de pe site-ul studioului se concentrează pe atmosferă, nu pe cifre. O modelă, Ana M., scrie că la Glow a găsit „nu doar o carieră, ci și o familie” și că profesionalismul și suportul au ajutat-o să își atingă obiectivele financiare și să se dezvolte personal. Ca la orice studio, tratează testimonialele de pe site-ul propriu ca marketing și cere să vorbești cu un model actual înainte să semnezi.',
                ru: 'Отзывы на сайте студии говорят скорее об атмосфере, чем о цифрах. Модель Ана М. пишет, что в Glow нашла «не просто карьеру, а семью», а профессионализм и поддержка помогли ей достичь финансовых целей и вырасти лично. Как и с любой студией, воспринимай отзывы на её собственном сайте как маркетинг и попроси пообщаться с действующей моделью до подписания.',
              },
            ],
          },
          {
            h2: { en: 'How to apply', ro: 'Cum aplici', ru: 'Как подать заявку' },
            buttons: [
              { href: 'https://glowmodels.ro', label: { en: 'Visit glowmodels.ro →', ro: 'Intră pe glowmodels.ro →', ru: 'Перейти на glowmodels.ro →' } },
              { href: 'https://wa.me/40746171211', label: { en: 'Message on WhatsApp', ro: 'Scrie pe WhatsApp', ru: 'Написать в WhatsApp' } },
              { href: 'mailto:contact@glowmodels.ro', label: { en: 'Send an email', ro: 'Trimite un e-mail', ru: 'Написать на почту' } },
            ],
            p: [
              {
                en: 'Applying is simple. On <a href="https://glowmodels.ro" target="_blank" rel="noopener" style="color:var(--fg);font-weight:700;text-decoration:underline;text-underline-offset:3px;">glowmodels.ro</a> you leave your name and phone number and the team calls you back shortly; the studio stresses there is no obligation, just a conversation about the opportunities. You can also write directly on <a href="https://wa.me/40746171211" target="_blank" rel="noopener" style="color:var(--fg);font-weight:700;text-decoration:underline;text-underline-offset:3px;">WhatsApp +40 746 171 211</a> or email <a href="mailto:contact@glowmodels.ro" target="_blank" rel="noopener" style="color:var(--fg);font-weight:700;text-decoration:underline;text-underline-offset:3px;">contact@glowmodels.ro</a>. Experience is not required: training is part of the offer.',
                ro: 'Aplicarea este simplă. Pe <a href="https://glowmodels.ro" target="_blank" rel="noopener" style="color:var(--fg);font-weight:700;text-decoration:underline;text-underline-offset:3px;">glowmodels.ro</a> îți lași numele și numărul de telefon, iar echipa te sună în scurt timp; studioul subliniază că nu există nicio obligație, doar o discuție despre oportunități. Poți scrie și direct pe <a href="https://wa.me/40746171211" target="_blank" rel="noopener" style="color:var(--fg);font-weight:700;text-decoration:underline;text-underline-offset:3px;">WhatsApp +40 746 171 211</a> sau pe e-mail la <a href="mailto:contact@glowmodels.ro" target="_blank" rel="noopener" style="color:var(--fg);font-weight:700;text-decoration:underline;text-underline-offset:3px;">contact@glowmodels.ro</a>. Experiența nu este obligatorie: trainingul face parte din ofertă.',
                ru: 'Подать заявку просто. На <a href="https://glowmodels.ro" target="_blank" rel="noopener" style="color:var(--fg);font-weight:700;text-decoration:underline;text-underline-offset:3px;">glowmodels.ro</a> оставляешь имя и номер телефона, и команда скоро перезванивает; студия подчёркивает, что это ни к чему не обязывает — просто разговор о возможностях. Можно также написать напрямую в <a href="https://wa.me/40746171211" target="_blank" rel="noopener" style="color:var(--fg);font-weight:700;text-decoration:underline;text-underline-offset:3px;">WhatsApp +40 746 171 211</a> или на почту <a href="mailto:contact@glowmodels.ro" target="_blank" rel="noopener" style="color:var(--fg);font-weight:700;text-decoration:underline;text-underline-offset:3px;">contact@glowmodels.ro</a>. Опыт не обязателен: обучение входит в предложение.',
              },
            ],
          },
          {
            h2: { en: 'What to ask before you sign', ro: 'Ce să întrebi înainte să semnezi', ru: 'Что уточнить до подписания' },
            p: [
              {
                en: 'Glow Models makes a strong first impression, but the website does not publish the details that matter most for your income. Clarify these points at the first meeting and get them in writing:',
                ro: 'Glow Models lasă o primă impresie bună, dar site-ul nu publică detaliile care contează cel mai mult pentru venitul tău. Clarifică aceste puncte la prima întâlnire și cere-le în scris:',
                ru: 'Glow Models производит хорошее первое впечатление, но на сайте нет деталей, которые сильнее всего влияют на доход. Уточни эти пункты на первой встрече и попроси зафиксировать их письменно:',
              },
            ],
            list: [
              { en: 'Your exact percentage and how it grows', ro: 'Procentul tău exact și cum crește', ru: 'Твой точный процент и как он растёт' },
              { en: 'Payout schedule and method', ro: 'Când și cum se fac plățile', ru: 'Как часто и каким способом выплаты' },
              { en: 'Type of contract and how to end it', ro: 'Tipul de contract și cum îl poți încheia', ru: 'Тип договора и как его расторгнуть' },
              { en: 'Which platforms you will stream on', ro: 'Pe ce platforme vei transmite', ru: 'На каких площадках будешь работать' },
              { en: 'Shift options and minimum hours', ro: 'Opțiunile de ture și numărul minim de ore', ru: 'Варианты смен и минимум часов' },
              { en: 'Geo-blocking and privacy protection', ro: 'Geo-blocarea și protecția datelor', ru: 'Гео-блок и защита данных' },
            ],
          },
        ],
        extraFaq: [
          {
            q: { en: 'Do I need experience to join Glow Models?', ro: 'Am nevoie de experiență pentru a mă alătura Glow Models?', ru: 'Нужен ли опыт, чтобы работать в Glow Models?' },
            a: { en: 'No. Glow Models offers professional training led by a head trainer and dedicated trainers, so beginners can start from zero.', ro: 'Nu. Glow Models oferă training profesional condus de un head trainer și de traineri dedicați, așa că începătoarele pot porni de la zero.', ru: 'Нет. В Glow Models есть профессиональное обучение с главным тренером и отдельными тренерами, поэтому начать можно с нуля.' },
          },
          {
            q: { en: 'Is working at Glow Models confidential?', ro: 'Este confidențial să lucrezi la Glow Models?', ru: 'Работа в Glow Models конфиденциальна?' },
            a: { en: 'The studio promises 100% confidentiality and private Glow Rooms. Ask about geo-blocking of your country on each platform as well.', ro: 'Studioul promite confidențialitate 100% și camere private Glow Rooms. Întreabă și de geo-blocarea țării tale pe fiecare platformă.', ru: 'Студия обещает 100% конфиденциальность и приватные комнаты Glow Rooms. Также уточни гео-блок своей страны на каждой площадке.' },
          },
          {
            q: { en: 'How do I contact Glow Models?', ro: 'Cum iau legătura cu Glow Models?', ru: 'Как связаться с Glow Models?' },
            a: { en: 'Through the form on glowmodels.ro, on WhatsApp at +40 746 171 211 or by email at contact@glowmodels.ro.', ro: 'Prin formularul de pe glowmodels.ro, pe WhatsApp la +40 746 171 211 sau pe e-mail la contact@glowmodels.ro.', ru: 'Через форму на glowmodels.ro, в WhatsApp по номеру +40 746 171 211 или по почте contact@glowmodels.ro.' },
          },
        ],
      },
    ],
  },
  {
    key: 'ukraine',
    studios: [
      {
        slug: 'aura',
        name: 'Aura',
        city: 'Kyiv',
        website: 'https://webcammodelua.com',
        blurb: {
          en: 'Model agency with an office in central Kyiv, recruiting for international webcam platforms.',
          de: 'Model-Agentur mit Büro im Zentrum Kiews, die für internationale Webcam-Plattformen rekrutiert.',
          es: 'Agencia de modelos con oficina en el centro de Kiev, que recluta para plataformas webcam internacionales.',
          ro: 'Agenție de modele cu birou în centrul Kievului, care recrutează pentru platforme webcam internaționale.',
          uk: 'Модельне агентство з офісом у центрі Києва, що набирає моделей для міжнародних вебкам-платформ.',
          ru: 'Модельное агентство с офисом в центре Киева, набирающее моделей для международных вебкам-платформ.',
          fr: 'Agence de modèles avec un bureau au centre de Kiev, recrutant pour des plateformes webcam internationales.',
          pt: 'Agência de modelos com escritório no centro de Kyiv, recrutando para plataformas webcam internacionais.',
        },
        about: {
          en: "Aura is a Kyiv-based model agency working out of a quiet residential area within walking distance of the metro, recruiting for international webcam platforms. It advertises earnings from around $700 a month for part-time work up to $10,000 for full-time models, paid out weekly by bank transfer, with a dynamic commission rate rather than a flat split. Models choose from three shift blocks — morning, evening, or night — with a minimum of four shifts a week. The studio provides high-speed internet, modern computers, and HD webcams on-site, plus operator-translators for models who don't speak English and in-house photography sessions.",
          de: 'Aura ist eine Model-Agentur mit Sitz in Kiew, die in einem ruhigen Wohnviertel in Gehweite zur Metro arbeitet und für internationale Webcam-Plattformen rekrutiert. Sie wirbt mit Verdienstmöglichkeiten von rund 700 US-Dollar im Monat bei Teilzeit bis zu 10.000 US-Dollar bei Vollzeit-Models, wöchentlich per Banküberweisung ausgezahlt, mit einem dynamischen Provisionssatz statt einer festen Aufteilung. Models wählen aus drei Schichtblöcken — Morgen, Abend oder Nacht — mit mindestens vier Schichten pro Woche. Das Studio stellt vor Ort Hochgeschwindigkeitsinternet, moderne Computer und HD-Webcams bereit, außerdem Operator-Übersetzer für Models ohne Englischkenntnisse und hauseigene Fotoshootings.',
          es: 'Aura es una agencia de modelos con sede en Kiev que opera en una zona residencial tranquila, a poca distancia a pie del metro, y recluta para plataformas webcam internacionales. Anuncia ingresos desde unos 700 dólares al mes para trabajo a tiempo parcial hasta 10.000 dólares para modelos a tiempo completo, pagados semanalmente por transferencia bancaria, con una comisión dinámica en lugar de un porcentaje fijo. Las modelos eligen entre tres turnos — mañana, tarde o noche — con un mínimo de cuatro turnos por semana. El estudio proporciona internet de alta velocidad, ordenadores modernos y webcams HD en el lugar, además de operadores-traductores para modelos que no hablan inglés y sesiones de fotografía propias.',
          ro: 'Aura este o agenție de modele cu sediul în Kiev, care activează într-o zonă rezidențială liniștită, la câțiva pași de metrou, și recrutează pentru platforme webcam internaționale. Agenția promovează câștiguri de la aproximativ 700 de dolari pe lună pentru program parțial, până la 10.000 de dolari pentru modele cu normă întreagă, plătite săptămânal prin transfer bancar, cu un comision dinamic în loc de un procent fix. Modelele aleg dintre trei ture — dimineața, seara sau noaptea — cu minimum patru ture pe săptămână. Studioul oferă internet de mare viteză, computere moderne și camere web HD la fața locului, plus operatori-traducători pentru modelele care nu vorbesc engleză și sesiuni foto proprii.',
          uk: 'Aura — модельне агентство з Києва, що працює в тихому спальному районі в пішій доступності від метро, набираючи моделей для міжнародних вебкам-платформ. Агентство рекламує заробіток від приблизно 700 доларів на місяць за часткову зайнятість до 10 000 доларів для моделей повного дня, з виплатою щотижня на банківську картку, з динамічним відсотком замість фіксованого сплиту. Моделі обирають з трьох змін — ранкової, вечірньої чи нічної — з мінімум чотирма змінами на тиждень. Студія надає високошвидкісний інтернет, сучасні комп\'ютери та HD веб-камери на місці, а також операторів-перекладачів для моделей, які не розмовляють англійською, і власні фотосесії.',
          ru: 'Aura — модельное агентство из Киева, работающее в тихом спальном районе в пешей доступности от метро, набирающее моделей для международных вебкам-платформ. Агентство рекламирует заработок от примерно 700 долларов в месяц за частичную занятость до 10 000 долларов для моделей с полной занятостью, с выплатой еженедельно на банковскую карту, с динамическим процентом вместо фиксированного сплита. Модели выбирают из трёх смен — утренней, вечерней или ночной — с минимум четырьмя сменами в неделю. Студия предоставляет высокоскоростной интернет, современные компьютеры и HD веб-камеры на месте, а также операторов-переводчиков для моделей, не говорящих по-английски, и собственные фотосессии.',
          fr: 'Aura est une agence de modèles basée à Kiev, opérant dans un quartier résidentiel calme à quelques pas du métro, et recrutant pour des plateformes webcam internationales. Elle annonce des revenus allant d\'environ 700 dollars par mois pour un travail à temps partiel jusqu\'à 10 000 dollars pour les modèles à temps plein, payés chaque semaine par virement bancaire, avec un taux de commission dynamique plutôt qu\'un partage fixe. Les modèles choisissent parmi trois créneaux — matin, soir ou nuit — avec un minimum de quatre créneaux par semaine. Le studio fournit sur place internet haut débit, ordinateurs modernes et webcams HD, ainsi que des opérateurs-traducteurs pour les modèles ne parlant pas anglais et des séances photo maison.',
          pt: 'A Aura é uma agência de modelos sediada em Kyiv, operando em um bairro residencial tranquilo a poucos passos do metrô, recrutando para plataformas webcam internacionais. Anuncia ganhos a partir de cerca de $700 por mês para trabalho de meio período, chegando a $10.000 para modelos em tempo integral, pagos semanalmente por transferência bancária, com uma comissão dinâmica em vez de uma divisão fixa. As modelos escolhem entre três turnos — manhã, noite ou madrugada — com um mínimo de quatro turnos por semana. O estúdio fornece internet de alta velocidade, computadores modernos e webcams HD no local, além de operadores-tradutores para modelos que não falam inglês e sessões de fotos próprias.',
        },
        facts: {
          earnings: '$700–$10,000/mo (dynamic %)',
          locations: ['Kyiv'],
          payout: 'weekly',
          perks: ['support247', 'training'],
          hours: '08:00–16:00, 16:00–23:00, 23:00–08:00 (3 shifts)',
        },
      },
    ],
  },
  {
    key: 'spain',
    studios: [
      {
        slug: 'rosa-estudios',
        name: 'Rosa Estudios',
        city: 'Barcelona',
        website: 'https://rosaestudio.com',
        blurb: {
          en: 'Videochat studio advertising commission rates up to 60% for models at professional level.',
          de: 'Videochat-Studio, das Provisionssätze von bis zu 60% für Models auf professionellem Niveau bewirbt.',
          es: 'Estudio de videochat que anuncia comisiones de hasta el 60% para modelos de nivel profesional.',
          ro: 'Studio de videochat care promovează comisioane de până la 60% pentru modele de nivel profesional.',
          uk: 'Студія відеочату, що рекламує комісійні до 60% для моделей професійного рівня.',
          ru: 'Студия видеочата, рекламирующая комиссионные до 60% для моделей профессионального уровня.',
          fr: 'Studio de webcam-chat annonçant des commissions allant jusqu\'à 60 % pour les modèles de niveau professionnel.',
          pt: 'Estúdio de videochat que anuncia comissões de até 60% para modelos de nível profissional.',
        },
        about: {
          en: 'Rosa Estudios has operated across Spain for over 16 years, with locations in Barcelona, Madrid, Valencia, and Castellón and more than 700 models on its roster. It pays a 50–60% commission split with payouts every two weeks, and has invested in streaming technology beyond standard webcam setups — 4K Ultra HD for regular 2D shows, a dedicated 3D volumetric-capture studio, and 8K VR streaming for models who want to work in those formats. The studio offers flexible scheduling, professional photo and video sessions, styling consultations, and 24/7 support for its models.',
          de: 'Rosa Estudios ist seit über 16 Jahren in ganz Spanien tätig, mit Standorten in Barcelona, Madrid, Valencia und Castellón und mehr als 700 Models im Portfolio. Es zahlt einen Provisionssatz von 50–60 % mit Auszahlungen alle zwei Wochen und hat über klassische Webcam-Setups hinaus in Streaming-Technologie investiert — 4K Ultra HD für reguläre 2D-Shows, ein eigenes 3D-Volumetric-Capture-Studio und 8K-VR-Streaming für Models, die in diesen Formaten arbeiten möchten. Das Studio bietet flexible Zeitpläne, professionelle Foto- und Videoshootings, Styling-Beratung und 24/7-Support für seine Models.',
          es: 'Rosa Estudios lleva más de 16 años operando en toda España, con sedes en Barcelona, Madrid, Valencia y Castellón, y más de 700 modelos en su plantilla. Paga una comisión del 50–60% con pagos cada dos semanas, y ha invertido en tecnología de streaming más allá del equipo webcam estándar — 4K Ultra HD para shows 2D habituales, un estudio 3D dedicado de captura volumétrica y streaming VR en 8K para modelos que quieran trabajar en esos formatos. El estudio ofrece horarios flexibles, sesiones profesionales de foto y vídeo, asesoramiento de estilismo y soporte 24/7 para sus modelos.',
          ro: 'Rosa Estudios activează în toată Spania de peste 16 ani, cu locații în Barcelona, Madrid, Valencia și Castellón și peste 700 de modele în portofoliu. Plătește un comision de 50–60%, cu plăți la fiecare două săptămâni, și a investit în tehnologie de streaming dincolo de echipamentul webcam standard — 4K Ultra HD pentru emisiuni 2D obișnuite, un studio 3D dedicat pentru captură volumetrică și streaming VR 8K pentru modelele care doresc să lucreze în aceste formate. Studioul oferă program flexibil, sesiuni foto și video profesionale, consultanță de styling și suport 24/7 pentru modelele sale.',
          uk: 'Rosa Estudios працює по всій Іспанії понад 16 років, з локаціями в Барселоні, Мадриді, Валенсії та Кастельйоні, і має понад 700 моделей у своєму штаті. Платить комісію 50–60% з виплатами кожні два тижні, і інвестувала в стрімінгові технології поза стандартним вебкам-обладнанням — 4K Ultra HD для звичайних 2D-шоу, окрему 3D-студію для об\'ємної зйомки та 8K VR-стрімінг для моделей, які хочуть працювати в цих форматах. Студія пропонує гнучкий графік, професійні фото- та відеосесії, консультації зі стилю та підтримку 24/7 для своїх моделей.',
          ru: 'Rosa Estudios работает по всей Испании более 16 лет, с локациями в Барселоне, Мадриде, Валенсии и Кастельоне, и имеет более 700 моделей в своём штате. Платит комиссию 50–60% с выплатами каждые две недели, и инвестировала в стриминговые технологии помимо стандартного вебкам-оборудования — 4K Ultra HD для обычных 2D-шоу, отдельную 3D-студию для объёмной съёмки и 8K VR-стриминг для моделей, которые хотят работать в этих форматах. Студия предлагает гибкий график, профессиональные фото- и видеосессии, консультации по стилю и поддержку 24/7 для своих моделей.',
          fr: 'Rosa Estudios opère dans toute l\'Espagne depuis plus de 16 ans, avec des sites à Barcelone, Madrid, Valence et Castellón, et plus de 700 modèles sur ses effectifs. Il verse une commission de 50 à 60 % avec des paiements toutes les deux semaines, et a investi dans une technologie de streaming au-delà de l\'équipement webcam standard — 4K Ultra HD pour les shows 2D habituels, un studio 3D dédié à la capture volumétrique et un streaming VR 8K pour les modèles souhaitant travailler dans ces formats. Le studio propose des horaires flexibles, des séances photo et vidéo professionnelles, des conseils de style et un support 24/7 pour ses modèles.',
          pt: 'A Rosa Estudios opera em toda a Espanha há mais de 16 anos, com unidades em Barcelona, Madri, Valência e Castellón, e mais de 700 modelos em seu quadro. Paga uma comissão de 50–60% com pagamentos a cada duas semanas, e investiu em tecnologia de streaming além do equipamento webcam padrão — 4K Ultra HD para shows 2D regulares, um estúdio 3D dedicado à captura volumétrica e streaming VR em 8K para modelos que queiram trabalhar nesses formatos. O estúdio oferece horários flexíveis, sessões profissionais de foto e vídeo, consultoria de styling e suporte 24/7 para suas modelos.',
        },
        facts: {
          earnings: '50–60% split',
          experienceYears: 16,
          locations: ['Barcelona', 'Madrid', 'Valencia', 'Castellón'],
          models: '700+',
          payout: 'biweekly',
          perks: ['vrTech', 'support247'],
          phone: '+34 624 456 472',
          email: 'rosaestudioinfo@gmail.com',
        },
      },
      {
        slug: 'webmodel-valencia',
        name: 'WebModel Valencia',
        city: 'Valencia',
        website: 'https://webmodel-valencia.com',
        blurb: {
          en: 'Studio based in Valencia providing a working space and equipment for webcam models.',
          de: 'Studio in Valencia, das Arbeitsplatz und Ausrüstung für Webcam-Models bereitstellt.',
          es: 'Estudio con sede en Valencia que ofrece espacio de trabajo y equipo para modelos webcam.',
          ro: 'Studio cu sediul în Valencia care oferă spațiu de lucru și echipament pentru modele webcam.',
          uk: 'Студія у Валенсії, що надає робочий простір і обладнання для вебкам-моделей.',
          ru: 'Студия в Валенсии, предоставляющая рабочее пространство и оборудование для вебкам-моделей.',
          fr: 'Studio basé à Valence proposant un espace de travail et du matériel pour les modèles webcam.',
          pt: 'Estúdio sediado em Valência que oferece espaço de trabalho e equipamento para modelos webcam.',
        },
        about: {
          en: 'WebModel Valencia operates out of the center of the city, close to the Turia metro stop, and has over 10 years of experience running the studio. It pays up to 65% commission, split into twice-monthly payments with daily payouts available during a model\'s first week. The studio provides 4K cameras, professional lighting, and powerful computers, and can also equip models who prefer to work remotely from home rather than on-site. Housing is available for models relocating to Valencia, and the studio accepts women, couples, and mature applicants alike, with its site available in Spanish, English, and Russian.',
          de: 'WebModel Valencia befindet sich im Zentrum der Stadt, nahe der Metrostation Turia, und verfügt über mehr als 10 Jahre Erfahrung im Betrieb des Studios. Es zahlt bis zu 65 % Provision, aufgeteilt in zweimal monatliche Zahlungen mit täglichen Auszahlungen in der ersten Woche eines Models. Das Studio stellt 4K-Kameras, professionelle Beleuchtung und leistungsstarke Computer bereit und kann auch Models ausstatten, die lieber remote von zu Hause aus arbeiten möchten. Für Models, die nach Valencia ziehen, steht eine Unterkunft zur Verfügung, und das Studio akzeptiert Frauen, Paare und reifere Bewerberinnen gleichermaßen; die Website ist auf Spanisch, Englisch und Russisch verfügbar.',
          es: 'WebModel Valencia opera en el centro de la ciudad, cerca de la parada de metro de Turia, y cuenta con más de 10 años de experiencia dirigiendo el estudio. Paga hasta un 65% de comisión, repartida en pagos dos veces al mes, con pagos diarios disponibles durante la primera semana de una modelo. El estudio proporciona cámaras 4K, iluminación profesional y ordenadores potentes, y también puede equipar a las modelos que prefieran trabajar de forma remota desde casa. Se ofrece alojamiento para modelos que se mudan a Valencia, y el estudio acepta chicas, parejas y mujeres maduras por igual, con su web disponible en español, inglés y ruso.',
          ro: 'WebModel Valencia funcționează în centrul orașului, aproape de stația de metrou Turia, și are peste 10 ani de experiență în administrarea studioului. Plătește un comision de până la 65%, împărțit în plăți de două ori pe lună, cu plăți zilnice disponibile în prima săptămână a unei modele. Studioul oferă camere 4K, iluminat profesional și computere puternice, și poate echipa și modele care preferă să lucreze de la distanță, de acasă. Cazarea este disponibilă pentru modelele care se mută în Valencia, iar studioul acceptă deopotrivă femei, cupluri și candidate mature, site-ul fiind disponibil în spaniolă, engleză și rusă.',
          uk: 'WebModel Valencia працює в центрі міста, поруч зі станцією метро Turia, і має понад 10 років досвіду керування студією. Платить комісію до 65%, розділену на виплати двічі на місяць, з можливістю щоденних виплат протягом першого тижня моделі. Студія надає 4K камери, професійне освітлення та потужні комп\'ютери, а також може обладнати моделей, які воліють працювати віддалено з дому. Житло доступне для моделей, які переїжджають до Валенсії, і студія приймає жінок, пари та зрілих кандидаток однаково, а сайт доступний іспанською, англійською та російською мовами.',
          ru: 'WebModel Valencia работает в центре города, рядом со станцией метро Turia, и имеет более 10 лет опыта управления студией. Платит комиссию до 65%, разделённую на выплаты дважды в месяц, с возможностью ежедневных выплат в течение первой недели модели. Студия предоставляет 4K камеры, профессиональное освещение и мощные компьютеры, а также может оснастить моделей, предпочитающих работать удалённо из дома. Жильё доступно для моделей, переезжающих в Валенсию, и студия принимает женщин, пары и зрелых кандидаток в равной степени, а сайт доступен на испанском, английском и русском языках.',
          fr: 'WebModel Valencia opère dans le centre-ville, près de la station de métro Turia, et possède plus de 10 ans d\'expérience dans la gestion du studio. Il verse jusqu\'à 65 % de commission, répartie en paiements deux fois par mois, avec des versements quotidiens disponibles durant la première semaine d\'une modèle. Le studio fournit des caméras 4K, un éclairage professionnel et des ordinateurs puissants, et peut également équiper les modèles préférant travailler à distance depuis chez elles. Un logement est disponible pour les modèles s\'installant à Valence, et le studio accepte aussi bien les femmes, les couples que les candidates plus matures, son site étant disponible en espagnol, anglais et russe.',
          pt: 'A WebModel Valencia opera no centro da cidade, perto da estação de metrô Turia, e tem mais de 10 anos de experiência administrando o estúdio. Paga até 65% de comissão, dividida em pagamentos duas vezes por mês, com pagamentos diários disponíveis durante a primeira semana de uma modelo. O estúdio fornece câmeras 4K, iluminação profissional e computadores potentes, e também pode equipar modelos que prefiram trabalhar remotamente de casa. Hospedagem está disponível para modelos que se mudam para Valência, e o estúdio aceita mulheres, casais e candidatas maduras igualmente, com seu site disponível em espanhol, inglês e russo.',
        },
        facts: {
          earnings: 'up to 65% split',
          experienceYears: 10,
          locations: ['Valencia'],
          payout: 'twiceMonthly',
          perks: ['housing', 'remoteOption'],
          phone: '+34 695 652 676',
          email: 'info@webmodel-valencia.com',
          hours: '24/7',
        },
      },
    ],
  },
  {
    key: 'russia',
    studios: [
      {
        slug: 'andromeda-studio',
        name: 'Andromeda Studio',
        city: 'Saint Petersburg',
        website: 'https://andromedastudio.ru',
        blurb: {
          en: 'St. Petersburg studio near two metro stations, working with Chaturbate, Stripchat, Flirt4Free, and CamSoda.',
          de: 'Studio in St. Petersburg nahe zwei Metrostationen, das mit Chaturbate, Stripchat, Flirt4Free und CamSoda zusammenarbeitet.',
          es: 'Estudio en San Petersburgo cerca de dos estaciones de metro, que trabaja con Chaturbate, Stripchat, Flirt4Free y CamSoda.',
          ro: 'Studio din Sankt Petersburg, aproape de două stații de metrou, care lucrează cu Chaturbate, Stripchat, Flirt4Free și CamSoda.',
          uk: 'Студія в Санкт-Петербурзі біля двох станцій метро, що працює з Chaturbate, Stripchat, Flirt4Free та CamSoda.',
          ru: 'Студия в Санкт-Петербурге рядом с двумя станциями метро, работающая с Chaturbate, Stripchat, Flirt4Free и CamSoda.',
          fr: 'Studio à Saint-Pétersbourg près de deux stations de métro, travaillant avec Chaturbate, Stripchat, Flirt4Free et CamSoda.',
          pt: 'Estúdio em São Petersburgo perto de duas estações de metrô, trabalhando com Chaturbate, Stripchat, Flirt4Free e CamSoda.',
        },
        about: {
          en: 'Andromeda Studio operates a physical office in central Saint Petersburg, near both Ploshchad Alexandra Nevskogo and Ploshchad Vosstaniya metro stations. New models receive a 5,000 ruble guarantee after their first shift, with commission climbing to as much as 70%, plus a 10% bonus for taking extra shifts. Payouts are available daily. The studio streams on foreign platforms — Chaturbate, Stripchat, Flirt4Free, and CamSoda — with geo-blocking to keep models anonymous from viewers in Russia and the CIS, and works under stage names rather than real identities. Contact is handled through Telegram and email rather than a public phone line.',
          de: 'Andromeda Studio betreibt ein physisches Büro im Zentrum von St. Petersburg, nahe den Metrostationen Ploschtschad Alexandra Newskogo und Ploschtschad Wosstanija. Neue Models erhalten nach ihrer ersten Schicht eine Garantie von 5.000 Rubel, wobei die Provision auf bis zu 70 % steigen kann, plus einen 10-%-Bonus für zusätzliche Schichten. Auszahlungen sind täglich möglich. Das Studio streamt auf ausländischen Plattformen — Chaturbate, Stripchat, Flirt4Free und CamSoda — mit Geoblocking, damit Models für Zuschauer aus Russland und der GUS anonym bleiben, und arbeitet mit Künstlernamen statt echten Identitäten. Der Kontakt läuft über Telegram und E-Mail statt über eine öffentliche Telefonnummer.',
          es: 'Andromeda Studio opera una oficina física en el centro de San Petersburgo, cerca de las estaciones de metro Ploshchad Alexandra Nevskogo y Ploshchad Vosstaniya. Las nuevas modelos reciben una garantía de 5.000 rublos tras su primer turno, con una comisión que puede llegar al 70%, más un bono del 10% por turnos adicionales. Los pagos están disponibles a diario. El estudio transmite en plataformas extranjeras — Chaturbate, Stripchat, Flirt4Free y CamSoda — con geobloqueo para mantener a las modelos anónimas ante espectadores de Rusia y la CEI, y trabaja con nombres artísticos en lugar de identidades reales. El contacto se gestiona por Telegram y correo electrónico, sin línea telefónica pública.',
          ro: 'Andromeda Studio operează un birou fizic în centrul Sankt Petersburgului, aproape de stațiile de metrou Ploshchad Alexandra Nevskogo și Ploshchad Vosstaniya. Modelele noi primesc o garanție de 5.000 de ruble după prima tură, cu un comision care poate ajunge la 70%, plus un bonus de 10% pentru ture suplimentare. Plățile sunt disponibile zilnic. Studioul transmite pe platforme străine — Chaturbate, Stripchat, Flirt4Free și CamSoda — cu geo-blocare pentru a păstra anonimatul modelelor față de privitorii din Rusia și CSI, și lucrează cu nume de scenă, nu cu identități reale. Contactul se face prin Telegram și e-mail, fără linie telefonică publică.',
          uk: 'Andromeda Studio працює з фізичного офісу в центрі Санкт-Петербурга, поблизу станцій метро Площа Олександра Невського та Площа Повстання. Нові моделі отримують гарантію 5000 рублів після першої зміни, а комісія може зростати до 70%, плюс 10% бонус за додаткові зміни. Виплати доступні щодня. Студія транслює на закордонних платформах — Chaturbate, Stripchat, Flirt4Free та CamSoda — з гео-блокуванням, щоб зберегти анонімність моделей від глядачів з Росії та СНД, і працює під сценічними іменами, а не реальними. Контакт — через Telegram та email, без публічного телефону.',
          ru: 'Andromeda Studio работает из физического офиса в центре Санкт-Петербурга, рядом со станциями метро Площадь Александра Невского и Площадь Восстания. Новые модели получают гарантию 5000 рублей после первой смены, а комиссия может вырасти до 70%, плюс 10% бонус за дополнительные смены. Выплаты доступны ежедневно. Студия транслирует на зарубежных платформах — Chaturbate, Stripchat, Flirt4Free и CamSoda — с гео-блокировкой, чтобы сохранить анонимность моделей от зрителей из России и СНГ, и работает под сценическими именами, а не реальными. Связь — через Telegram и email, без публичного телефона.',
          fr: 'Andromeda Studio exploite un bureau physique dans le centre de Saint-Pétersbourg, près des stations de métro Ploshchad Alexandra Nevskogo et Ploshchad Vosstaniya. Les nouvelles modèles reçoivent une garantie de 5 000 roubles après leur premier service, avec une commission pouvant atteindre 70 %, plus un bonus de 10 % pour les services supplémentaires. Les paiements sont disponibles quotidiennement. Le studio diffuse sur des plateformes étrangères — Chaturbate, Stripchat, Flirt4Free et CamSoda — avec un géo-blocage pour préserver l\'anonymat des modèles vis-à-vis des spectateurs de Russie et de la CEI, et fonctionne avec des pseudonymes plutôt que des identités réelles. Le contact se fait via Telegram et e-mail, sans ligne téléphonique publique.',
          pt: 'A Andromeda Studio opera um escritório físico no centro de São Petersburgo, perto das estações de metrô Ploshchad Alexandra Nevskogo e Ploshchad Vosstaniya. Novas modelos recebem uma garantia de 5.000 rublos após o primeiro turno, com comissão que pode chegar a 70%, além de um bônus de 10% por turnos extras. Os pagamentos estão disponíveis diariamente. O estúdio transmite em plataformas estrangeiras — Chaturbate, Stripchat, Flirt4Free e CamSoda — com bloqueio geográfico para manter as modelos anônimas para espectadores da Rússia e da CEI, e trabalha com nomes artísticos em vez de identidades reais. O contato é feito por Telegram e e-mail, sem linha telefônica pública.',
        },
        facts: {
          earnings: 'Up to 70% split + 5,000 RUB guarantee after 1st shift',
          locations: ['Saint Petersburg'],
          platforms: ['Chaturbate', 'Stripchat', 'Flirt4Free', 'CamSoda'],
          payout: 'daily',
          email: 'andromedastudio.hr@gmail.com',
        },
      },
    ],
  },
  {
    key: 'usa',
    studios: [
      {
        slug: 'new-industry-models',
        name: 'New Industry Models',
        city: 'Los Angeles',
        website: 'https://newindustrymodels.com',
        blurb: {
          en: 'Los Angeles studio with private cam rooms, operating since 2010 with over 2,000 models worked with.',
          de: 'Studio in Los Angeles mit privaten Cam-Räumen, aktiv seit 2010 mit über 2.000 betreuten Models.',
          es: 'Estudio en Los Ángeles con salas privadas de cámara, operando desde 2010 con más de 2.000 modelos.',
          ro: 'Studio din Los Angeles cu camere private, activ din 2010, cu peste 2.000 de modele.',
          uk: 'Студія в Лос-Анджелесі з приватними кімнатами, працює з 2010 року, понад 2000 моделей.',
          ru: 'Студия в Лос-Анджелесе с приватными комнатами, работает с 2010 года, более 2000 моделей.',
          fr: 'Studio à Los Angeles avec cabines privées, actif depuis 2010 avec plus de 2 000 modèles.',
          pt: 'Estúdio em Los Angeles com salas privadas, ativo desde 2010 com mais de 2.000 modelos.',
        },
        about: {
          en: 'New Industry Models runs private cam rooms out of a discreet, secured office building on the top floor in Los Angeles, California, with access restricted to models only — no on-site manager walking the floor. The studio has operated since 2010 and says it has worked with over 2,000 webcam models to date, with the main platform reporting more than 5 million daily visitors. It advertises average earnings of $75 an hour, with active models clearing $6,000 or more a month, paid in full with no deductions via Zelle, Google Pay, or Cash App on a weekly schedule. Support runs through Telegram, and rooms come equipped with high-end computers, HD webcams, and professional lighting already set up.',
          de: 'New Industry Models betreibt private Cam-Räume in einem diskreten, gesicherten Bürogebäude im obersten Stockwerk in Los Angeles, Kalifornien, mit Zugang ausschließlich für Models — kein Manager, der vor Ort patrouilliert. Das Studio ist seit 2010 aktiv und gibt an, bisher mit über 2.000 Webcam-Models gearbeitet zu haben, wobei die Hauptplattform über 5 Millionen tägliche Besucher meldet. Es wirbt mit einem Durchschnittsverdienst von 75 US-Dollar pro Stunde, wobei aktive Models 6.000 US-Dollar oder mehr im Monat erzielen, vollständig ohne Abzüge ausgezahlt per Zelle, Google Pay oder Cash App auf wöchentlicher Basis. Der Support läuft über Telegram, und die Räume sind bereits mit leistungsstarken Computern, HD-Webcams und professioneller Beleuchtung ausgestattet.',
          es: 'New Industry Models opera salas privadas de cámara en un edificio de oficinas discreto y seguro, en el último piso, en Los Ángeles, California, con acceso restringido únicamente a las modelos — sin un gerente rondando el lugar. El estudio funciona desde 2010 y afirma haber trabajado con más de 2.000 modelos webcam hasta la fecha, con la plataforma principal reportando más de 5 millones de visitantes diarios. Anuncia ganancias promedio de 75 dólares por hora, con modelos activas que superan los 6.000 dólares al mes, pagados en su totalidad sin deducciones vía Zelle, Google Pay o Cash App semanalmente. El soporte se ofrece por Telegram, y las salas ya cuentan con ordenadores de alta gama, cámaras HD e iluminación profesional.',
          ro: 'New Industry Models operează camere private pentru cam la ultimul etaj al unei clădiri de birouri discrete și securizate din Los Angeles, California, cu acces restricționat doar pentru modele — fără un manager care să supravegheze locul. Studioul funcționează din 2010 și afirmă că a lucrat cu peste 2.000 de modele webcam până acum, platforma principală raportând peste 5 milioane de vizitatori zilnici. Promovează câștiguri medii de 75 de dolari pe oră, modelele active depășind 6.000 de dolari pe lună, plătite integral, fără deduceri, prin Zelle, Google Pay sau Cash App, săptămânal. Suportul se oferă prin Telegram, iar camerele vin deja echipate cu calculatoare performante, camere web HD și iluminat profesional.',
          uk: 'New Industry Models працює з приватними кімнатами на останньому поверсі непримітної, охоронюваної офісної будівлі в Лос-Анджелесі, Каліфорнія, з доступом лише для моделей — без менеджера, що ходить по студії. Студія працює з 2010 року і заявляє про співпрацю з понад 2000 вебкам-моделей, а основна платформа повідомляє про понад 5 мільйонів відвідувачів щодня. Рекламує середній заробіток 75 доларів на годину, активні моделі отримують 6000 доларів і більше на місяць, виплата повна, без відрахувань, через Zelle, Google Pay чи Cash App щотижня. Підтримка — через Telegram, а кімнати вже обладнані потужними комп\'ютерами, HD-камерами та професійним освітленням.',
          ru: 'New Industry Models работает с приватными комнатами на последнем этаже неприметного охраняемого офисного здания в Лос-Анджелесе, Калифорния, с доступом только для моделей — без менеджера, ходящего по студии. Студия работает с 2010 года и заявляет о сотрудничестве более чем с 2000 вебкам-моделей, а основная платформа сообщает о более чем 5 миллионах посетителей ежедневно. Рекламирует средний заработок 75 долларов в час, активные модели получают 6000 долларов и больше в месяц, выплата полная, без вычетов, через Zelle, Google Pay или Cash App еженедельно. Поддержка — через Telegram, а комнаты уже оснащены мощными компьютерами, HD-камерами и профессиональным освещением.',
          fr: 'New Industry Models exploite des cabines privées au dernier étage d\'un immeuble de bureaux discret et sécurisé à Los Angeles, en Californie, avec un accès réservé uniquement aux modèles — sans manager qui patrouille sur place. Le studio est actif depuis 2010 et affirme avoir travaillé avec plus de 2 000 modèles webcam à ce jour, la plateforme principale rapportant plus de 5 millions de visiteurs quotidiens. Il annonce des gains moyens de 75 dollars de l\'heure, les modèles actives dépassant 6 000 dollars par mois, payés intégralement sans déduction via Zelle, Google Pay ou Cash App, chaque semaine. Le support se fait via Telegram, et les cabines sont déjà équipées d\'ordinateurs performants, de webcams HD et d\'un éclairage professionnel.',
          pt: 'A New Industry Models opera salas privadas no último andar de um discreto e seguro prédio de escritórios em Los Angeles, Califórnia, com acesso restrito apenas às modelos — sem gerente circulando pelo local. O estúdio funciona desde 2010 e afirma já ter trabalhado com mais de 2.000 modelos webcam, com a plataforma principal registrando mais de 5 milhões de visitantes diários. Anuncia ganhos médios de $75 por hora, com modelos ativas ultrapassando $6.000 por mês, pagos integralmente sem descontos via Zelle, Google Pay ou Cash App, semanalmente. O suporte é feito pelo Telegram, e as salas já vêm equipadas com computadores potentes, webcams HD e iluminação profissional.',
        },
        facts: {
          earnings: '$75/hr avg, $6,000+/mo for active models',
          experienceYears: 16,
          locations: ['Los Angeles'],
          models: '2,000+ (all-time)',
          payout: 'weekly',
          phone: '818-660-6467',
        },
      },
    ],
  },
  {
    key: 'germany',
    studios: [
      {
        slug: 'webcammaedchen',
        name: 'Webcammädchen.org',
        city: 'Darmstadt (near Frankfurt)',
        website: 'https://webcammaedchen.org',
        blurb: {
          en: 'Home-based webcam agency near Frankfurt offering formal, social-insured employment with base salary plus bonuses.',
          de: 'Heimbasierte Webcam-Agentur bei Frankfurt mit sozialversicherter Festanstellung, Grundgehalt plus Bonus.',
          es: 'Agencia webcam desde casa cerca de Fráncfort con empleo formal asegurado, salario base más bonos.',
          ro: 'Agenție webcam de acasă lângă Frankfurt, cu angajare formală asigurată, salariu de bază plus bonusuri.',
          uk: 'Домашнє вебкам-агентство біля Франкфурта з офіційним працевлаштуванням, базовою зарплатою і бонусами.',
          ru: 'Домашнее вебкам-агентство рядом с Франкфуртом с официальным трудоустройством, базовой зарплатой и бонусами.',
          fr: 'Agence webcam à domicile près de Francfort avec emploi formel assuré, salaire de base plus primes.',
          pt: 'Agência de webcam em casa perto de Frankfurt com emprego formal segurado, salário base mais bônus.',
        },
        about: {
          en: 'Webcammädchen.org is a home-based webcam agency operating out of Darmstadt, near Frankfurt am Main, with 15 years in the business. Unlike most webcam arrangements, it hires models under a fully social-insured permanent employment contract — a fixed base salary plus a performance bonus model, rather than a pure revenue split, with visibility into all earnings. Benefits include paid sick leave and vacation pay, which is unusual for the industry. Models work from their own home rather than an on-site studio, with technical support and training provided remotely. Contact runs through a callback request or email, and the agency recruits from anywhere in Germany, not just the Frankfurt area.',
          de: 'Webcammädchen.org ist eine heimbasierte Webcam-Agentur mit Sitz in Darmstadt bei Frankfurt am Main und 15 Jahren Erfahrung im Geschäft. Anders als bei den meisten Webcam-Modellen werden Models hier unter einer voll sozialversicherten Festanstellung beschäftigt — ein festes Grundgehalt plus ein Bonusmodell statt einer reinen Umsatzbeteiligung, mit Einblick in alle Umsätze. Zu den Leistungen zählen Krankengeld und Urlaubsgeld, was in der Branche unüblich ist. Models arbeiten von zu Hause statt in einem Vor-Ort-Studio, mit technischem Support und Schulung aus der Ferne. Der Kontakt läuft über einen Rückruf-Wunsch oder per E-Mail, und die Agentur rekrutiert deutschlandweit, nicht nur im Raum Frankfurt.',
          es: 'Webcammädchen.org es una agencia webcam desde casa con sede en Darmstadt, cerca de Fráncfort del Meno, con 15 años en el negocio. A diferencia de la mayoría de acuerdos webcam, contrata a las modelos bajo un empleo fijo con seguridad social plena — un salario base fijo más un modelo de bonos por rendimiento, en lugar de un simple reparto de ingresos, con visibilidad total de las ganancias. Los beneficios incluyen baja por enfermedad pagada y vacaciones pagadas, algo inusual en la industria. Las modelos trabajan desde su propia casa en lugar de un estudio físico, con soporte técnico y formación a distancia. El contacto se realiza mediante solicitud de devolución de llamada o correo electrónico, y la agencia recluta en toda Alemania, no solo en el área de Fráncfort.',
          ro: 'Webcammädchen.org este o agenție webcam de acasă cu sediul în Darmstadt, lângă Frankfurt am Main, cu 15 ani în domeniu. Spre deosebire de majoritatea aranjamentelor webcam, angajează modelele printr-un contract de muncă permanent, complet asigurat social — un salariu de bază fix plus un model de bonusuri de performanță, în loc de o simplă împărțire a veniturilor, cu vizibilitate completă asupra câștigurilor. Beneficiile includ concediu medical plătit și concediu de odihnă plătit, ceva neobișnuit în industrie. Modelele lucrează de acasă, nu într-un studio fizic, cu suport tehnic și instruire la distanță. Contactul se face prin solicitare de apel sau e-mail, iar agenția recrutează din toată Germania, nu doar din zona Frankfurt.',
          uk: 'Webcammädchen.org — це домашнє вебкам-агентство з базою в Дармштадті, поблизу Франкфурта-на-Майні, з 15-річним досвідом у галузі. На відміну від більшості вебкам-угод, тут моделей наймають за повністю соціально застрахованим постійним трудовим договором — фіксована базова зарплата плюс бонусна модель за результатами, а не проста частка від доходу, з повною видимістю заробітку. Пільги включають оплачувану лікарняну та оплачувану відпустку, що незвично для індустрії. Моделі працюють з дому, а не в фізичній студії, з технічною підтримкою та навчанням віддалено. Контакт — через запит на дзвінок або email, агентство набирає по всій Німеччині, а не лише в районі Франкфурта.',
          ru: 'Webcammädchen.org — это домашнее вебкам-агентство с базой в Дармштадте, рядом с Франкфуртом-на-Майне, с 15-летним опытом в индустрии. В отличие от большинства вебкам-соглашений, здесь моделей нанимают по полностью социально застрахованному постоянному трудовому договору — фиксированная базовая зарплата плюс бонусная модель по результатам, а не простая доля от дохода, с полной прозрачностью заработка. Льготы включают оплачиваемый больничный и оплачиваемый отпуск, что необычно для индустрии. Модели работают из дома, а не в физической студии, с технической поддержкой и обучением удалённо. Контакт — через запрос обратного звонка или email, агентство набирает по всей Германии, а не только в районе Франкфурта.',
          fr: 'Webcammädchen.org est une agence webcam à domicile basée à Darmstadt, près de Francfort-sur-le-Main, avec 15 ans d\'expérience dans le secteur. Contrairement à la plupart des arrangements webcam, elle embauche les modèles sous un contrat d\'emploi permanent entièrement assuré socialement — un salaire de base fixe plus un modèle de primes de performance, plutôt qu\'un simple partage des revenus, avec une visibilité totale sur les gains. Les avantages incluent des congés maladie payés et des congés payés, ce qui est inhabituel dans le secteur. Les modèles travaillent depuis leur propre domicile plutôt que dans un studio physique, avec support technique et formation à distance. Le contact se fait par demande de rappel ou par e-mail, et l\'agence recrute dans toute l\'Allemagne, pas seulement dans la région de Francfort.',
          pt: 'Webcammädchen.org é uma agência de webcam em casa, sediada em Darmstadt, perto de Frankfurt am Main, com 15 anos no setor. Diferente da maioria dos acordos de webcam, ela contrata modelos sob um contrato de trabalho permanente totalmente segurado — salário-base fixo mais um modelo de bônus por desempenho, em vez de uma simples divisão de receita, com visibilidade total sobre os ganhos. Os benefícios incluem licença médica remunerada e férias remuneradas, algo incomum no setor. As modelos trabalham de sua própria casa, não em um estúdio físico, com suporte técnico e treinamento remotos. O contato é feito por solicitação de retorno de chamada ou e-mail, e a agência recruta em toda a Alemanha, não apenas na região de Frankfurt.',
        },
        facts: {
          earnings: 'Base salary + performance bonus (not a flat split)',
          experienceYears: 15,
          locations: ['Darmstadt', 'Frankfurt am Main area'],
          email: 'hallo@webcammaedchen.org',
          perks: ['legalContract', 'remoteOption', 'training'],
        },
      },
    ],
  },
  {
    key: 'france',
    studios: [
      {
        slug: 'modele-webcam',
        name: 'Modèle Webcam',
        city: 'Remote (France-wide)',
        website: 'https://modelewebcam.fr',
        blurb: {
          en: 'France-wide home-based webcam recruiting site offering free training and weekly payments.',
          de: 'Landesweite französische Heimarbeits-Plattform für Webcam-Models mit kostenlosem Training und wöchentlicher Auszahlung.',
          es: 'Plataforma francesa de reclutamiento webcam desde casa, con formación gratuita y pagos semanales.',
          ro: 'Platformă franceză de recrutare webcam de acasă, cu instruire gratuită și plăți săptămânale.',
          uk: 'Французька платформа для домашньої вебкам-роботи з безкоштовним навчанням і щотижневими виплатами.',
          ru: 'Французская платформа для домашней вебкам-работы с бесплатным обучением и еженедельными выплатами.',
          fr: 'Plateforme française de recrutement webcam à domicile, avec formation gratuite et paiements hebdomadaires.',
          pt: 'Plataforma francesa de recrutamento de webcam em casa, com treinamento gratuito e pagamentos semanais.',
        },
        about: {
          en: "Modèle Webcam is a France-wide recruiting site for home-based webcam work, open to both beginners and experienced models with no nationality or appearance requirement. It advertises free training, weekly secure payments, and 24/7 support, along with full anonymity for models who want it. Unlike the studio-based listings elsewhere on this page, there's no physical location to visit — models sign up and work entirely from their own home on their own schedule. The site does not publish a specific commission split or founding date, so treat those details as unconfirmed until you ask directly during onboarding.",
          de: 'Modèle Webcam ist eine landesweite französische Plattform für die Anwerbung von Webcam-Models für die Arbeit von zu Hause, offen für Anfängerinnen wie erfahrene Models, ohne Anforderungen an Nationalität oder Aussehen. Sie wirbt mit kostenlosem Training, sicheren wöchentlichen Auszahlungen und 24/7-Support sowie voller Anonymität für Models, die das wünschen. Anders als bei den Studio-Einträgen weiter oben auf dieser Seite gibt es hier keinen physischen Ort zum Besuchen — Models melden sich an und arbeiten komplett von zu Hause aus, nach eigenem Zeitplan. Die Seite veröffentlicht keinen konkreten Provisionssatz oder ein Gründungsdatum, behandle diese Details also als unbestätigt, bis du beim Onboarding direkt nachfragst.',
          es: 'Modèle Webcam es una plataforma francesa de reclutamiento a nivel nacional para trabajo webcam desde casa, abierta tanto a principiantes como a modelos con experiencia, sin requisitos de nacionalidad o apariencia. Anuncia formación gratuita, pagos semanales seguros y soporte 24/7, junto con anonimato total para quienes lo deseen. A diferencia de los estudios listados en esta página, aquí no hay un lugar físico que visitar — las modelos se registran y trabajan totalmente desde su propia casa, con su propio horario. El sitio no publica una comisión específica ni una fecha de fundación, así que trata esos detalles como no confirmados hasta preguntarlos directamente durante el proceso de incorporación.',
          ro: 'Modèle Webcam este o platformă franceză la nivel național pentru recrutarea de modele webcam pentru munca de acasă, deschisă atât începătoarelor, cât și modelelor cu experiență, fără cerințe de naționalitate sau aspect. Promovează instruire gratuită, plăți săptămânale sigure și suport 24/7, plus anonimat complet pentru cine îl dorește. Spre deosebire de studiourile listate mai sus pe această pagină, aici nu există o locație fizică de vizitat — modelele se înscriu și lucrează complet de acasă, după propriul program. Site-ul nu publică un comision specific sau o dată de înființare, așa că tratează aceste detalii ca neconfirmate până le întrebi direct în perioada de integrare.',
          uk: 'Modèle Webcam — це французька платформа для набору вебкам-моделей для роботи з дому по всій країні, відкрита як для початківців, так і для досвідчених моделей, без вимог до національності чи зовнішності. Рекламує безкоштовне навчання, безпечні щотижневі виплати та підтримку 24/7, а також повну анонімність для тих, хто цього хоче. На відміну від студій, перелічених вище на цій сторінці, тут немає фізичного місця для відвідування — моделі реєструються і працюють повністю з дому, за власним графіком. Сайт не публікує конкретний відсоток комісії чи дату заснування, тому вважайте ці деталі непідтвердженими, доки не запитаєте напряму під час оформлення.',
          ru: 'Modèle Webcam — это французская платформа для набора вебкам-моделей для работы из дома по всей стране, открытая как для новичков, так и для опытных моделей, без требований к национальности или внешности. Рекламирует бесплатное обучение, безопасные еженедельные выплаты и поддержку 24/7, а также полную анонимность для желающих. В отличие от студий, перечисленных выше на этой странице, здесь нет физического места для посещения — модели регистрируются и работают полностью из дома, по собственному графику. Сайт не публикует конкретный процент комиссии или дату основания, так что считайте эти детали неподтверждёнными, пока не спросите напрямую при оформлении.',
          fr: "Modèle Webcam est une plateforme française de recrutement à l'échelle nationale pour le travail webcam à domicile, ouverte aux débutantes comme aux modèles expérimentées, sans exigence de nationalité ou d'apparence. Elle annonce une formation gratuite, des paiements hebdomadaires sécurisés et un support 24/7, ainsi qu'un anonymat total pour celles qui le souhaitent. Contrairement aux studios listés plus haut sur cette page, il n'y a ici aucun lieu physique à visiter — les modèles s'inscrivent et travaillent entièrement depuis leur domicile, selon leur propre emploi du temps. Le site ne publie pas de commission précise ni de date de création, à considérer donc ces détails comme non confirmés tant que vous ne les demandez pas directement lors de l'intégration.",
          pt: 'Modèle Webcam é uma plataforma francesa de recrutamento em todo o país para trabalho de webcam em casa, aberta tanto a iniciantes quanto a modelos experientes, sem exigência de nacionalidade ou aparência. Anuncia treinamento gratuito, pagamentos semanais seguros e suporte 24/7, além de anonimato total para quem desejar. Diferente dos estúdios listados anteriormente nesta página, aqui não há um local físico para visitar — as modelos se cadastram e trabalham totalmente de casa, no próprio horário. O site não publica uma comissão específica nem uma data de fundação, portanto trate esses detalhes como não confirmados até perguntar diretamente durante o cadastro.',
        },
        facts: {
          locations: ['Remote — France-wide'],
          payout: 'weekly',
          perks: ['training', 'remoteOption', 'support247'],
        },
      },
    ],
  },
];

export const countryNames: Record<CountryKey, Record<string, string>> = {
  romania: { en: 'Romania', de: 'Rumänien', es: 'Rumanía', ro: 'România', uk: 'Румунія', ru: 'Румыния', fr: 'Roumanie', pt: 'Romênia' },
  ukraine: { en: 'Ukraine', de: 'Ukraine', es: 'Ucrania', ro: 'Ucraina', uk: 'Україна', ru: 'Украина', fr: 'Ukraine', pt: 'Ucrânia' },
  spain: { en: 'Spain', de: 'Spanien', es: 'España', ro: 'Spania', uk: 'Іспанія', ru: 'Испания', fr: 'Espagne', pt: 'Espanha' },
  russia: { en: 'Russia', de: 'Russland', es: 'Rusia', ro: 'Rusia', uk: 'Росія', ru: 'Россия', fr: 'Russie', pt: 'Rússia' },
  usa: { en: 'USA', de: 'USA', es: 'EE. UU.', ro: 'SUA', uk: 'США', ru: 'США', fr: 'États-Unis', pt: 'EUA' },
  germany: { en: 'Germany', de: 'Deutschland', es: 'Alemania', ro: 'Germania', uk: 'Німеччина', ru: 'Германия', fr: 'Allemagne', pt: 'Alemanha' },
  france: { en: 'France', de: 'Frankreich', es: 'Francia', ro: 'Franța', uk: 'Франція', ru: 'Франция', fr: 'France', pt: 'França' },
};

export const factLabels: Record<'earnings' | 'experience' | 'locations' | 'platforms' | 'payout' | 'rooms' | 'models' | 'address' | 'phone' | 'email' | 'hours', Record<string, string>> = {
  earnings: { en: 'Earnings', de: 'Verdienst', es: 'Ingresos', ro: 'Câștiguri', uk: 'Заробіток', ru: 'Заработок', fr: 'Revenus', pt: 'Ganhos' },
  experience: { en: 'Experience', de: 'Erfahrung', es: 'Experiencia', ro: 'Experiență', uk: 'Досвід', ru: 'Опыт', fr: 'Expérience', pt: 'Experiência' },
  locations: { en: 'Locations', de: 'Standorte', es: 'Ubicaciones', ro: 'Locații', uk: 'Локації', ru: 'Локации', fr: 'Emplacements', pt: 'Localizações' },
  platforms: { en: 'Platforms', de: 'Plattformen', es: 'Plataformas', ro: 'Platforme', uk: 'Платформи', ru: 'Платформы', fr: 'Plateformes', pt: 'Plataformas' },
  payout: { en: 'Payout', de: 'Auszahlung', es: 'Pago', ro: 'Plată', uk: 'Виплати', ru: 'Выплаты', fr: 'Paiement', pt: 'Pagamento' },
  rooms: { en: 'Rooms', de: 'Räume', es: 'Salas', ro: 'Camere', uk: 'Кімнати', ru: 'Комнаты', fr: 'Salles', pt: 'Salas' },
  models: { en: 'Models', de: 'Models', es: 'Modelos', ro: 'Modele', uk: 'Моделі', ru: 'Модели', fr: 'Modèles', pt: 'Modelos' },
  address: { en: 'Address', de: 'Adresse', es: 'Dirección', ro: 'Adresă', uk: 'Адреса', ru: 'Адрес', fr: 'Adresse', pt: 'Endereço' },
  phone: { en: 'Phone', de: 'Telefon', es: 'Teléfono', ro: 'Telefon', uk: 'Телефон', ru: 'Телефон', fr: 'Téléphone', pt: 'Telefone' },
  email: { en: 'Email', de: 'E-Mail', es: 'Correo', ro: 'E-mail', uk: 'Пошта', ru: 'Почта', fr: 'E-mail', pt: 'E-mail' },
  hours: { en: 'Hours', de: 'Öffnungszeiten', es: 'Horario', ro: 'Program', uk: 'Графік', ru: 'График', fr: 'Horaires', pt: 'Horário' },
};

export const experienceYearsUnit: Record<string, string> = {
  en: 'years', de: 'Jahre', es: 'años', ro: 'ani', uk: 'років', ru: 'лет', fr: 'ans', pt: 'anos',
};

export const payoutLabels: Record<PayoutKey, Record<string, string>> = {
  weekly: { en: 'Weekly', de: 'Wöchentlich', es: 'Semanal', ro: 'Săptămânal', uk: 'Щотижня', ru: 'Еженедельно', fr: 'Hebdomadaire', pt: 'Semanal' },
  biweekly: { en: 'Biweekly', de: 'Alle zwei Wochen', es: 'Quincenal', ro: 'La două săptămâni', uk: 'Раз на два тижні', ru: 'Раз в две недели', fr: 'Toutes les deux semaines', pt: 'Quinzenal' },
  twiceMonthly: { en: 'Twice monthly', de: 'Zweimal monatlich', es: 'Dos veces al mes', ro: 'De două ori pe lună', uk: 'Двічі на місяць', ru: 'Дважды в месяц', fr: 'Deux fois par mois', pt: 'Duas vezes por mês' },
  daily: { en: 'Daily', de: 'Täglich', es: 'Diario', ro: 'Zilnic', uk: 'Щодня', ru: 'Ежедневно', fr: 'Quotidien', pt: 'Diário' },
};

export const perkLabels: Record<PerkKey, Record<string, string>> = {
  housing: { en: 'Housing available', de: 'Unterkunft verfügbar', es: 'Alojamiento disponible', ro: 'Cazare disponibilă', uk: 'Доступне житло', ru: 'Доступно жильё', fr: 'Logement disponible', pt: 'Hospedagem disponível' },
  freeBeauty: { en: 'Free beauty services', de: 'Kostenlose Beauty-Leistungen', es: 'Servicios de belleza gratis', ro: 'Servicii de înfrumusețare gratuite', uk: 'Безкоштовні бʼюті-послуги', ru: 'Бесплатные бьюти-услуги', fr: 'Services beauté gratuits', pt: 'Serviços de beleza gratuitos' },
  legalContract: { en: 'Legal employment contract', de: 'Legaler Arbeitsvertrag', es: 'Contrato laboral legal', ro: 'Contract de muncă legal', uk: 'Легальний трудовий договір', ru: 'Легальный трудовой договор', fr: 'Contrat de travail légal', pt: 'Contrato de trabalho legal' },
  support247: { en: '24/7 support', de: '24/7-Support', es: 'Soporte 24/7', ro: 'Suport 24/7', uk: 'Підтримка 24/7', ru: 'Поддержка 24/7', fr: 'Support 24/7', pt: 'Suporte 24/7' },
  training: { en: 'Free training', de: 'Kostenloses Training', es: 'Formación gratuita', ro: 'Instruire gratuită', uk: 'Безкоштовне навчання', ru: 'Бесплатное обучение', fr: 'Formation gratuite', pt: 'Treinamento gratuito' },
  remoteOption: { en: 'Remote work option', de: 'Option auf Remote-Arbeit', es: 'Opción de trabajo remoto', ro: 'Opțiune de lucru de la distanță', uk: 'Можливість віддаленої роботи', ru: 'Возможность удалённой работы', fr: 'Option de travail à distance', pt: 'Opção de trabalho remoto' },
  vrTech: { en: 'VR / 3D streaming tech', de: 'VR-/3D-Streaming-Technik', es: 'Tecnología de streaming VR/3D', ro: 'Tehnologie de streaming VR/3D', uk: 'VR/3D-технології стрімінгу', ru: 'VR/3D-технологии стриминга', fr: 'Technologie de streaming VR/3D', pt: 'Tecnologia de streaming VR/3D' },
  paidTrip: { en: 'Paid annual trip', de: 'Bezahlte Jahresreise', es: 'Viaje anual pagado', ro: 'Excursie anuală plătită', uk: 'Оплачувана щорічна подорож', ru: 'Оплачиваемая ежегодная поездка', fr: 'Voyage annuel payé', pt: 'Viagem anual paga' },
  referralBonus: { en: 'Referral bonus', de: 'Empfehlungsbonus', es: 'Bono por referidos', ro: 'Bonus de recomandare', uk: 'Реферальний бонус', ru: 'Реферальный бонус', fr: 'Prime de parrainage', pt: 'Bônus de indicação' },
};

export const reviewWord: Record<string, string> = {
  en: 'Webcam Studio Review', de: 'Webcam-Studio Bewertung', es: 'Reseña de Estudio Webcam', ro: 'Recenzie Studio Webcam',
  uk: 'Огляд Вебкам-Студії', ru: 'Обзор Вебкам-Студии', fr: 'Avis Studio Webcam', pt: 'Avaliação de Estúdio Webcam',
};

export const fullReviewLabel: Record<string, string> = {
  en: 'Full review →', de: 'Vollständige Bewertung →', es: 'Reseña completa →', ro: 'Recenzie completă →',
  uk: 'Повний огляд →', ru: 'Полный обзор →', fr: 'Avis complet →', pt: 'Avaliação completa →',
};

export const homeLabel: Record<string, string> = {
  en: 'Home', de: 'Startseite', es: 'Inicio', ro: 'Acasă', uk: 'Головна', ru: 'Главная', fr: 'Accueil', pt: 'Início',
};

export const catalogLabel: Record<string, string> = {
  en: 'Studios Catalog', de: 'Studio-Katalog', es: 'Catálogo de Estudios', ro: 'Catalog de Studiouri',
  uk: 'Каталог Студій', ru: 'Каталог Студий', fr: 'Catalogue des Studios', pt: 'Catálogo de Estúdios',
};

export const faqHeading: Record<string, string> = {
  en: 'Frequently Asked Questions', de: 'Häufig gestellte Fragen', es: 'Preguntas Frecuentes', ro: 'Întrebări Frecvente',
  uk: 'Часті Запитання', ru: 'Часто Задаваемые Вопросы', fr: 'Questions Fréquentes', pt: 'Perguntas Frequentes',
};

// {n} = studio name, {v} = the fact value being asked about. Values (earnings,
// locations, platforms, payout label) are inserted as-is — see StudioFacts notes.
export const faqTemplates: Record<'payQ' | 'payA' | 'locationQ' | 'locationA' | 'platformsQ' | 'platformsA' | 'payoutQ' | 'payoutA', Record<string, string>> = {
  payQ: {
    en: 'What does {n} pay?', de: 'Was zahlt {n}?', es: '¿Cuánto paga {n}?', ro: 'Cât plătește {n}?',
    uk: 'Скільки платить {n}?', ru: 'Сколько платит {n}?', fr: 'Combien paie {n} ?', pt: 'Quanto a {n} paga?',
  },
  payA: {
    en: '{n} advertises: {v}.', de: '{n} wirbt mit: {v}.', es: '{n} anuncia: {v}.', ro: '{n} promovează: {v}.',
    uk: '{n} рекламує: {v}.', ru: '{n} рекламирует: {v}.', fr: '{n} annonce : {v}.', pt: '{n} anuncia: {v}.',
  },
  locationQ: {
    en: 'Where is {n} located?', de: 'Wo befindet sich {n}?', es: '¿Dónde está ubicado {n}?', ro: 'Unde este situat {n}?',
    uk: 'Де розташована {n}?', ru: 'Где находится {n}?', fr: 'Où est situé {n} ?', pt: 'Onde fica a {n}?',
  },
  locationA: {
    en: '{n} is based in {v}.', de: '{n} hat seinen Sitz in {v}.', es: '{n} tiene su sede en {v}.', ro: '{n} are sediul în {v}.',
    uk: '{n} розташована в {v}.', ru: '{n} находится в {v}.', fr: '{n} est basé à {v}.', pt: '{n} está sediada em {v}.',
  },
  platformsQ: {
    en: 'Which platforms does {n} work with?', de: 'Mit welchen Plattformen arbeitet {n}?', es: '¿Con qué plataformas trabaja {n}?', ro: 'Cu ce platforme lucrează {n}?',
    uk: 'З якими платформами працює {n}?', ru: 'С какими платформами работает {n}?', fr: 'Avec quelles plateformes travaille {n} ?', pt: 'Com quais plataformas a {n} trabalha?',
  },
  platformsA: {
    en: '{n} streams on: {v}.', de: '{n} streamt auf: {v}.', es: '{n} transmite en: {v}.', ro: '{n} transmite pe: {v}.',
    uk: '{n} транслює на: {v}.', ru: '{n} транслирует на: {v}.', fr: '{n} diffuse sur : {v}.', pt: '{n} transmite em: {v}.',
  },
  payoutQ: {
    en: 'How often does {n} pay models?', de: 'Wie oft zahlt {n} die Models aus?', es: '¿Con qué frecuencia paga {n} a las modelos?', ro: 'Cât de des plătește {n} modelele?',
    uk: 'Як часто {n} виплачує моделям?', ru: 'Как часто {n} выплачивает моделям?', fr: 'À quelle fréquence {n} paie-t-il les modèles ?', pt: 'Com que frequência a {n} paga as modelos?',
  },
  payoutA: {
    en: 'Payout schedule: {v}.', de: 'Auszahlungsplan: {v}.', es: 'Calendario de pago: {v}.', ro: 'Program de plată: {v}.',
    uk: 'Графік виплат: {v}.', ru: 'График выплат: {v}.', fr: 'Calendrier de paiement : {v}.', pt: 'Cronograma de pagamento: {v}.',
  },
};
