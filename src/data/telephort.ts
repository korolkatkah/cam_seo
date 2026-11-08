// Texts for the Telephort review page (en / ru / ro). Rendered by src/components/TelephortPage.astro.
export type TpLang = 'en' | 'ru' | 'ro';

export interface TpText {
  title: string;
  description: string;
  tagA: string;
  tagB: string;
  h1Grad: string;
  h1Rest: string;
  lead: string;
  tocTitle: string;
  tocCta: string;
  toc: string[]; // 7 sections + FAQ
  intro: string;
  byline: string;
  callout: { strong: string; text: string; link: string };
  scene: { eyebrow: string; note: string; phones: { acct: string; geo: string }[]; geoLabel: string };
  s1: { h: string; p1: string; p2: string; stats: { v: string; k: string }[] };
  s2: {
    h: string;
    p1: string;
    p2: string;
    bad: { eyebrow: string; device: string; p: string };
    good: { eyebrow: string; p: string };
    cmp: { eyebrow: string; colA: string; colB: string; rows: { k: string; a: string; b: string }[] };
  };
  s3: { h: string; items: { tag: string; h: string; p: string }[] };
  s4: { h: string; cases: { tag: string; h: string; p: string }[]; warnStrong: string; warn: string };
  s5: { h: string; agentEyebrow: string; prompt: string; steps: string[]; p1: string; syncEyebrow: string; syncMain: string; syncCopy: string; p2: string };
  s6: { h: string; goodLabel: string; good: string; badLabel: string; bad: string; after: string };
  s7: { h: string; p1: string; link: string };
  faq: { h: string; items: { q: string; a: string }[] };
  cta: { badge: string; h: string; p: string; primary: string; ghost: string };
  related: { h: string; items: { href: string; icon: string; t: string }[] };
}

export const tpText: Record<TpLang, TpText> = {
  en: {
    title: 'Telephort Review: Cloud Android Phones for Accounts',
    description:
      'Telephort gives every account its own cloud Android phone with a separate IMEI, geo and network, opened in a browser tab. What it does, where it fits and its limits.',
    tagA: 'Tools',
    tagB: 'Cloud phones',
    h1Grad: 'Telephort',
    h1Rest: ': one cloud Android phone per account',
    lead: "Running many social or marketing accounts from one computer, or from a rack of phones in one room, makes them all look like one place. Telephort's answer is a separate cloud Android phone for every account, opened in a browser tab. Here is what it actually offers, where it fits for studios and models, and what it does not do.",
    tocTitle: 'Contents',
    tocCta: 'Get help →',
    toc: [
      'What Telephort is',
      'The problem with shared devices',
      'What each phone gets',
      'Where it fits for studios and models',
      'AI agent and sync sessions',
      'Limits to know first',
      'How to get access',
      'FAQ',
    ],
    intro:
      "Telephort is a cloud-phone service: instead of buying handsets, you get real-Android devices running remotely and drive them from a browser window. The pitch is one phone per account, so no two accounts ever share a device, an IP or a hardware fingerprint. Everything below is taken from Telephort's own product page and is the vendor's claim, not an EWO test.",
    byline: 'EWOhub Editorial Team · Source:',
    callout: {
      strong: 'Want to try it?',
      text: 'Accounts are issued in chat, not by self-serve signup.',
      link: 'Write to EWO on Telegram →',
    },
    scene: {
      eyebrow: 'One phone · one account',
      note: 'Illustration: three accounts, three separate devices. Values are examples, not real device IDs.',
      phones: [
        { acct: '@account_1', geo: 'DE · Berlin' },
        { acct: '@account_2', geo: 'US · Miami' },
        { acct: '@account_3', geo: 'UA · Odesa' },
      ],
      geoLabel: 'GEO',
    },
    s1: {
      h: 'What Telephort is',
      p1: 'Each account you create gets its own isolated Android phone hosted in the cloud. You open it in a Chrome tab, see the screen and drive it with mouse and keyboard. Copy-paste, files from your computer and ADB access work from the same window, so a team can automate when it needs to.',
      p2: 'New phones are provisioned in minutes. Heat, broken units, swapping SIMs, people on site and the weeks it takes to add more handsets are all things Telephort says you stop dealing with.',
      stats: [
        { v: '1 : 1', k: 'phone per account' },
        { v: 'Minutes', k: 'to provision a new phone' },
        { v: 'ADB · MCP', k: 'for automation and AI agents' },
      ],
    },
    s2: {
      h: 'The problem with shared devices',
      p1: "Telephort's argument is that a single computer logged into fifty accounts links them together, and that a physical rack of fifty phones in one room still looks like one place on one network. Apps see the device and the connection, not only the login, so accounts that pile onto the same place and network are easy to connect.",
      p2: 'Emulators and many cloud phones also fail Google Play Integrity or look like virtual machines, so the whole pool looks identical. Telephort says its phones can pass Play Integrity as real Android rather than as an emulator.',
      bad: { eyebrow: 'Shared device', device: '1 device · 1 network', p: 'Every login leaves from the same place, so the accounts are easy to link.' },
      good: { eyebrow: 'Telephort', p: 'Each account has its own phone, geo and network.' },
      cmp: {
        eyebrow: 'Physical farm vs cloud phones',
        colA: 'Physical farm',
        colB: 'Telephort',
        rows: [
          { k: 'Location', a: 'One room, one network', b: 'Each phone in its own geo' },
          { k: 'What apps see', a: 'One place, easy to link', b: 'Separate device IDs, geo and network' },
          { k: 'Day to day', a: 'Heat, broken units, SIM swaps, people on site', b: 'Open a browser tab; new phone in minutes' },
        ],
      },
    },
    s3: {
      h: 'What each phone gets',
      items: [
        { tag: 'Identity', h: 'Its own identity', p: 'A separate IMEI, Android ID and MAC address per account, rather than one hardware fingerprint shared across a team.' },
        { tag: 'Geo & network', h: 'Geo and network of the campaign', p: 'Each phone has its own geo and IP in the country the campaign targets, not the office Wi-Fi.' },
        { tag: 'Sensors', h: 'Real-phone sensors', p: 'GPS, motion, nearby Wi-Fi, Bluetooth and mobile cells are reported the way a phone on a street would report them, which is why Telephort says this is not "Chrome plus a proxy".' },
        { tag: 'Isolation', h: 'Strict isolation', p: 'One phone, one account. Phones do not share a device with each other.' },
      ],
    },
    s4: {
      h: 'Where it fits for studios and models',
      cases: [
        { tag: 'Traffic & social', h: 'Traffic and social', p: "Studios that run Instagram, TikTok or other social accounts to drive traffic to models' rooms can give each campaign, geo or traffic source its own phone. You post and add the link in bio inside the real app, with no rack of handsets to buy or keep." },
        { tag: 'Local apps', h: 'Apps that need a phone in a given country', p: 'Telephort lists region-restricted apps among its cases: a phone with local geo and a local proxy lets a team abroad use them without a handset in that country. For a studio recruiting or promoting in several markets, that is the practical use.' },
      ],
      warnStrong: 'Platform rules still apply.',
      warn: "A separate device does not make an account compliant. Follow each platform's terms and local law for what you post and how you operate accounts.",
    },
    s5: {
      h: 'AI agent and sync sessions',
      agentEyebrow: 'Agent · prompt to phone',
      prompt: 'Open the app, post the saved video and add the link in bio.',
      steps: ['tap  app icon', 'pick  video from Files', 'type  caption', 'done  posted on phone #07'],
      p1: 'You describe a job once in plain language and an agent taps, types and reads the screen on the phone. Telephort exposes this over MCP, the protocol tools such as Cursor and Claude use to talk to it, so the same instruction can drive many phones.',
      syncEyebrow: 'Sync session',
      syncMain: 'You tap here',
      syncCopy: 'Mirrored here',
      p2: 'In a sync session, the taps you make on one phone are mirrored onto the others, so warming accounts, posting or checking chats across a pool does not mean repeating the same path on every screen.',
    },
    s6: {
      h: 'Limits to know first',
      goodLabel: 'WHAT YOU GET',
      good: 'A separate device identity, geo and network per account, a browser-based screen with copy-paste, file transfer and ADB, and fast provisioning of new phones.',
      badLabel: 'WHAT YOU DO NOT GET',
      bad: 'No SIM voice calls, NFC, eSIM or Apple/Google Pay yet. And no promise an app will never ban you: if an app judges how you behave inside it, a cloud phone will not change that, and a physical phone would not either.',
      after: 'A new isolated phone gives a new identity, geo and network. It only means you are not signing in from the same device as before.',
    },
    s7: {
      h: 'How to get access',
      p1: 'There is no public self-serve signup. Accounts are issued in chat, and you can write with just a question or a description of your case. If the job needs custom development, that can be discussed too. For EWO clients, the contact is the EWO team on Telegram.',
      link: 'Write to EWO on Telegram →',
    },
    faq: {
      h: 'Frequently Asked Questions',
      items: [
        { q: 'Is Telephort an emulator?', a: "Telephort says its phones present as real Android devices with their own hardware IDs and sensors, and that they can pass Google Play Integrity, unlike emulators and many cloud phones. That is the vendor's claim." },
        { q: 'Does it stop an account from being banned?', a: 'No. Telephort states plainly that it does not promise an app will never ban you. It only means each account is not signed in from a shared device.' },
        { q: 'How do I open and control the phone?', a: 'In a browser tab. You see the phone screen and drive it directly, with copy-paste, files from your computer and ADB available from the same window.' },
        { q: 'How do I get an account?', a: 'Accounts are issued in chat rather than through self-serve signup. Write to the EWO team on Telegram at {tg} with your case or any question.' },
      ],
    },
    cta: {
      badge: 'Studios',
      h: 'Need separate devices for your accounts?',
      p: 'Tell the EWO team how many accounts, which geos and what they are for, and we will tell you if cloud phones are the right fit.',
      primary: 'Write to EWO on Telegram →',
      ghost: 'Back to Services Catalog',
    },
    related: {
      h: 'Related Articles',
      items: [
        { href: '/services-catalog', icon: '🧰', t: 'Webcam Industry Services Catalog' },
        { href: '/studio-directory', icon: '📇', t: 'Webcam Studios Catalog' },
        { href: '/studio-traffic', icon: '🖥️', t: 'Studio Traffic Analytics' },
        { href: '/for-models', icon: '🎯', t: 'Work as a Model with EWO' },
      ],
    },
  },

  ru: {
    title: 'Telephort: облачные Android-телефоны под аккаунты',
    description:
      'Telephort выдаёт каждому аккаунту свой облачный Android-телефон с отдельным IMEI, гео и сетью, который открывается во вкладке браузера. Что умеет, кому подходит и где предел.',
    tagA: 'Инструменты',
    tagB: 'Облачные телефоны',
    h1Grad: 'Telephort',
    h1Rest: ': один облачный Android-телефон на аккаунт',
    lead: 'Когда много соцсетей и рекламных аккаунтов ведут с одного компьютера или со стойки телефонов в одной комнате, все они выглядят как одно место. Telephort предлагает отдельный облачный Android-телефон под каждый аккаунт, который открывается во вкладке браузера. Разбираем, что сервис реально даёт, где он полезен студиям и моделям и чего не делает.',
    tocTitle: 'Содержание',
    tocCta: 'Получить помощь →',
    toc: [
      'Что такое Telephort',
      'Проблема общих устройств',
      'Что получает каждый телефон',
      'Где он нужен студиям и моделям',
      'ИИ-агент и синхронные сессии',
      'Ограничения, которые нужно знать',
      'Как получить доступ',
      'Частые вопросы',
    ],
    intro:
      'Telephort — сервис облачных телефонов: вместо покупки смартфонов вы получаете удалённые устройства с настоящим Android и управляете ими из окна браузера. Идея — один телефон на один аккаунт, чтобы два аккаунта никогда не делили устройство, IP и аппаратный отпечаток. Всё ниже взято со страницы самого Telephort и является заявлением вендора, а не тестом EWO.',
    byline: 'Редакция EWOhub · Источник:',
    callout: {
      strong: 'Хотите попробовать?',
      text: 'Аккаунты выдают в чате, а не через самостоятельную регистрацию.',
      link: 'Напишите EWO в Telegram →',
    },
    scene: {
      eyebrow: 'Один телефон · один аккаунт',
      note: 'Иллюстрация: три аккаунта, три отдельных устройства. Значения — примеры, а не настоящие ID устройств.',
      phones: [
        { acct: '@account_1', geo: 'DE · Берлин' },
        { acct: '@account_2', geo: 'US · Майами' },
        { acct: '@account_3', geo: 'UA · Одесса' },
      ],
      geoLabel: 'ГЕО',
    },
    s1: {
      h: 'Что такое Telephort',
      p1: 'Каждый ваш аккаунт получает свой изолированный Android-телефон в облаке. Вы открываете его во вкладке Chrome, видите экран и управляете мышью и клавиатурой. Копирование и вставка, файлы с вашего компьютера и ADB работают из того же окна, поэтому команда может автоматизировать работу, когда это нужно.',
      p2: 'Новые телефоны создаются за минуты. Перегрев, сломанные устройства, смена SIM, люди на месте и недели на расширение парка — всё это, по словам Telephort, вас больше не касается.',
      stats: [
        { v: '1 : 1', k: 'телефон на аккаунт' },
        { v: 'Минуты', k: 'на создание нового телефона' },
        { v: 'ADB · MCP', k: 'для автоматизации и ИИ-агентов' },
      ],
    },
    s2: {
      h: 'Проблема общих устройств',
      p1: 'Довод Telephort: один компьютер с пятьюдесятью логинами связывает аккаунты между собой, а физическая стойка из пятидесяти телефонов в одной комнате всё равно выглядит как одно место в одной сети. Приложения видят устройство и подключение, а не только логин, поэтому аккаунты в одном месте и одной сети легко связать.',
      p2: 'Эмуляторы и многие облачные телефоны к тому же не проходят Google Play Integrity или выглядят как виртуальные машины, и весь пул выглядит одинаково. Telephort заявляет, что его телефоны могут проходить Play Integrity как настоящий Android, а не как эмулятор.',
      bad: { eyebrow: 'Общее устройство', device: '1 устройство · 1 сеть', p: 'Все входы идут из одного места, поэтому аккаунты легко связать.' },
      good: { eyebrow: 'Telephort', p: 'У каждого аккаунта свой телефон, гео и сеть.' },
      cmp: {
        eyebrow: 'Физическая ферма и облачные телефоны',
        colA: 'Физическая ферма',
        colB: 'Telephort',
        rows: [
          { k: 'Место', a: 'Одна комната, одна сеть', b: 'Каждый телефон в своём гео' },
          { k: 'Что видят приложения', a: 'Одно место, легко связать', b: 'Отдельные ID устройства, гео и сеть' },
          { k: 'Повседневная работа', a: 'Перегрев, поломки, смена SIM, люди на месте', b: 'Открыть вкладку браузера; новый телефон за минуты' },
        ],
      },
    },
    s3: {
      h: 'Что получает каждый телефон',
      items: [
        { tag: 'Идентичность', h: 'Собственная идентичность', p: 'Отдельные IMEI, Android ID и MAC-адрес на каждый аккаунт, а не один аппаратный отпечаток на всю команду.' },
        { tag: 'Гео и сеть', h: 'Гео и сеть кампании', p: 'У каждого телефона свои гео и IP в стране, на которую нацелена кампания, а не Wi-Fi офиса.' },
        { tag: 'Сенсоры', h: 'Сенсоры настоящего телефона', p: 'GPS, движение, ближайшие сети Wi-Fi, Bluetooth и сотовые вышки передаются так, как их передавал бы телефон на улице. Поэтому, по словам Telephort, это не «Chrome плюс прокси».' },
        { tag: 'Изоляция', h: 'Жёсткая изоляция', p: 'Один телефон — один аккаунт. Телефоны не делят устройство друг с другом.' },
      ],
    },
    s4: {
      h: 'Где он нужен студиям и моделям',
      cases: [
        { tag: 'Трафик и соцсети', h: 'Трафик и соцсети', p: 'Студии, которые ведут Instagram, TikTok и другие аккаунты, чтобы привлекать трафик в комнаты моделей, могут выдать каждой кампании, гео или источнику трафика свой телефон. Вы публикуете и ставите ссылку в био прямо в настоящем приложении, не покупая и не храня стойку телефонов.' },
        { tag: 'Местные приложения', h: 'Приложения, которым нужен телефон в конкретной стране', p: 'Telephort называет среди своих кейсов приложения с региональными ограничениями: телефон с локальным гео и локальным прокси позволяет команде за границей работать с ними без устройства в этой стране. Для студии, которая рекрутирует или продвигается сразу на нескольких рынках, это и есть практическое применение.' },
      ],
      warnStrong: 'Правила платформ никуда не деваются.',
      warn: 'Отдельное устройство не делает аккаунт соответствующим правилам. Соблюдайте условия каждой платформы и местное законодательство в том, что публикуете и как ведёте аккаунты.',
    },
    s5: {
      h: 'ИИ-агент и синхронные сессии',
      agentEyebrow: 'Агент · от запроса к телефону',
      prompt: 'Открой приложение, выложи сохранённое видео и добавь ссылку в био.',
      steps: ['tap  иконка приложения', 'pick  видео из «Файлов»', 'type  подпись', 'done  опубликовано на телефоне №07'],
      p1: 'Вы один раз описываете задачу простым языком, а агент нажимает, печатает и читает экран телефона. Telephort отдаёт это через MCP — протокол, на котором с ним общаются Cursor, Claude и другие инструменты, — так что одна инструкция может управлять многими телефонами.',
      syncEyebrow: 'Синхронная сессия',
      syncMain: 'Вы нажимаете здесь',
      syncCopy: 'Повторяется здесь',
      p2: 'В синхронной сессии нажатия на одном телефоне повторяются на остальных. Поэтому прогрев аккаунтов, публикации и проверка чатов по всему пулу не требуют проходить один и тот же путь на каждом экране.',
    },
    s6: {
      h: 'Ограничения, которые нужно знать',
      goodLabel: 'ЧТО ВЫ ПОЛУЧАЕТЕ',
      good: 'Отдельные идентичность устройства, гео и сеть на каждый аккаунт, экран в браузере с копированием и вставкой, передачей файлов и ADB, а также быстрое создание новых телефонов.',
      badLabel: 'ЧЕГО ВЫ НЕ ПОЛУЧАЕТЕ',
      bad: 'Пока нет голосовых звонков по SIM, NFC, eSIM и Apple/Google Pay. И нет обещания, что приложение никогда вас не забанит: если приложение оценивает, как вы ведёте себя внутри, облачный телефон этого не изменит, как не изменил бы и физический.',
      after: 'Новый изолированный телефон даёт новую идентичность, гео и сеть. Это лишь значит, что вы входите не с того же устройства, что раньше.',
    },
    s7: {
      h: 'Как получить доступ',
      p1: 'Публичной самостоятельной регистрации нет. Аккаунты выдают в чате, и можно написать с одним лишь вопросом или описанием своего кейса. Если для задачи нужна нестандартная разработка, это тоже можно обсудить. Клиентам EWO достаточно написать команде EWO в Telegram.',
      link: 'Написать EWO в Telegram →',
    },
    faq: {
      h: 'Часто Задаваемые Вопросы',
      items: [
        { q: 'Telephort — это эмулятор?', a: 'Telephort заявляет, что его телефоны выглядят как настоящие Android-устройства со своими аппаратными ID и сенсорами и могут проходить Google Play Integrity, в отличие от эмуляторов и многих облачных телефонов. Это заявление вендора.' },
        { q: 'Защищает ли он аккаунт от бана?', a: 'Нет. Telephort прямо пишет, что не обещает, что приложение никогда вас не забанит. Это лишь значит, что каждый аккаунт не входит с общего устройства.' },
        { q: 'Как открыть телефон и управлять им?', a: 'Во вкладке браузера. Вы видите экран телефона и управляете им напрямую, а копирование и вставка, файлы с компьютера и ADB доступны из того же окна.' },
        { q: 'Как получить аккаунт?', a: 'Аккаунты выдают в чате, а не через самостоятельную регистрацию. Напишите команде EWO в Telegram: {tg}, с вашим кейсом или любым вопросом.' },
      ],
    },
    cta: {
      badge: 'Студии',
      h: 'Нужны отдельные устройства под аккаунты?',
      p: 'Расскажите команде EWO, сколько аккаунтов, какие гео и для чего они нужны, и мы скажем, подходят ли вам облачные телефоны.',
      primary: 'Написать EWO в Telegram →',
      ghost: 'Назад в Каталог Сервисов',
    },
    related: {
      h: 'Похожие Статьи',
      items: [
        { href: '/ru/services-catalog', icon: '🧰', t: 'Каталог Сервисов для Вебкам-Индустрии' },
        { href: '/ru/studio-directory', icon: '📇', t: 'Каталог Вебкам-Студий' },
        { href: '/ru/studio-traffic', icon: '🖥️', t: 'Аналитика Трафика Студии' },
        { href: '/ru/for-models', icon: '🎯', t: 'Работа Моделью с EWO' },
      ],
    },
  },

  ro: {
    title: 'Telephort: telefoane Android în cloud pentru conturi',
    description:
      'Telephort dă fiecărui cont propriul telefon Android în cloud, cu IMEI, geo și rețea separate, deschis într-un tab de browser. Ce face, cui se potrivește și ce limite are.',
    tagA: 'Instrumente',
    tagB: 'Telefoane cloud',
    h1Grad: 'Telephort',
    h1Rest: ': un telefon Android în cloud pentru fiecare cont',
    lead: 'Când mai multe conturi de social media sau de promovare sunt conduse de pe un singur computer, sau de pe un rack de telefoane dintr-o singură cameră, toate arată ca un singur loc. Telephort propune un telefon Android separat în cloud pentru fiecare cont, deschis într-un tab de browser. Iată ce oferă de fapt, unde se potrivește studiourilor și modelelor și ce nu face.',
    tocTitle: 'Cuprins',
    tocCta: 'Obține ajutor →',
    toc: [
      'Ce este Telephort',
      'Problema dispozitivelor comune',
      'Ce primește fiecare telefon',
      'Unde se potrivește studiourilor și modelelor',
      'Agent AI și sesiuni sincronizate',
      'Limite de știut dinainte',
      'Cum obții acces',
      'Întrebări frecvente',
    ],
    intro:
      'Telephort este un serviciu de telefoane în cloud: în loc să cumperi telefoane, primești dispozitive cu Android real, rulate la distanță, pe care le controlezi dintr-o fereastră de browser. Ideea este un telefon pentru un cont, astfel încât două conturi să nu împartă niciodată dispozitivul, IP-ul sau amprenta hardware. Tot ce urmează provine de pe pagina Telephort și este afirmația furnizorului, nu un test EWO.',
    byline: 'Echipa Editorială EWOhub · Sursă:',
    callout: {
      strong: 'Vrei să încerci?',
      text: 'Conturile se oferă prin chat, nu prin înregistrare self-serve.',
      link: 'Scrie-i EWO pe Telegram →',
    },
    scene: {
      eyebrow: 'Un telefon · un cont',
      note: 'Ilustrație: trei conturi, trei dispozitive separate. Valorile sunt exemple, nu ID-uri reale de dispozitiv.',
      phones: [
        { acct: '@account_1', geo: 'DE · Berlin' },
        { acct: '@account_2', geo: 'US · Miami' },
        { acct: '@account_3', geo: 'UA · Odesa' },
      ],
      geoLabel: 'GEO',
    },
    s1: {
      h: 'Ce este Telephort',
      p1: 'Fiecare cont creat primește propriul telefon Android izolat, găzduit în cloud. Îl deschizi într-un tab Chrome, vezi ecranul și îl controlezi cu mouse-ul și tastatura. Copy-paste, fișierele de pe computer și ADB funcționează din aceeași fereastră, deci o echipă poate automatiza când are nevoie.',
      p2: 'Telefoanele noi se creează în câteva minute. Supraîncălzirea, unitățile defecte, schimbarea cartelelor SIM, oamenii la fața locului și săptămânile necesare pentru a adăuga mai multe telefoane sunt, spune Telephort, probleme de care scapi.',
      stats: [
        { v: '1 : 1', k: 'telefon pentru fiecare cont' },
        { v: 'Minute', k: 'pentru un telefon nou' },
        { v: 'ADB · MCP', k: 'pentru automatizare și agenți AI' },
      ],
    },
    s2: {
      h: 'Problema dispozitivelor comune',
      p1: 'Argumentul Telephort: un singur computer conectat la cincizeci de conturi le leagă între ele, iar un rack fizic cu cincizeci de telefoane într-o singură cameră tot arată ca un singur loc, pe o singură rețea. Aplicațiile văd dispozitivul și conexiunea, nu doar autentificarea, deci conturile aflate în același loc și pe aceeași rețea sunt ușor de legat.',
      p2: 'Emulatoarele și multe telefoane cloud pică și testul Google Play Integrity sau arată ca mașini virtuale, iar tot grupul arată identic. Telephort spune că telefoanele sale pot trece Play Integrity ca Android real, nu ca emulator.',
      bad: { eyebrow: 'Dispozitiv comun', device: '1 dispozitiv · 1 rețea', p: 'Toate autentificările pleacă din același loc, deci conturile sunt ușor de legat.' },
      good: { eyebrow: 'Telephort', p: 'Fiecare cont are propriul telefon, geo și rețea.' },
      cmp: {
        eyebrow: 'Fermă fizică vs telefoane cloud',
        colA: 'Fermă fizică',
        colB: 'Telephort',
        rows: [
          { k: 'Locație', a: 'O cameră, o rețea', b: 'Fiecare telefon în geo-ul său' },
          { k: 'Ce văd aplicațiile', a: 'Un singur loc, ușor de legat', b: 'ID-uri de dispozitiv, geo și rețea separate' },
          { k: 'Zi de zi', a: 'Supraîncălzire, defecte, schimbat SIM, oameni la fața locului', b: 'Deschizi un tab de browser; telefon nou în minute' },
        ],
      },
    },
    s3: {
      h: 'Ce primește fiecare telefon',
      items: [
        { tag: 'Identitate', h: 'Propria identitate', p: 'IMEI, Android ID și adresă MAC separate pentru fiecare cont, nu o singură amprentă hardware pentru toată echipa.' },
        { tag: 'Geo și rețea', h: 'Geo și rețeaua campaniei', p: 'Fiecare telefon are geo și IP proprii în țara vizată de campanie, nu Wi-Fi-ul biroului.' },
        { tag: 'Senzori', h: 'Senzori de telefon real', p: 'GPS, mișcare, rețele Wi-Fi din apropiere, Bluetooth și celule mobile sunt raportate așa cum le-ar raporta un telefon aflat pe stradă. De aceea, spune Telephort, nu e „Chrome plus un proxy”.' },
        { tag: 'Izolare', h: 'Izolare strictă', p: 'Un telefon, un cont. Telefoanele nu împart un dispozitiv între ele.' },
      ],
    },
    s4: {
      h: 'Unde se potrivește studiourilor și modelelor',
      cases: [
        { tag: 'Trafic și social', h: 'Trafic și social media', p: 'Studiourile care conduc conturi de Instagram, TikTok sau altele pentru a aduce trafic în camerele modelelor pot da fiecărei campanii, geo sau sursă de trafic propriul telefon. Postezi și pui linkul în bio direct în aplicația reală, fără să cumperi sau să ții un rack de telefoane.' },
        { tag: 'Aplicații locale', h: 'Aplicații care cer un telefon într-o anumită țară', p: 'Telephort include în cazurile sale aplicațiile cu restricții regionale: un telefon cu geo local și proxy local permite unei echipe din străinătate să le folosească fără un telefon în țara respectivă. Pentru un studio care recrutează sau se promovează pe mai multe piețe, aceasta este utilizarea practică.' },
      ],
      warnStrong: 'Regulile platformelor se aplică în continuare.',
      warn: 'Un dispozitiv separat nu face un cont conform. Respectă termenii fiecărei platforme și legislația locală pentru ce publici și cum conduci conturile.',
    },
    s5: {
      h: 'Agent AI și sesiuni sincronizate',
      agentEyebrow: 'Agent · de la cerere la telefon',
      prompt: 'Deschide aplicația, postează videoclipul salvat și adaugă linkul în bio.',
      steps: ['tap  iconița aplicației', 'pick  videoclip din Fișiere', 'type  descriere', 'done  postat pe telefonul #07'],
      p1: 'Descrii o dată sarcina în limbaj obișnuit, iar un agent apasă, tastează și citește ecranul telefonului. Telephort expune asta prin MCP, protocolul prin care Cursor, Claude și alte instrumente comunică cu el, deci aceeași instrucțiune poate conduce multe telefoane.',
      syncEyebrow: 'Sesiune sincronizată',
      syncMain: 'Apeși aici',
      syncCopy: 'Reprodus aici',
      p2: 'Într-o sesiune sincronizată, apăsările de pe un telefon sunt reproduse pe celelalte. Astfel, încălzirea conturilor, postările sau verificarea chat-urilor pe tot grupul nu cer același drum repetat pe fiecare ecran.',
    },
    s6: {
      h: 'Limite de știut dinainte',
      goodLabel: 'CE PRIMEȘTI',
      good: 'Identitate de dispozitiv, geo și rețea separate pentru fiecare cont, un ecran în browser cu copy-paste, transfer de fișiere și ADB, plus crearea rapidă de telefoane noi.',
      badLabel: 'CE NU PRIMEȘTI',
      bad: 'Încă nu există apeluri vocale prin SIM, NFC, eSIM sau Apple/Google Pay. Și nu există nicio promisiune că o aplicație nu te va bana niciodată: dacă aplicația judecă felul în care te comporți în ea, un telefon cloud nu schimbă asta, la fel cum nu ar schimba-o nici un telefon fizic.',
      after: 'Un telefon izolat nou oferă o identitate, un geo și o rețea noi. Înseamnă doar că nu te autentifici de pe același dispozitiv ca înainte.',
    },
    s7: {
      h: 'Cum obții acces',
      p1: 'Nu există înregistrare publică self-serve. Conturile se oferă prin chat, iar poți scrie doar cu o întrebare sau cu descrierea cazului tău. Dacă sarcina cere dezvoltare la comandă, se poate discuta și asta. Pentru clienții EWO, contactul este echipa EWO pe Telegram.',
      link: 'Scrie-i EWO pe Telegram →',
    },
    faq: {
      h: 'Întrebări Frecvente',
      items: [
        { q: 'Telephort este un emulator?', a: 'Telephort spune că telefoanele sale apar ca dispozitive Android reale, cu propriile ID-uri hardware și senzori, și că pot trece Google Play Integrity, spre deosebire de emulatoare și de multe telefoane cloud. Aceasta este afirmația furnizorului.' },
        { q: 'Împiedică banarea unui cont?', a: 'Nu. Telephort spune clar că nu promite că o aplicație nu te va bana niciodată. Înseamnă doar că fiecare cont nu se autentifică de pe un dispozitiv comun.' },
        { q: 'Cum deschid și controlez telefonul?', a: 'Într-un tab de browser. Vezi ecranul telefonului și îl controlezi direct, iar copy-paste, fișierele de pe computer și ADB sunt disponibile din aceeași fereastră.' },
        { q: 'Cum obțin un cont?', a: 'Conturile se oferă prin chat, nu prin înregistrare self-serve. Scrie echipei EWO pe Telegram la {tg}, cu cazul tău sau cu orice întrebare.' },
      ],
    },
    cta: {
      badge: 'Studiouri',
      h: 'Ai nevoie de dispozitive separate pentru conturi?',
      p: 'Spune echipei EWO câte conturi ai, ce geo-uri și pentru ce sunt, iar noi îți spunem dacă telefoanele cloud sunt potrivite.',
      primary: 'Scrie-i EWO pe Telegram →',
      ghost: 'Înapoi la Catalogul de Servicii',
    },
    related: {
      h: 'Articole Similare',
      items: [
        { href: '/ro/services-catalog', icon: '🧰', t: 'Catalog de Servicii pentru Industria Webcam' },
        { href: '/ro/studio-directory', icon: '📇', t: 'Catalog de Studiouri Webcam' },
        { href: '/ro/studio-traffic', icon: '🖥️', t: 'Analiză Trafic pentru Studiouri' },
        { href: '/ro/for-models', icon: '🎯', t: 'Lucrează ca Model cu EWO' },
      ],
    },
  },
};
