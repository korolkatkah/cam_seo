// Locales, in the order used across the site: en, de, es, ro, uk, ru, fr, pt.
export type Locale = 'en' | 'de' | 'es' | 'ro' | 'uk' | 'ru' | 'fr' | 'pt';

export interface CatalogService {
  name: string;
  url: string; // display domain, not a live outbound link — verify before linking
  desc: string; // factual, not translated — same convention as untranslated "facts" in studios.ts
  flag?: 'warn' | 'thin';
}

export type Badge = 'ok' | 'thin' | 'warn' | 'none';

export interface CatalogTopic {
  slug: string;
  label: Record<Locale, string>;
  badge: Badge;
  note?: Record<Locale, string>;
  services: CatalogService[];
}

export interface CatalogCategory {
  id: string;
  name: Record<Locale, string>;
  desc: Record<Locale, string>;
  topics: CatalogTopic[];
}

export const skippedPages = [
  '/', '/webcamblog', '/en', '/privacy', '/registration', '/thank-you', '/ewo_cam_service',
];

export const uiLabels: Record<Locale, {
  categories: string;
  skipTitle: string;
  skipDesc: string;
  legendOk: string;
  legendThin: string;
  legendWarn: string;
  legendNone: string;
  visitLabel: string;
  flagWarn: string;
  flagThin: string;
}> = {
  en: { categories: 'Categories', skipTitle: 'Utility pages with no matching service', skipDesc: 'Technical/navigation pages on the source site — not topical, so no service category applies.', legendOk: 'well covered', legendThin: 'thin coverage', legendWarn: 'contains grey-market entries', legendNone: 'no service applies', visitLabel: 'Visit', flagWarn: 'caution', flagThin: 'unverified' },
  de: { categories: 'Kategorien', skipTitle: 'Funktionsseiten ohne passenden Dienst', skipDesc: 'Technische/navigatorische Seiten der Quellwebsite — nicht thematisch, daher keine Dienstkategorie zutreffend.', legendOk: 'gut abgedeckt', legendThin: 'wenig Abdeckung', legendWarn: 'enthält Graumarkt-Einträge', legendNone: 'kein Dienst zutreffend', visitLabel: 'Besuchen', flagWarn: 'Vorsicht', flagThin: 'unbestätigt' },
  es: { categories: 'Categorías', skipTitle: 'Páginas utilitarias sin servicio aplicable', skipDesc: 'Páginas técnicas/de navegación del sitio de origen — no temáticas, así que no aplica ninguna categoría de servicio.', legendOk: 'buena cobertura', legendThin: 'cobertura limitada', legendWarn: 'incluye entradas de mercado gris', legendNone: 'no aplica servicio', visitLabel: 'Visitar', flagWarn: 'precaución', flagThin: 'sin verificar' },
  ro: { categories: 'Categorii', skipTitle: 'Pagini utilitare fără serviciu corespunzător', skipDesc: 'Pagini tehnice/de navigare de pe site-ul sursă — netematice, deci nu se aplică nicio categorie de servicii.', legendOk: 'acoperire bună', legendThin: 'acoperire redusă', legendWarn: 'conține intrări de piață gri', legendNone: 'niciun serviciu aplicabil', visitLabel: 'Vizitează', flagWarn: 'atenție', flagThin: 'neverificat' },
  uk: { categories: 'Категорії', skipTitle: 'Службові сторінки без відповідного сервісу', skipDesc: 'Технічні/навігаційні сторінки вихідного сайту — не тематичні, тому категорія сервісу не застосовується.', legendOk: 'добре покрито', legendThin: 'слабке покриття', legendWarn: 'є сірі сервіси', legendNone: 'сервіс не застосовується', visitLabel: 'Перейти', flagWarn: 'обережно', flagThin: 'не підтверджено' },
  ru: { categories: 'Категории', skipTitle: 'Служебные страницы без подходящего сервиса', skipDesc: 'Технические/навигационные страницы исходного сайта — не тематические, поэтому категория сервиса не применяется.', legendOk: 'хорошо покрыто', legendThin: 'слабое покрытие', legendWarn: 'есть серые сервисы', legendNone: 'сервис не применим', visitLabel: 'Перейти', flagWarn: 'осторожно', flagThin: 'не подтверждено' },
  fr: { categories: 'Catégories', skipTitle: 'Pages utilitaires sans service correspondant', skipDesc: 'Pages techniques/de navigation du site source — non thématiques, aucune catégorie de service ne s’applique.', legendOk: 'bien couvert', legendThin: 'couverture faible', legendWarn: 'contient des entrées de marché gris', legendNone: 'aucun service applicable', visitLabel: 'Visiter', flagWarn: 'prudence', flagThin: 'non vérifié' },
  pt: { categories: 'Categorias', skipTitle: 'Páginas utilitárias sem serviço correspondente', skipDesc: 'Páginas técnicas/de navegação do site de origem — não temáticas, portanto nenhuma categoria de serviço se aplica.', legendOk: 'boa cobertura', legendThin: 'cobertura fraca', legendWarn: 'inclui entradas de mercado cinza', legendNone: 'nenhum serviço aplicável', visitLabel: 'Visitar', flagWarn: 'cuidado', flagThin: 'não verificado' },
};

export const servicesCatalog: CatalogCategory[] = [
  {
    id: 'software',
    name: { en: 'Software & Hardware', de: 'Software & Hardware', es: 'Software y Hardware', ro: 'Software și Hardware', uk: 'Софт та обладнання', ru: 'Софт и оборудование', fr: 'Logiciels et Matériel', pt: 'Software e Hardware' },
    desc: {
      en: 'Broadcasting software, stream monitoring, OBS plugins, cameras and lighting — the actual tools used during a shift.',
      de: 'Streaming-Software, Stream-Monitoring, OBS-Plugins, Kameras und Licht — die Tools, die während einer Schicht wirklich genutzt werden.',
      es: 'Software de transmisión, monitoreo de emisiones, plugins de OBS, cámaras e iluminación — las herramientas reales usadas durante un turno.',
      ro: 'Software de streaming, monitorizare a emisiei, plugin-uri OBS, camere și iluminat — uneltele folosite efectiv în timpul unui tur.',
      uk: 'Софт для трансляцій, моніторинг ефіру, плагіни OBS, камери та світло — інструменти, якими реально користуються під час зміни.',
      ru: 'Софт для трансляций, мониторинг эфира, плагины OBS, камеры и свет — инструменты, которыми реально пользуются во время смены.',
      fr: 'Logiciels de diffusion, surveillance des flux, extensions OBS, caméras et éclairage — les outils réellement utilisés pendant un shift.',
      pt: 'Software de transmissão, monitoramento de stream, plugins de OBS, câmeras e iluminação — as ferramentas realmente usadas durante um turno.',
    },
    topics: [
      {
        slug: 'chaturbate-software',
        badge: 'ok',
        label: { en: 'Chaturbate Software', de: 'Chaturbate-Software', es: 'Software para Chaturbate', ro: 'Software Chaturbate', uk: 'Софт для Chaturbate', ru: 'Софт для Chaturbate', fr: 'Logiciels Chaturbate', pt: 'Software para Chaturbate' },
        services: [
          { name: 'MFC Share', url: 'mfcshare.com', desc: 'Free photo/video hosting and tip-menu/wishlist tool used by broadcasters.' },
          { name: 'Moniturbate', url: 'moniturbate.com', desc: 'Desktop app that monitors and auto-records live streams across 7 cam sites.' },
          { name: 'Streamster', url: 'streamster.io', desc: 'Cloud-assisted broadcast app (desktop/mobile/web) built for adult camming.' },
          { name: 'Lovense', url: 'lovense.com', desc: 'Bluetooth interactive toys wired to Chaturbate’s tip-triggered features.' },
          { name: 'SIREN', url: 'siren.chat', desc: 'Telegram bot that alerts followers when a tracked streamer goes live.' },
          { name: 'Chaturbate Downloader', url: 'github.com/serpapps/chaturbate-downloader', desc: 'Open-source tool for downloading live or saved Chaturbate streams.' },
        ],
      },
      {
        slug: 'software',
        badge: 'ok',
        label: { en: 'Broadcasting Software', de: 'Streaming-Software', es: 'Software de Streaming', ro: 'Software de Streaming', uk: 'Софт для стрімів', ru: 'Софт для трансляций', fr: 'Logiciel de Streaming', pt: 'Software de Streaming' },
        services: [
          { name: 'OBS Studio', url: 'obsproject.com', desc: 'Free open-source broadcasting software — the base most camming tools build on.' },
          { name: 'Streamlabs Desktop', url: 'streamlabs.com', desc: 'OBS-based app with built-in themes, alerts and monetization widgets.' },
          { name: 'XSplit Broadcaster', url: 'xsplit.com', desc: 'Commercial streaming software with chroma key and multi-destination output.' },
          { name: 'ManyCam', url: 'manycam.com', desc: 'Virtual webcam app for combining multiple video sources and effects.' },
          { name: 'Streamster', url: 'streamster.io', desc: 'Low-CPU cloud encoding option built specifically for adult camming.' },
        ],
      },
      {
        slug: 'pornhub-software',
        badge: 'thin',
        note: {
          en: 'No dedicated third-party software is branded for "Pornhub Livecam" — broadcasting runs through the same MFC-affiliated infrastructure via general encoders.',
          de: 'Es gibt keine dedizierte Drittanbieter-Software für „Pornhub Livecam" — die Übertragung läuft über dieselbe MFC-Infrastruktur mit allgemeinen Encodern.',
          es: 'No existe software de terceros dedicado a "Pornhub Livecam" — la transmisión usa la misma infraestructura afiliada a MFC con codificadores generales.',
          ro: 'Nu există software terț dedicat pentru „Pornhub Livecam" — transmisia rulează prin aceeași infrastructură afiliată MFC, cu encodere generale.',
          uk: 'Окремого софту під брендом "Pornhub Livecam" немає — трансляція йде через ту саму інфраструктуру MFC загальними енкодерами.',
          ru: 'Отдельного софта под брендом "Pornhub Livecam" нет — трансляция идёт через ту же инфраструктуру MFC общими энкодерами.',
          fr: 'Aucun logiciel tiers dédié à « Pornhub Livecam » — la diffusion passe par la même infrastructure affiliée à MFC via des encodeurs génériques.',
          pt: 'Não há software de terceiros dedicado ao "Pornhub Livecam" — a transmissão usa a mesma infraestrutura afiliada à MFC com codificadores gerais.',
        },
        label: { en: 'Pornhub Livecam Software', de: 'Pornhub-Livecam-Software', es: 'Software para Pornhub Livecam', ro: 'Software Pornhub Livecam', uk: 'Софт для Pornhub Livecam', ru: 'Софт для Pornhub Livecam', fr: 'Logiciel Pornhub Livecam', pt: 'Software Pornhub Livecam' },
        services: [
          { name: 'OBS Studio', url: 'obsproject.com', desc: 'RTMP streaming into MFC/Pornhub-affiliated ingest points.' },
          { name: 'Streamster', url: 'streamster.io', desc: 'Documented setup guide for streaming to MyFreeCams, Pornhub Livecam’s base.' },
          { name: 'MFC Share', url: 'mfcshare.com', desc: 'Tip-menu and content hosting for the MFC ecosystem.' },
        ],
      },
      {
        slug: 'chatubate-liveshow-checker',
        badge: 'ok',
        label: { en: 'Live Show Checkers', de: 'Live-Show-Checker', es: 'Verificadores de Transmisión', ro: 'Verificatoare de Emisie Live', uk: 'Перевірка ефіру', ru: 'Проверка эфира', fr: 'Vérificateurs de Live', pt: 'Verificadores de Transmissão' },
        services: [
          { name: 'Chaturbate DVR', url: 'github.com/teacat/chaturbate-dvr', desc: 'Cross-platform tool that auto-records a stream the moment a model goes live.' },
          { name: 'Moniturbate', url: 'moniturbate.com', desc: 'Watchlist of models across sites with auto-record and alerts.' },
          { name: 'capturebate-node', url: 'github.com/horacio9a/capturebate-node', desc: 'Node.js tool that follows and archives favorite models’ shows.' },
          { name: 'SIREN', url: 'siren.chat', desc: 'Telegram go-live alerts for tracked streamers.' },
          { name: 'Chaturbate Downloader', url: 'github.com/serpapps/chaturbate-downloader', desc: 'Live-status detection built into its capture flow.' },
        ],
      },
      {
        slug: 'camstudio',
        badge: 'ok',
        label: { en: 'Studio Management Software', de: 'Studio-Management-Software', es: 'Software de Gestión de Estudios', ro: 'Software de Management pentru Studiouri', uk: 'Софт для управління студією', ru: 'ПО для управления студией', fr: 'Logiciel de Gestion de Studio', pt: 'Software de Gestão de Estúdio' },
        services: [
          { name: 'WorkControl (Promostudio)', url: 'promostudio.biz', desc: 'Client-server studio management with a moderator panel calculating earnings/commissions.' },
          { name: 'Modelnet', url: 'modelnet.club', desc: 'Turnkey WebRTC platform for launching a branded studio cam site.' },
          { name: 'Paxum', url: 'paxum.com', desc: 'B2B payout rail studios use to receive bulk funds and pay models.' },
          { name: 'Scrile Stream', url: 'scrile.com', desc: 'White-label cam platform builder with scheduling on the platform side.' },
        ],
      },
      {
        slug: 'top-webcams-for-cam-models-2026',
        badge: 'ok',
        label: { en: 'Top Webcams 2026', de: 'Top-Webcams 2026', es: 'Mejores Webcams 2026', ro: 'Cele Mai Bune Camere Web 2026', uk: 'Топ вебкамер 2026', ru: 'Топ веб-камер 2026', fr: 'Meilleures Webcams 2026', pt: 'Melhores Webcams 2026' },
        services: [
          { name: 'Logitech MX Brio 705', url: 'logitech.com', desc: '4K camera, $199, AI face-based tuning, dual mics, privacy shutter.' },
          { name: 'Logitech Brio 4K', url: 'logitech.com', desc: 'All-round 4K camera noted for reliable low-light performance.' },
          { name: 'Razer Kiyo Pro Ultra 4K', url: 'razer.com', desc: 'Large Sony STARVIS 2 sensor, f/1.7 lens for cinematic low-light footage.' },
          { name: 'Anker PowerConf C200', url: 'anker.com', desc: 'Budget 2K camera (~$60–70) with AI noise-cancelling mics.' },
        ],
      },
      {
        slug: 'obs-plugins-for-webcam-models-2026',
        badge: 'ok',
        label: { en: 'OBS Plugins 2026', de: 'OBS-Plugins 2026', es: 'Plugins de OBS 2026', ro: 'Plugin-uri OBS 2026', uk: 'Плагіни OBS 2026', ru: 'Плагины OBS 2026', fr: 'Extensions OBS 2026', pt: 'Plugins OBS 2026' },
        services: [
          { name: 'StreamFX', url: 'github.com (Xaymar/obs-StreamFX)', desc: 'Glow, blur, shadow and stroke effects for camera borders and overlays.' },
          { name: 'Streamlabs OBS Plugin', url: 'streamlabs.com/obs-plugin', desc: 'Alerts and widgets directly inside OBS.' },
          { name: 'SE.Live (StreamElements)', url: 'streamelements.com', desc: 'Chat, custom alerts, media requests and chatbot tied into OBS.' },
          { name: 'OBS VirtualCam', url: 'obsproject.com', desc: 'Built-in (since v26) virtual camera from a composited OBS scene.' },
          { name: 'NVIDIA Broadcast', url: 'nvidia.com', desc: 'AI background removal and noise suppression as a virtual cam/mic.' },
          { name: 'Move Transition', url: 'github.com (exeldro/obs-move-transition)', desc: 'Smooth animated transitions between scenes and sources.' },
        ],
      },
      {
        slug: 'webcam-lightening',
        badge: 'ok',
        label: { en: 'Lighting Gear', de: 'Beleuchtung', es: 'Equipos de Iluminación', ro: 'Echipamente de Iluminat', uk: 'Освітлення', ru: 'Освещение', fr: 'Éclairage', pt: 'Equipamento de Iluminação' },
        services: [
          { name: 'Razer Kiyo', url: 'razer.com', desc: 'Camera with a built-in ring light, 12-step brightness.' },
          { name: 'Angetube 967Ultra', url: 'angetube.com', desc: '4K camera with ring light and autofocus, adjustable brightness.' },
          { name: 'Lume Cube Video Conferencing Kit', url: 'lumecube.com', desc: 'Standalone LED kit for consistent on-camera lighting.' },
          { name: 'Logitech StreamCam', url: 'logitech.com', desc: 'USB-C camera with auto-exposure, pairs well with ring lights.' },
        ],
      },
      {
        slug: 'webcam-sites',
        badge: 'ok',
        label: { en: 'Cam Platforms', de: 'Cam-Plattformen', es: 'Plataformas de Cam', ro: 'Platforme de Camming', uk: 'Кам-платформи', ru: 'Камплатформы', fr: 'Plateformes de Cam', pt: 'Plataformas de Cam' },
        services: [
          { name: 'Chaturbate', url: 'chaturbate.com', desc: 'The largest tip-based, free-to-view live cam platform.' },
          { name: 'Stripchat', url: 'stripchat.com', desc: 'Balances free/paid features, notable VR cam section.' },
          { name: 'BongaCams', url: 'bongacams.com', desc: 'High-volume platform with large concurrent-broadcaster counts.' },
          { name: 'LiveJasmin', url: 'livejasmin.com', desc: 'Premium positioning, higher production quality.' },
          { name: 'CamSoda', url: 'camsoda.com', desc: 'Distinct viewing formats ("Peek", "Voyeur").' },
          { name: 'MyFreeCams', url: 'myfreecams.com', desc: 'Long-running pay-per-minute platform with its own software ecosystem.' },
        ],
      },
      {
        slug: 'webcam-fetishes',
        badge: 'thin',
        note: {
          en: 'Generic "BDSM cams" aggregators surfaced without a verifiable company behind them — left out.',
          de: 'Allgemeine „BDSM-Cams"-Aggregatoren tauchten ohne verifizierbares Unternehmen dahinter auf — nicht aufgenommen.',
          es: 'Aparecieron agregadores genéricos de "BDSM cams" sin una empresa verificable detrás — no se incluyeron.',
          ro: 'Au apărut agregatoare generice „BDSM cams" fără o companie verificabilă în spate — nu au fost incluse.',
          uk: 'Загальні агрегатори "BDSM cams" траплялися без перевіреної компанії за ними — не включено.',
          ru: 'Общие агрегаторы "BDSM cams" встречались без проверяемой компании за ними — не включены.',
          fr: 'Des agrégateurs génériques « BDSM cams » sont apparus sans société vérifiable derrière — non inclus.',
          pt: 'Agregadores genéricos de "BDSM cams" apareceram sem uma empresa verificável por trás — não incluídos.',
        },
        label: { en: 'Fetish Cam Platforms', de: 'Fetisch-Cam-Plattformen', es: 'Plataformas de Cam Fetichista', ro: 'Platforme de Camming Fetish', uk: 'Фетиш кам-платформи', ru: 'Фетиш-камплатформы', fr: 'Plateformes de Cam Fétichiste', pt: 'Plataformas de Cam Fetichista' },
        services: [
          { name: 'FetishGalaxy', url: 'fetishgalaxy.com', desc: 'Cam site with search filters by fetish type.' },
          { name: 'Jerkmate', url: 'jerkmate.com', desc: 'Interactive cam platform with a dedicated fetish/kink category.' },
        ],
      },
    ],
  },
  {
    id: 'traffic',
    name: { en: 'Traffic & Promotion', de: 'Traffic & Promotion', es: 'Tráfico y Promoción', ro: 'Trafic și Promovare', uk: 'Трафік та просування', ru: 'Трафик и продвижение', fr: 'Trafic et Promotion', pt: 'Tráfego e Promoção' },
    desc: {
      en: 'Ad networks, promotion agencies, and multi-platform content distribution. Some entries sell grey-market bot traffic — flagged separately.',
      de: 'Werbenetzwerke, Promotion-Agenturen und plattformübergreifende Content-Distribution. Einige Einträge verkaufen Graumarkt-Bot-Traffic — separat gekennzeichnet.',
      es: 'Redes publicitarias, agencias de promoción y distribución de contenido multiplataforma. Algunas entradas venden tráfico de bots de mercado gris — marcadas por separado.',
      ro: 'Rețele publicitare, agenții de promovare și distribuție de conținut multi-platformă. Unele intrări vând trafic bot de piață gri — marcate separat.',
      uk: 'Рекламні мережі, агентства просування та мультиплатформна дистрибуція контенту. Частина сервісів продає сірий бот-трафік — позначено окремо.',
      ru: 'Рекламные сети, агентства продвижения и мультиплатформенная дистрибуция контента. Часть сервисов продаёт серый бот-трафик — помечено отдельно.',
      fr: 'Réseaux publicitaires, agences de promotion et distribution de contenu multi-plateforme. Certaines entrées vendent du trafic de bots au marché gris — signalées séparément.',
      pt: 'Redes de anúncios, agências de promoção e distribuição de conteúdo multiplataforma. Algumas entradas vendem tráfego de bots de mercado cinza — sinalizadas separadamente.',
    },
    topics: [
      {
        slug: 'webcamtraffic',
        badge: 'ok',
        label: { en: 'Webcam Traffic Networks', de: 'Traffic-Netzwerke für Webcams', es: 'Redes de Tráfico para Webcam', ro: 'Rețele de Trafic pentru Webcam', uk: 'Мережі трафіку для вебкаму', ru: 'Сети трафика для вебкама', fr: 'Réseaux de Trafic Webcam', pt: 'Redes de Tráfego para Webcam' },
        services: [
          { name: 'TrafficJunky', url: 'trafficjunky.com', desc: 'Exclusive ad network for MindGeek properties, ~150M daily uniques.' },
          { name: 'ExoClick', url: 'exoclick.com', desc: 'Full-stack adult ad network/DSP, 12B+ daily impressions, RTB.' },
          { name: 'JuicyAds', url: 'juicyads.com', desc: '10,000+ publishers, $100 minimum deposit — accessible entry point.' },
          { name: 'TrafficStars', url: 'trafficstars.com', desc: 'Adult DSP with ML-based optimization, 7B+ daily impressions.' },
          { name: 'EroAdvertising', url: 'eroadvertising.com', desc: 'Portugal-based network specializing in European traffic.' },
          { name: 'ClickAdu', url: 'clickadu.com', desc: 'Popunder-focused network, 6B+ daily impressions, 200+ countries.' },
          { name: 'HilltopAds', url: 'hilltopads.com', desc: 'Popunder/push/native/video across mainstream and adult traffic.' },
        ],
      },
      {
        slug: 'chaturbate-promotion',
        badge: 'warn',
        label: { en: 'Chaturbate Promotion', de: 'Chaturbate-Promotion', es: 'Promoción de Chaturbate', ro: 'Promovare Chaturbate', uk: 'Просування на Chaturbate', ru: 'Продвижение на Chaturbate', fr: 'Promotion Chaturbate', pt: 'Promoção do Chaturbate' },
        services: [
          { name: 'WebModelsTraffic', url: 'webmodelstraffic.com', desc: 'Chaturbate-focused traffic and promotion/boost tooling.' },
          { name: 'ViewerBot', url: 'viewerbot.webcam', desc: 'Viewer bots across Chaturbate, BongaCams, CamSoda, Stripchat, Cam4.', flag: 'warn' },
          { name: 'Aruna Talent', url: 'arunatalent.com', desc: 'Legitimate agency: broadcast-schedule optimization and management.' },
        ],
      },
      {
        slug: 'traffic-for-onlyfans-webcam',
        badge: 'ok',
        label: { en: 'Webcam-to-OnlyFans Traffic', de: 'Traffic von Webcam zu OnlyFans', es: 'Tráfico de Webcam a OnlyFans', ro: 'Trafic de la Webcam la OnlyFans', uk: 'Трафік з вебкаму на OnlyFans', ru: 'Трафик из вебкама на OnlyFans', fr: 'Trafic Webcam vers OnlyFans', pt: 'Tráfego de Webcam para OnlyFans' },
        services: [
          { name: 'OnlyTraffic', url: 'onlytraffic.com', desc: 'Coordinates 50+ traffic sources for OnlyFans (Google, Reddit, IG, TikTok, X, YouTube, Telegram).' },
          { name: 'Sakura Management', url: 'sakura.agency', desc: 'Formerly a webcam-studio traffic firm, now runs OnlyFans creator social strategy.' },
          { name: 'Aruna Talent', url: 'arunatalent.com', desc: 'Published playbooks converting cam audiences into OnlyFans subscribers.' },
          { name: 'SirenCY', url: 'sirency.com', desc: 'Runs the "operational layer" for OnlyFans creators across channels.' },
          { name: 'XCreatorMgmt', url: 'xcreatormgmt.com', desc: 'Organic marketing on Twitter/Reddit/TikTok/YouTube.' },
        ],
      },
      {
        slug: 'traffic-for-cam-models',
        badge: 'ok',
        label: { en: 'Traffic for Cam Models', de: 'Traffic für Cam-Models', es: 'Tráfico para Modelos Cam', ro: 'Trafic pentru Modele Cam', uk: 'Трафік для кам-моделей', ru: 'Трафик для кам-моделей', fr: 'Trafic pour Modèles Cam', pt: 'Tráfego para Modelos Cam' },
        services: [
          { name: 'Babylon Traffic', url: 'babylontraffic.com', desc: '"Buy webcam traffic" packages promising guaranteed visitors within days.' },
          { name: 'CrakRevenue', url: 'crakrevenue.com', desc: 'Adult affiliate network with cam-site offers and geo/device smartlinks.' },
          { name: 'JuicyAds', url: 'juicyads.com', desc: 'Low minimum spend, accessible to solo models.' },
          { name: 'ExoClick', url: 'exoclick.com', desc: 'Self-serve platform usable without an agency.' },
          { name: 'TrafficStars', url: 'trafficstars.com', desc: 'Self-serve adult DSP.' },
        ],
      },
      {
        slug: 'cam-traffic-guide',
        badge: 'ok',
        label: { en: 'Cam Traffic Guide Networks', de: 'Netzwerke aus dem Cam-Traffic-Guide', es: 'Redes de la Guía de Tráfico Cam', ro: 'Rețele din Ghidul de Trafic Cam', uk: 'Мережі з гайду по кам-трафіку', ru: 'Сети из гайда по кам-трафику', fr: 'Réseaux du Guide de Trafic Cam', pt: 'Redes do Guia de Tráfego Cam' },
        services: [
          { name: 'ExoClick', url: 'exoclick.com', desc: 'Standard reference for banner/popunder inventory in traffic-buying guides.' },
          { name: 'TrafficJunky', url: 'trafficjunky.com', desc: 'Referenced as the premium tube-traffic source in most guides.' },
          { name: 'JuicyAds', url: 'juicyads.com', desc: 'Frequently cited beginner-friendly popunder/banner network.' },
          { name: 'ClickAdu', url: 'clickadu.com', desc: 'Popunder network in "best adult networks" roundups.' },
          { name: 'HilltopAds', url: 'hilltopads.com', desc: 'Popunder/push/native network in traffic-source comparisons.' },
          { name: 'AdXXX', url: 'adxxx.com', desc: 'Adult ad network appearing in current network comparisons.' },
          { name: 'CrakRevenue', url: 'crakrevenue.com', desc: 'Affiliate network with cam offers, cited in "how to promote cam offers" guides.' },
        ],
      },
      {
        slug: 'tiktok-traffic-for-models',
        badge: 'ok',
        note: {
          en: 'TikTok bans adult content — every listed service works through compliant SFW teaser strategies.',
          de: 'TikTok verbietet Erwachseneninhalte — alle gelisteten Dienste nutzen konforme SFW-Teaser-Strategien.',
          es: 'TikTok prohíbe el contenido para adultos — todos los servicios listados usan estrategias de teaser SFW conformes.',
          ro: 'TikTok interzice conținutul adult — toate serviciile listate folosesc strategii de teaser SFW conforme.',
          uk: 'TikTok забороняє дорослий контент — усі сервіси працюють через дозволені SFW-тизери.',
          ru: 'TikTok запрещает контент 18+ — все сервисы работают через разрешённые SFW-тизеры.',
          fr: 'TikTok interdit le contenu adulte — tous les services listés utilisent des stratégies de teaser SFW conformes.',
          pt: 'O TikTok proíbe conteúdo adulto — todos os serviços listados usam estratégias de teaser SFW compatíveis.',
        },
        label: { en: 'TikTok Traffic for Models', de: 'TikTok-Traffic für Models', es: 'Tráfico de TikTok para Modelos', ro: 'Trafic TikTok pentru Modele', uk: 'TikTok-трафік для моделей', ru: 'TikTok-трафик для моделей', fr: 'Trafic TikTok pour Modèles', pt: 'Tráfego do TikTok para Modelos' },
        services: [
          { name: 'Aruna Talent', url: 'arunatalent.com', desc: '2026 TikTok marketing guide for OnlyFans/cam creators.' },
          { name: 'Model Starz', url: 'modelstarzmgmt.com', desc: 'OnlyFans agency citing TikTok/Reddit/SEO with platform-compliant campaigns.' },
          { name: 'XCreatorMgmt', url: 'xcreatormgmt.com', desc: 'TikTok-specific organic marketing for adult creators.' },
          { name: 'TDM Management', url: 'tdmmanagement.com', desc: 'TikTok marketing templates/automation for subscriber growth.' },
          { name: 'Beacons', url: 'beacons.ai', desc: 'Link-in-bio tool that permits adult-content links (with warning), unlike Linktree.' },
        ],
      },
      {
        slug: 'youtube-for-onlyfans-webcam',
        badge: 'ok',
        label: { en: 'YouTube to OnlyFans/Webcam', de: 'YouTube zu OnlyFans/Webcam', es: 'YouTube a OnlyFans/Webcam', ro: 'YouTube spre OnlyFans/Webcam', uk: 'YouTube → OnlyFans/вебкам', ru: 'YouTube → OnlyFans/вебкам', fr: 'YouTube vers OnlyFans/Webcam', pt: 'YouTube para OnlyFans/Webcam' },
        services: [
          { name: 'Sakura Management', url: 'sakura.agency', desc: 'Runs YouTube as one channel in a multi-platform creator strategy.' },
          { name: 'Triple Minds', url: 'tripleminds.co', desc: 'SEO, content marketing and social funnels for adult creators.' },
          { name: 'SirenCY', url: 'sirency.com', desc: 'Manages content strategy across channels including YouTube.' },
          { name: 'Aruna Talent', url: 'arunatalent.com', desc: 'SFW lifestyle-content funnel guidance bridging YouTube to OnlyFans.' },
          { name: 'TDM Management', url: 'tdmmanagement.com', desc: 'Marketing templates spanning YouTube alongside TikTok.' },
        ],
      },
      {
        slug: 'massuploadofshortvideos',
        badge: 'ok',
        label: { en: 'Mass Short-Video Upload', de: 'Massen-Upload von Kurzvideos', es: 'Carga Masiva de Videos Cortos', ro: 'Încărcare în Masă de Videoclipuri Scurte', uk: 'Масове завантаження коротких відео', ru: 'Массовая заливка коротких видео', fr: 'Publication en Masse de Vidéos Courtes', pt: 'Upload em Massa de Vídeos Curtos' },
        services: [
          { name: 'Repurpose.io', url: 'repurpose.io', desc: 'Automates distribution of finished clips across multiple platforms.' },
          { name: 'Later', url: 'later.com', desc: 'Content calendar and scheduler across IG/TikTok/Pinterest/FB/YouTube.' },
          { name: 'Quso.ai (ex-Vidyo.ai)', url: 'quso.ai', desc: 'AI cuts long video into shorts and auto-publishes with captions.' },
          { name: 'Metricool', url: 'metricool.com', desc: 'Scheduling and analytics for multi-network short-video posting.' },
        ],
      },
    ],
  },
  {
    id: 'business',
    name: { en: 'Studio & Model Business', de: 'Studio- & Model-Business', es: 'Negocio de Estudios y Modelos', ro: 'Afaceri de Studiouri și Modele', uk: 'Бізнес студій та моделей', ru: 'Бизнес студий и моделей', fr: 'Business des Studios et Modèles', pt: 'Negócio de Estúdios e Modelos' },
    desc: {
      en: 'Recruiting, industry forums, multi-site broadcasting software, marketplaces and payouts — the operational side of running a studio.',
      de: 'Rekrutierung, Branchenforen, Multi-Site-Broadcasting-Software, Marktplätze und Auszahlungen — die operative Seite des Studiobetriebs.',
      es: 'Reclutamiento, foros del sector, software de transmisión multi-sitio, marketplaces y pagos — el lado operativo de dirigir un estudio.',
      ro: 'Recrutare, forumuri din industrie, software de transmisie pe mai multe site-uri, marketplace-uri și plăți — partea operațională a conducerii unui studio.',
      uk: 'Рекрутинг, галузеві форуми, софт для мовлення на кілька сайтів, маркетплейси та виплати — операційний бік ведення студії.',
      ru: 'Рекрутинг, отраслевые форумы, софт для вещания на несколько сайтов, маркетплейсы и выплаты — операционная сторона ведения студии.',
      fr: 'Recrutement, forums du secteur, logiciels de diffusion multi-sites, marketplaces et paiements — le côté opérationnel de la gestion d’un studio.',
      pt: 'Recrutamento, fóruns do setor, software de transmissão multi-site, marketplaces e pagamentos — o lado operacional de administrar um estúdio.',
    },
    topics: [
      {
        slug: 'webcam-models-for-studio',
        badge: 'ok',
        label: { en: 'Model Recruiting for Studios', de: 'Model-Rekrutierung für Studios', es: 'Reclutamiento de Modelos para Estudios', ro: 'Recrutare de Modele pentru Studiouri', uk: 'Рекрутинг моделей для студій', ru: 'Рекрутинг моделей для студий', fr: 'Recrutement de Modèles pour Studios', pt: 'Recrutamento de Modelos para Estúdios' },
        services: [
          { name: 'Flash Model Recruit', url: 'flashmodelrecruit.com', desc: 'Recruiting agency, claims $15M+ combined income for 500+ performers in year one.' },
          { name: 'New Industry Models', url: 'newindustrymodels.com', desc: 'Studio/recruiting company operating since 2010.' },
          { name: 'Webcam Modeling Guide', url: 'webcammodelingguide.com', desc: '"Authorized" recruiting agency placing across 3,000+ cam sites.' },
          { name: 'ZipRecruiter / Indeed', url: 'ziprecruiter.com · indeed.com', desc: 'Mainstream job boards actively used by studios to hire.' },
        ],
      },
      {
        slug: 'webcam-models',
        badge: 'ok',
        label: { en: 'Model Talent Management', de: 'Talent-Management für Models', es: 'Gestión de Talento para Modelos', ro: 'Management de Talent pentru Modele', uk: 'Тален-менеджмент моделей', ru: 'Тэлент-менеджмент моделей', fr: 'Gestion de Talents pour Modèles', pt: 'Gestão de Talentos para Modelos' },
        services: [
          { name: 'Aruna Talent', url: 'arunatalent.com', desc: 'Talent management, 50/50 revenue share, DMCA protection, tip-strategy coaching.' },
          { name: 'Costa Model Management', url: 'costamodelmanagement.com', desc: 'London-based agency, 70% revenue share, weekly payouts, no exclusivity.' },
          { name: 'Flash Model Recruit', url: 'flashmodelrecruit.com', desc: 'Also an entry point for individual, non-studio models.' },
        ],
      },
      {
        slug: 'offline-webcam-studio',
        badge: 'thin',
        note: {
          en: 'Adult-specific studio-in-a-box vendors are scarce — a genuine market gap beyond OdysseyCam.',
          de: 'Adult-spezifische „Studio im Koffer"-Anbieter sind rar — eine echte Marktlücke jenseits von OdysseyCam.',
          es: 'Los proveedores de "estudio en una caja" específicos para adultos son escasos — un verdadero vacío de mercado más allá de OdysseyCam.',
          ro: 'Furnizorii de „studio în cutie" specifici pentru industria adultă sunt rari — un gol real de piață dincolo de OdysseyCam.',
          uk: 'Постачальників "студії в коробці" саме для дорослої індустрії обмаль — реальна ринкова прогалина поза OdysseyCam.',
          ru: 'Поставщиков "студии в коробке" именно под адалт-индустрию мало — реальный пробел рынка помимо OdysseyCam.',
          fr: 'Les fournisseurs de « studio en valise » spécifiques à l’industrie adulte sont rares — un véritable vide de marché au-delà d’OdysseyCam.',
          pt: 'Fornecedores de "estúdio em uma caixa" específicos para a indústria adulta são raros — uma lacuna real de mercado além da OdysseyCam.',
        },
        label: { en: 'Physical Studio Setup', de: 'Physischer Studio-Aufbau', es: 'Configuración de Estudio Físico', ro: 'Amenajare Studio Fizic', uk: 'Обладнання офлайн-студії', ru: 'Оборудование офлайн-студии', fr: 'Installation de Studio Physique', pt: 'Montagem de Estúdio Físico' },
        services: [
          { name: 'GetyourStudio', url: 'getyourstudio.com', desc: '"Studio-in-a-Box" flight case with built-in AV mixer/recorder/PC.' },
          { name: 'OdysseyCam', url: 'odysseycam.com', desc: 'Physically builds out webcam studios on-site plus sells adult video-chat business software.' },
        ],
      },
      {
        slug: 'webcam-forums-for-models-and-studios',
        badge: 'thin',
        note: {
          en: '"CamModelForum" could not be independently confirmed as a live, distinct site — not included.',
          de: '„CamModelForum" konnte nicht unabhängig als eigenständige, aktive Seite bestätigt werden — nicht aufgenommen.',
          es: '"CamModelForum" no pudo confirmarse de forma independiente como un sitio activo y distinto — no se incluye.',
          ro: '„CamModelForum" nu a putut fi confirmat independent ca site activ, distinct — nu a fost inclus.',
          uk: '"CamModelForum" не вдалося незалежно підтвердити як окремий діючий сайт — не включено.',
          ru: '"CamModelForum" не удалось независимо подтвердить как отдельный живой сайт — не включён.',
          fr: '« CamModelForum » n’a pas pu être confirmé indépendamment comme site actif distinct — non inclus.',
          pt: '"CamModelForum" não pôde ser confirmado de forma independente como um site ativo e distinto — não incluído.',
        },
        label: { en: 'Industry Forums', de: 'Branchenforen', es: 'Foros de la Industria', ro: 'Forumuri din Industrie', uk: 'Форуми індустрії', ru: 'Форумы индустрии', fr: 'Forums du Secteur', pt: 'Fóruns do Setor' },
        services: [
          { name: 'GoFuckYourself (GFY)', url: 'gfy.com', desc: 'Long-running adult-webmaster forum with active cam-industry threads.' },
          { name: 'WeCamGirls', url: 'wecamgirls.com', desc: 'Active model community, per-site threads, advice, job board.' },
        ],
      },
      {
        slug: 'service-for-working-with-multiple-webcam-sites',
        badge: 'ok',
        label: { en: 'Multi-Site Broadcasting', de: 'Multi-Site-Broadcasting', es: 'Transmisión Multi-Sitio', ro: 'Transmisie pe Mai Multe Site-uri', uk: 'Мовлення на кілька сайтів', ru: 'Вещание на несколько сайтов', fr: 'Diffusion Multi-Sites', pt: 'Transmissão Multi-Site' },
        services: [
          { name: 'SplitCam', url: 'splitcam.com', desc: 'Free multistreaming to Chaturbate/BongaCams/Stripchat/CAM4/MFC at once.' },
          { name: 'Streamster', url: 'streamster.io', desc: 'Unified chat plus simultaneous output to two or more cam sites.' },
          { name: 'Aitum Multistream (OBS plugin)', url: 'obsproject.com/forum/resources/aitum-multistream.1991', desc: 'Adds multiple RTMP destinations directly inside OBS.' },
          { name: 'Multiple RTMP Outputs (OBS plugin)', url: 'obsproject.com/forum/resources/multiple-rtmp-outputs-plugin.964', desc: 'Concurrent streaming to several RTMP endpoints.' },
        ],
      },
      {
        slug: 'rabota-webcam-modelyu',
        badge: 'ok',
        label: { en: 'Cam Model Jobs (RU Market)', de: 'Cam-Model-Jobs (russischer Markt)', es: 'Empleos de Modelo Cam (Mercado Ruso)', ro: 'Locuri de Muncă Model Cam (Piața Rusă)', uk: 'Вакансії кам-моделі (рос. ринок)', ru: 'Работа вебкам-моделью (рынок РФ)', fr: 'Emplois de Modèle Cam (Marché Russe)', pt: 'Vagas de Modelo Cam (Mercado Russo)' },
        services: [
          { name: 'WebCamRabota.ru', url: 'webcamrabota.ru', desc: 'Directory aggregating Russian studios and model vacancies.' },
          { name: 'Grand Models', url: 'grandmodels.online', desc: 'Studio with an active recruitment section.' },
          { name: 'Flirt Studio Group', url: 'flirtstudio-group.com', desc: 'Studio advertising vacancy listings.' },
          { name: 'WebCam SPb', url: 'webcampspb.com', desc: 'Saint Petersburg studio with a public vacancies page.' },
          { name: 'Kinky Studio (SPB Webcam)', url: 'spb-webcam.com', desc: 'Another Saint Petersburg studio with a recruitment page.' },
          { name: 'Layboard', url: 'layboard.com', desc: 'International job board with a dedicated webcam-model category.' },
        ],
      },
      {
        slug: 'chto-takoe-webcam',
        badge: 'none',
        note: {
          en: 'A purely informational/definitional topic — no service applies.',
          de: 'Ein rein informatives/definitorisches Thema — kein Dienst zutreffend.',
          es: 'Un tema puramente informativo/definitorio — no aplica ningún servicio.',
          ro: 'Un subiect pur informativ/de definiție — niciun serviciu aplicabil.',
          uk: 'Суто інформаційна/визначальна тема — сервіс не застосовується.',
          ru: 'Чисто информационная/определительная тема — сервис не применяется.',
          fr: 'Un sujet purement informatif/définitionnel — aucun service applicable.',
          pt: 'Um tópico puramente informativo/definicional — nenhum serviço se aplica.',
        },
        label: { en: '"What Is Webcam?" (informational)', de: '„Was ist Webcam?“ (informativ)', es: '"¿Qué es Webcam?" (informativo)', ro: '„Ce Este Webcam?“ (informativ)', uk: '«Що таке вебкам?» (інформаційна)', ru: '«Что такое вебкам?» (информационная)', fr: '« Qu’est-ce Que le Webcam ? » (informatif)', pt: '"O Que É Webcam?" (informativo)' },
        services: [],
      },
      {
        slug: 'marketplace',
        badge: 'thin',
        label: { en: 'Content Marketplaces', de: 'Content-Marktplätze', es: 'Marketplaces de Contenido', ro: 'Marketplace-uri de Conținut', uk: 'Маркетплейси контенту', ru: 'Маркетплейсы контента', fr: 'Marketplaces de Contenu', pt: 'Marketplaces de Conteúdo' },
        services: [
          { name: 'ManyVids', url: 'manyvids.com', desc: 'Clips/customs marketplace and subscriptions, ~80% on tips/customs, weekly payouts.' },
          { name: 'Clips4Sale', url: 'clips4sale.com', desc: 'Running since 2003 — creator/studio storefronts specializing in fetish clips.' },
        ],
      },
      {
        slug: 'payment-from-members',
        badge: 'ok',
        label: { en: 'Member Payment Processing', de: 'Zahlungsabwicklung von Mitgliedern', es: 'Procesamiento de Pagos de Miembros', ro: 'Procesare Plăți de la Membri', uk: 'Обробка платежів від учасників', ru: 'Обработка платежей от участников', fr: 'Traitement des Paiements des Membres', pt: 'Processamento de Pagamentos de Membros' },
        services: [
          { name: 'Paxum', url: 'paxum.com', desc: 'Adult-industry e-wallet since 2007, with a dedicated webcam-model case study.' },
          { name: 'CosmoPayment', url: 'cosmopayment.com', desc: 'Instant payouts, virtual/physical cards, international ATM withdrawal.' },
          { name: 'ePayService', url: 'epayservice.com', desc: 'Common for EU/Eastern-Europe payouts, higher fees per industry commentary.' },
        ],
      },
    ],
  },
  {
    id: 'guides',
    name: { en: 'Guides & Onboarding', de: 'Guides & Onboarding', es: 'Guías y Onboarding', ro: 'Ghiduri și Integrare', uk: 'Гайди та онбординг', ru: 'Гайды и онбординг', fr: 'Guides et Intégration', pt: 'Guias e Onboarding' },
    desc: {
      en: 'Top-earner coaching, onboarding for new models, mobile streaming, lighting, and status-tracking tools.',
      de: 'Coaching für Top-Verdienerinnen, Onboarding für neue Models, mobiles Streaming, Beleuchtung und Status-Tracking-Tools.',
      es: 'Coaching para top earners, onboarding de nuevas modelos, streaming móvil, iluminación y herramientas de seguimiento de estado.',
      ro: 'Coaching pentru modele de top, integrare pentru modele noi, streaming mobil, iluminat și unelte de urmărire a statusului.',
      uk: 'Коучинг топ-моделей, онбординг новачків, мобільний стрім, освітлення та трекери статусу.',
      ru: 'Коучинг топ-моделей, онбординг новичков, мобильный стрим, освещение и трекеры статуса.',
      fr: 'Coaching pour top performeuses, intégration des nouvelles modèles, streaming mobile, éclairage et outils de suivi de statut.',
      pt: 'Coaching para top earners, onboarding de novas modelos, streaming móvel, iluminação e ferramentas de rastreamento de status.',
    },
    topics: [
      {
        slug: 'chaturbate-topmodel-guide',
        badge: 'ok',
        label: { en: 'Top-Earner Coaching', de: 'Coaching für Top-Verdienerinnen', es: 'Coaching para Top Earners', ro: 'Coaching pentru Modele de Top', uk: 'Коучинг топ-моделей', ru: 'Коучинг топ-моделей', fr: 'Coaching pour Top Performeuses', pt: 'Coaching para Top Earners' },
        services: [
          { name: 'Aruna Talent', url: 'arunatalent.com', desc: 'Full-service management with session-strategy coaching, 50/50 split.' },
          { name: 'Uber Fans Magnet', url: 'uberfansmagnet.com', desc: '8-lesson paid course teaching how to attract big-spending "whale" fans.' },
          { name: 'WeCamGirls', url: 'wecamgirls.com', desc: 'Free peer-mentorship community with guides and tool reviews.' },
          { name: 'Cam Model Agency (Gumroad)', url: 'cammodelagency.gumroad.com', desc: 'Training/resource seller aimed at cam models.' },
        ],
      },
      {
        slug: 'start-on-chaturbate',
        badge: 'ok',
        label: { en: 'Getting Started on Chaturbate', de: 'Einstieg bei Chaturbate', es: 'Cómo Empezar en Chaturbate', ro: 'Cum Începi pe Chaturbate', uk: 'Старт на Chaturbate', ru: 'Старт на Chaturbate', fr: 'Débuter sur Chaturbate', pt: 'Começando no Chaturbate' },
        services: [
          { name: 'Aruna Talent', url: 'arunatalent.com', desc: 'Full onboarding — persona setup, privacy/geo-blocking, account setup.' },
          { name: 'Best Studios', url: 'beststudios.ro', desc: 'Bucharest Chaturbate studio (also in EWO’s directory) offering housing, shifts, training.' },
          { name: 'Charm Studio', url: 'charmstudio.ro', desc: 'Bucharest studio (also in EWO’s directory), over a decade recruiting and onboarding.' },
          { name: 'CammingWebmasters Agent Program', url: 'cammingwebmasters.com/agent', desc: 'Referral program connecting new models to studios and sites.' },
          { name: 'WeCamGirls Job Board', url: 'wecamgirls.com', desc: 'Lists studio/agency openings that onboard new models.' },
        ],
      },
      {
        slug: 'how-to-stream-on-webcam-sites-from-phone',
        badge: 'ok',
        label: { en: 'Streaming From a Phone', de: 'Streamen vom Smartphone', es: 'Transmitir Desde el Móvil', ro: 'Streaming de pe Telefon', uk: 'Стрім з телефону', ru: 'Стрим с телефона', fr: 'Diffuser Depuis un Téléphone', pt: 'Transmitindo Pelo Celular' },
        services: [
          { name: 'Larix Broadcaster', url: 'softvelum.com/larix', desc: 'Free iOS/Android app supporting RTMP/SRT/WebRTC streaming from a phone.' },
          { name: 'Camo', url: 'camo.com', desc: 'Turns a phone into a high-quality PC webcam, works with OBS and Streamlabs.' },
          { name: 'EpocCam (Elgato)', url: 'camo.com/epoccam', desc: 'Phone-as-webcam app, free at 640×480, paid unlocks 1080p.' },
          { name: 'iVCam', url: 'e2esoft.com/ivcam', desc: 'Wi-Fi/USB phone-as-webcam app, up to 1080p/60fps.' },
          { name: 'DroidCam', url: 'dev47apps.com', desc: 'Popular Android app for using a phone as an OBS-compatible source.' },
          { name: 'ManyCam Mobile', url: 'manycam.com/mobile', desc: 'Mobile live-streaming app with multi-source switching.' },
        ],
      },
      {
        slug: 'lighting-setups-for-webcam-models',
        badge: 'ok',
        label: { en: 'Lighting Setups', de: 'Beleuchtungs-Setups', es: 'Configuraciones de Iluminación', ro: 'Configurații de Iluminat', uk: 'Схеми освітлення', ru: 'Схемы освещения', fr: 'Configurations d’Éclairage', pt: 'Configurações de Iluminação' },
        services: [
          { name: 'Elgato Key Light', url: 'elgato.com', desc: 'Panel LED light with app/Stream Deck brightness and color-temp control.' },
          { name: 'Logitech Litra Glow / Beam LX', url: 'logitech.com', desc: 'Compact LED streaming lights marketed to content creators.' },
          { name: 'Neewer GL1 Pro / ring lights', url: 'neewer.com', desc: 'Key light and ring-light lines, CRI97+, budget-friendly.' },
          { name: 'GVM ring lights', url: 'gvmled.com', desc: 'Ring-light line for content creators.' },
        ],
      },
      {
        slug: 'chaturbate-model-online',
        badge: 'warn',
        note: {
          en: 'A similarly named "Chaturbate Checker" extension has been flagged by reviewers as likely malware — avoid it.',
          de: 'Eine ähnlich benannte Erweiterung „Chaturbate Checker" wurde von Rezensenten als vermutlich Malware eingestuft — vermeiden.',
          es: 'Una extensión con nombre similar, "Chaturbate Checker", ha sido señalada por revisores como probable malware — evitarla.',
          ro: 'O extensie cu nume similar, „Chaturbate Checker", a fost semnalată de recenzenți ca probabil malware — de evitat.',
          uk: 'Схоже за назвою розширення "Chaturbate Checker" рецензенти позначили як ймовірний malware — уникати.',
          ru: 'Похожее по названию расширение "Chaturbate Checker" отмечено ревьюерами как вероятный malware — не устанавливать.',
          fr: 'Une extension au nom similaire, « Chaturbate Checker », a été signalée par des évaluateurs comme probable malware — à éviter.',
          pt: 'Uma extensão com nome parecido, "Chaturbate Checker", foi sinalizada por avaliadores como provável malware — evite.',
        },
        label: { en: 'Model Online-Status Trackers', de: 'Online-Status-Tracker für Models', es: 'Rastreadores de Estado en Línea', ro: 'Verificatoare de Status Online', uk: 'Трекери онлайн-статусу моделі', ru: 'Трекеры онлайн-статуса модели', fr: 'Trackers de Statut En Ligne', pt: 'Rastreadores de Status Online' },
        services: [
          { name: 'Chaturbate Poller', url: 'pypi.org/project/chaturbate-poller', desc: 'Python library that polls the Events API to track online/offline state.' },
          { name: 'chaturbate-controller', url: 'github.com/paulallen87/chaturbate-controller', desc: 'Open-source module for tracking a profile’s live state.' },
          { name: '"my Chaturbate models" (Chrome extension)', url: 'Chrome Web Store', desc: 'Saves favorite models and shows online/offline status in-browser.' },
          { name: 'SIREN', url: 'siren.chat', desc: 'Telegram notification when a subscribed streamer goes live.' },
        ],
      },
    ],
  },
];
