export interface Studio {
  name: string;
  city: string;
  website: string;
  blurb: Record<string, string>;
}

export type CountryKey = 'romania' | 'ukraine' | 'spain';

export interface CountryEntry {
  key: CountryKey;
  studios: Studio[];
}

// Only countries where at least one studio could be independently verified
// (a real address/city and an active, studio-owned website — not just an
// aggregator listing). Expand this list only when a new country clears that bar.
export const studioDirectory: CountryEntry[] = [
  {
    key: 'romania',
    studios: [
      {
        name: 'Best Studios',
        city: 'Bucharest',
        website: 'https://beststudios.ro',
        blurb: {
          en: 'One of the largest webcam studios in Europe, with 16 rooms and around 70 models working across three shifts.',
          de: 'Eines der größten Webcam-Studios Europas mit 16 Räumen und rund 70 Models, die in drei Schichten arbeiten.',
          es: 'Uno de los estudios webcam más grandes de Europa, con 16 salas y unas 70 modelos trabajando en tres turnos.',
          ro: 'Unul dintre cele mai mari studiouri webcam din Europa, cu 16 camere și aproximativ 70 de modele care lucrează în trei ture.',
          uk: 'Одна з найбільших вебкам-студій Європи, з 16 кімнатами і близько 70 моделями, які працюють у три зміни.',
          ru: 'Одна из крупнейших вебкам-студий Европы, с 16 комнатами и около 70 моделями, работающими в три смены.',
          fr: "L'un des plus grands studios webcam d'Europe, avec 16 salles et environ 70 modèles travaillant en trois équipes.",
          pt: 'Um dos maiores estúdios webcam da Europa, com 16 salas e cerca de 70 modelos trabalhando em três turnos.',
        },
      },
      {
        name: 'Charm Studio',
        city: 'Bucharest',
        website: 'https://charmstudio.ro',
        blurb: {
          en: 'Runs three central Bucharest locations (Piața Unirii, Piața Victoriei, Piața Universității) with over a decade in the industry.',
          de: 'Betreibt drei zentrale Standorte in Bukarest (Piața Unirii, Piața Victoriei, Piața Universității) mit über zehn Jahren Branchenerfahrung.',
          es: 'Opera tres sedes en el centro de Bucarest (Piața Unirii, Piața Victoriei, Piața Universității) con más de una década en la industria.',
          ro: 'Operează trei locații centrale în București (Piața Unirii, Piața Victoriei, Piața Universității) cu peste un deceniu în industrie.',
          uk: 'Керує трьома центральними локаціями в Бухаресті (Piața Unirii, Piața Victoriei, Piața Universității), маючи понад десятиліття досвіду в галузі.',
          ru: 'Управляет тремя центральными локациями в Бухаресте (Piața Unirii, Piața Victoriei, Piața Universității), имея более десяти лет опыта в индустрии.',
          fr: 'Gère trois emplacements centraux à Bucarest (Piața Unirii, Piața Victoriei, Piața Universității) avec plus d\'une décennie dans le secteur.',
          pt: 'Opera três localizações centrais em Bucareste (Piața Unirii, Piața Victoriei, Piața Universității) com mais de uma década no setor.',
        },
      },
      {
        name: 'Studio 20',
        city: 'Bucharest (global franchise)',
        website: 'https://studio20.live',
        blurb: {
          en: 'Launched its pilot studio in Bucharest in 2013 and grew into a live-cam franchise network with locations on three continents.',
          de: 'Startete 2013 als Pilotstudio in Bukarest und wuchs zu einem Live-Cam-Franchise-Netzwerk mit Standorten auf drei Kontinenten.',
          es: 'Lanzó su estudio piloto en Bucarest en 2013 y creció hasta convertirse en una red de franquicias de cámara en vivo con sedes en tres continentes.',
          ro: 'Și-a lansat studioul pilot în București în 2013 și a devenit o rețea de francize live-cam cu locații pe trei continente.',
          uk: 'Запустила пілотну студію в Бухаресті у 2013 році і виросла до мережі live-cam франшиз з локаціями на трьох континентах.',
          ru: 'Запустила пилотную студию в Бухаресте в 2013 году и выросла в сеть live-cam франшиз с локациями на трёх континентах.',
          fr: 'A lancé son studio pilote à Bucarest en 2013 et est devenu un réseau de franchises live-cam avec des emplacements sur trois continents.',
          pt: 'Lançou seu estúdio piloto em Bucareste em 2013 e cresceu para se tornar uma rede de franquias live-cam com localizações em três continentes.',
        },
      },
      {
        name: 'MissJoy Models',
        city: 'Bucharest',
        website: 'https://www.missjoymodels.ro',
        blurb: {
          en: 'Winner of the "Best Emergent Live Cam Studio" award for two consecutive years.',
          de: 'Gewinner der Auszeichnung „Best Emergent Live Cam Studio" zwei Jahre in Folge.',
          es: 'Ganador del premio "Best Emergent Live Cam Studio" durante dos años consecutivos.',
          ro: 'Câștigător al premiului „Best Emergent Live Cam Studio" doi ani la rând.',
          uk: 'Переможець нагороди «Best Emergent Live Cam Studio» два роки поспіль.',
          ru: 'Победитель премии «Best Emergent Live Cam Studio» два года подряд.',
          fr: 'Lauréat du prix « Best Emergent Live Cam Studio » deux années consécutives.',
          pt: 'Vencedor do prêmio "Best Emergent Live Cam Studio" por dois anos consecutivos.',
        },
      },
      {
        name: 'Belle Studio',
        city: 'Bucharest',
        website: 'https://mybellestudio.com',
        blurb: {
          en: 'Central Bucharest studio built around modern equipment and structured model training.',
          de: 'Zentral gelegenes Bukarest-Studio mit moderner Ausstattung und strukturiertem Model-Training.',
          es: 'Estudio en el centro de Bucarest construido en torno a equipos modernos y formación estructurada para modelos.',
          ro: 'Studio în centrul Bucureștiului construit în jurul echipamentelor moderne și al unei pregătiri structurate pentru modele.',
          uk: 'Студія в центрі Бухареста, побудована навколо сучасного обладнання та структурованого навчання моделей.',
          ru: 'Студия в центре Бухареста, построенная вокруг современного оборудования и структурированного обучения моделей.',
          fr: "Studio du centre de Bucarest construit autour d'un équipement moderne et d'une formation structurée des modèles.",
          pt: 'Estúdio no centro de Bucareste construído em torno de equipamento moderno e treinamento estruturado para modelos.',
        },
      },
    ],
  },
  {
    key: 'ukraine',
    studios: [
      {
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
      },
    ],
  },
  {
    key: 'spain',
    studios: [
      {
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
      },
      {
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
      },
    ],
  },
];

export const countryNames: Record<CountryKey, Record<string, string>> = {
  romania: { en: 'Romania', de: 'Rumänien', es: 'Rumanía', ro: 'România', uk: 'Румунія', ru: 'Румыния', fr: 'Roumanie', pt: 'Romênia' },
  ukraine: { en: 'Ukraine', de: 'Ukraine', es: 'Ucrania', ro: 'Ucraina', uk: 'Україна', ru: 'Украина', fr: 'Ukraine', pt: 'Ucrânia' },
  spain: { en: 'Spain', de: 'Spanien', es: 'España', ro: 'Spania', uk: 'Іспанія', ru: 'Испания', fr: 'Espagne', pt: 'Espanha' },
};
