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
        slug: 'best-studios',
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
        about: {
          en: "Best Studios calls itself one of the largest webcam studios in Europe, running roughly 80 fully-equipped rooms out of its main Piața Unirii location in Bucharest, with sister locations in Iași, Pitești, Brașov, and Târgu Mureș. The studio has been operating for 25 years and says its models earn anywhere from $1,000 to $50,000 a month, averaging around $13,000. Models get access to on-site eyelash extension, nail, and makeup services at no charge, and housing is available under certain conditions for those relocating to Bucharest. With over 150 models across its locations, it's one of the larger studio networks in Romania's cam industry.",
          de: 'Best Studios bezeichnet sich selbst als eines der größten Webcam-Studios Europas und betreibt rund 80 voll ausgestattete Räume am Hauptstandort Piața Unirii in Bukarest, mit Schwesterstudios in Iași, Pitești, Brașov und Târgu Mureș. Das Studio ist seit 25 Jahren aktiv und gibt an, dass Models zwischen 1.000 und 50.000 US-Dollar im Monat verdienen, im Schnitt rund 13.000 US-Dollar. Models erhalten kostenlosen Zugang zu Wimpernverlängerungen, Nagel- und Make-up-Services vor Ort, und unter bestimmten Bedingungen steht auch eine Unterkunft für Models zur Verfügung, die nach Bukarest ziehen. Mit über 150 Models an allen Standorten zählt es zu den größeren Studio-Netzwerken der rumänischen Camming-Branche.',
          es: 'Best Studios se presenta como uno de los estudios webcam más grandes de Europa, con unas 80 salas totalmente equipadas en su sede principal de Piața Unirii, en Bucarest, y estudios hermanos en Iași, Pitești, Brașov y Târgu Mureș. El estudio lleva 25 años en funcionamiento y afirma que sus modelos ganan entre 1.000 y 50.000 dólares al mes, con un promedio de unos 13.000 dólares. Las modelos tienen acceso gratuito a servicios de extensiones de pestañas, uñas y maquillaje en el propio estudio, y se ofrece alojamiento bajo ciertas condiciones para quienes se mudan a Bucarest. Con más de 150 modelos en todas sus sedes, es una de las redes de estudios más grandes de la industria cam rumana.',
          ro: 'Best Studios se descrie ca fiind unul dintre cele mai mari studiouri webcam din Europa, operând aproximativ 80 de camere complet echipate la sediul principal din Piața Unirii, București, cu studiouri surori în Iași, Pitești, Brașov și Târgu Mureș. Studioul funcționează de 25 de ani și afirmă că modelele sale câștigă între 1.000 și 50.000 de dolari pe lună, în medie aproximativ 13.000 de dolari. Modelele au acces gratuit la servicii de extensii de gene, manichiură și machiaj chiar la studio, iar cazarea este disponibilă, în anumite condiții, pentru cele care se mută în București. Cu peste 150 de modele în toate locațiile, este una dintre cele mai mari rețele de studiouri din industria cam din România.',
          uk: 'Best Studios описує себе як одну з найбільших вебкам-студій Європи, керуючи приблизно 80 повністю обладнаними кімнатами у своїй головній локації на Piața Unirii в Бухаресті, з сестринськими студіями в Яссах, Пітешті, Брашові та Тиргу-Муреші. Студія працює вже 25 років і заявляє, що її моделі заробляють від 1 000 до 50 000 доларів на місяць, в середньому близько 13 000 доларів. Моделі мають безкоштовний доступ до нарощування вій, манікюру та макіяжу прямо в студії, а житло надається за певних умов тим, хто переїжджає до Бухареста. З понад 150 моделями в усіх локаціях, це одна з найбільших мереж студій у румунській кам-індустрії.',
          ru: 'Best Studios позиционирует себя как одну из крупнейших вебкам-студий Европы, управляя примерно 80 полностью оборудованными комнатами в главной локации на Piața Unirii в Бухаресте, с дочерними студиями в Яссах, Питешти, Брашове и Тыргу-Муреше. Студия работает уже 25 лет и заявляет, что её модели зарабатывают от 1 000 до 50 000 долларов в месяц, в среднем около 13 000 долларов. Модели получают бесплатный доступ к наращиванию ресниц, маникюру и макияжу прямо в студии, а жильё предоставляется при определённых условиях тем, кто переезжает в Бухарест. С более чем 150 моделями во всех локациях, это одна из крупнейших сетей студий в румынской кам-индустрии.',
          fr: "Best Studios se présente comme l'un des plus grands studios webcam d'Europe, exploitant environ 80 salles entièrement équipées dans son site principal de Piața Unirii à Bucarest, avec des studios sœurs à Iași, Pitești, Brașov et Târgu Mureș. Le studio est en activité depuis 25 ans et affirme que ses modèles gagnent entre 1 000 et 50 000 dollars par mois, avec une moyenne d'environ 13 000 dollars. Les modèles ont accès gratuitement à des services d'extensions de cils, de manucure et de maquillage sur place, et un logement est disponible sous certaines conditions pour celles qui s'installent à Bucarest. Avec plus de 150 modèles sur l'ensemble de ses sites, c'est l'un des plus grands réseaux de studios de l'industrie cam roumaine.",
          pt: 'A Best Studios se apresenta como um dos maiores estúdios webcam da Europa, operando cerca de 80 salas totalmente equipadas em sua sede principal na Piața Unirii, em Bucareste, com estúdios irmãos em Iași, Pitești, Brașov e Târgu Mureș. O estúdio está em atividade há 25 anos e afirma que suas modelos ganham entre $1.000 e $50.000 por mês, com média de cerca de $13.000. As modelos têm acesso gratuito a serviços de extensão de cílios, manicure e maquiagem no próprio estúdio, e hospedagem é oferecida sob certas condições para quem se muda para Bucareste. Com mais de 150 modelos em todas as suas unidades, é uma das maiores redes de estúdios da indústria cam romena.',
        },
        facts: {
          earnings: '$1,000–$50,000/mo (avg. ~$13,000)',
          experienceYears: 25,
          locations: ['Bucharest', 'Iași', 'Pitești', 'Brașov', 'Târgu Mureș'],
          rooms: 80,
          models: '150+',
          perks: ['housing', 'freeBeauty'],
          phone: '+40 740 206 010',
        },
      },
      {
        slug: 'charm-studio',
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
        about: {
          en: 'Charm Studio runs three central Bucharest locations — around Piața Unirii, Piața Victoriei, and Piața Universității — plus additional offices in Spain and the UK, and is a certified LiveJasmin studio. New models are offered a guaranteed €1,500 a month for their first three months while they build an audience, on top of a 50–70% commission split. The studio runs two 12-hour shifts a day, works under a stated fully legal contract, and puts new hires through its free "Top Model by LiveJasmin" training program. Charm requires conversational English and accepts models aged 18 to 35, and says over 100 models currently work across its three Bucharest locations.',
          de: 'Charm Studio betreibt drei zentrale Standorte in Bukarest — rund um Piața Unirii, Piața Victoriei und Piața Universității — sowie weitere Büros in Spanien und Großbritannien, und ist ein zertifiziertes LiveJasmin-Studio. Neuen Models werden für die ersten drei Monate garantiert 1.500 € im Monat gezahlt, während sie sich ein Publikum aufbauen, zusätzlich zu einem Provisionssatz von 50–70 %. Das Studio arbeitet in zwei 12-Stunden-Schichten pro Tag, gibt an, unter einem vollständig legalen Vertrag zu arbeiten, und lässt neue Mitarbeiterinnen das kostenlose Trainingsprogramm „Top Model by LiveJasmin" durchlaufen. Charm verlangt Konversationsenglisch und akzeptiert Models im Alter von 18 bis 35 Jahren; nach eigenen Angaben arbeiten aktuell über 100 Models an den drei Bukarester Standorten.',
          es: 'Charm Studio opera tres sedes centrales en Bucarest — cerca de Piața Unirii, Piața Victoriei y Piața Universității — además de oficinas en España y Reino Unido, y es un estudio certificado por LiveJasmin. A las nuevas modelos se les garantizan 1.500 € al mes durante sus primeros tres meses mientras construyen audiencia, además de una comisión del 50–70%. El estudio trabaja en dos turnos de 12 horas al día, afirma operar bajo un contrato totalmente legal, y forma a las nuevas modelos con su programa gratuito "Top Model by LiveJasmin". Charm exige inglés conversacional y acepta modelos de entre 18 y 35 años, y asegura tener más de 100 modelos trabajando actualmente en sus tres sedes de Bucarest.',
          ro: 'Charm Studio operează trei locații centrale în București — în zonele Piața Unirii, Piața Victoriei și Piața Universității — plus birouri suplimentare în Spania și Marea Britanie, fiind un studio certificat LiveJasmin. Modelelor noi li se garantează 1.500 € pe lună în primele trei luni, timp în care își construiesc audiența, pe lângă un comision de 50–70%. Studioul funcționează în două ture de câte 12 ore pe zi, declară că operează sub un contract complet legal și oferă noilor angajate programul gratuit de formare „Top Model by LiveJasmin". Charm cere engleză conversațională și acceptă modele cu vârste între 18 și 35 de ani, afirmând că peste 100 de modele lucrează în prezent în cele trei locații din București.',
          uk: 'Charm Studio керує трьома центральними локаціями в Бухаресті — біля Piața Unirii, Piața Victoriei та Piața Universității — а також офісами в Іспанії та Великій Британії, і є сертифікованою студією LiveJasmin. Новим моделям гарантують 1 500 € на місяць протягом перших трьох місяців, поки вони напрацьовують аудиторію, окрім комісії 50–70%. Студія працює у дві 12-годинні зміни на день, заявляє про повністю легальний контракт і проводить нових співробітниць через безкоштовну навчальну програму «Top Model by LiveJasmin». Charm вимагає розмовної англійської та приймає моделей віком від 18 до 35 років, стверджуючи, що зараз у трьох локаціях Бухареста працює понад 100 моделей.',
          ru: 'Charm Studio управляет тремя центральными локациями в Бухаресте — рядом с Piața Unirii, Piața Victoriei и Piața Universității — а также офисами в Испании и Великобритании, и является сертифицированной студией LiveJasmin. Новым моделям гарантируют 1 500 € в месяц в первые три месяца, пока они набирают аудиторию, помимо комиссии 50–70%. Студия работает в две 12-часовые смены в день, заявляет о полностью легальном контракте и проводит новых сотрудниц через бесплатную программу обучения «Top Model by LiveJasmin». Charm требует разговорный английский и принимает моделей в возрасте от 18 до 35 лет, утверждая, что сейчас в трёх локациях Бухареста работает более 100 моделей.',
          fr: 'Charm Studio exploite trois emplacements centraux à Bucarest — autour de Piața Unirii, Piața Victoriei et Piața Universității — ainsi que des bureaux supplémentaires en Espagne et au Royaume-Uni, et est un studio certifié LiveJasmin. Les nouvelles modèles se voient garantir 1 500 € par mois pendant leurs trois premiers mois pendant qu\'elles se constituent une audience, en plus d\'une commission de 50 à 70 %. Le studio fonctionne en deux équipes de 12 heures par jour, affirme opérer sous un contrat entièrement légal, et fait passer les nouvelles recrues par son programme de formation gratuit « Top Model by LiveJasmin ». Charm exige un anglais conversationnel et accepte les modèles âgées de 18 à 35 ans, affirmant que plus de 100 modèles travaillent actuellement dans ses trois emplacements à Bucarest.',
          pt: 'A Charm Studio opera três unidades centrais em Bucareste — perto da Piața Unirii, Piața Victoriei e Piața Universității — além de escritórios na Espanha e no Reino Unido, e é um estúdio certificado pela LiveJasmin. Novas modelos recebem uma garantia de €1.500 por mês nos primeiros três meses enquanto constroem sua audiência, além de uma comissão de 50–70%. O estúdio funciona em dois turnos de 12 horas por dia, afirma operar sob contrato totalmente legal, e coloca as novas contratadas em seu programa gratuito de treinamento "Top Model by LiveJasmin". A Charm exige inglês conversacional e aceita modelos entre 18 e 35 anos, afirmando que mais de 100 modelos trabalham atualmente em suas três unidades em Bucareste.',
        },
        facts: {
          earnings: '50–70% split + €1,500/mo guaranteed (first 3 months)',
          experienceYears: 10,
          locations: ['Bucharest', 'Spain', 'UK'],
          platforms: ['LiveJasmin'],
          models: '100+',
          perks: ['legalContract', 'training'],
          phone: '0784 707 080',
        },
      },
      {
        slug: 'studio-20',
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
        about: {
          en: 'Studio 20 began as a single pilot studio in Bucharest in 2013 and has since grown into a global live-cam franchise, with locations now in Bucharest (two sites), Brașov, Cluj-Napoca, Timișoara, Pitești, and Ploiești in Romania, plus Bogotá, Colombia and Los Angeles, USA. It holds a GOLD LiveJasmin certification and has twice won "Best Live Cam Studio of the Year" at the GFY Awards in Las Vegas. The network works primarily with LiveJasmin and Flirt4Free, has over 15 years of combined experience, and offers models a formal employment contract along with an identity-protection policy built around nicknames rather than real names.',
          de: 'Studio 20 begann 2013 als einzelnes Pilotstudio in Bukarest und ist seitdem zu einem globalen Live-Cam-Franchise gewachsen, mit Standorten in Bukarest (zwei Standorte), Brașov, Cluj-Napoca, Timișoara, Pitești und Ploiești in Rumänien sowie in Bogotá, Kolumbien, und Los Angeles, USA. Es besitzt eine GOLD-LiveJasmin-Zertifizierung und wurde zweimal bei den GFY Awards in Las Vegas als „Best Live Cam Studio of the Year" ausgezeichnet. Das Netzwerk arbeitet vorwiegend mit LiveJasmin und Flirt4Free zusammen, verfügt über mehr als 15 Jahre gemeinsame Erfahrung und bietet Models einen formellen Arbeitsvertrag sowie eine Richtlinie zum Schutz der Identität, die auf Künstlernamen statt echten Namen basiert.',
          es: 'Studio 20 comenzó como un único estudio piloto en Bucarest en 2013 y desde entonces ha crecido hasta convertirse en una franquicia global de cámara en vivo, con sedes en Bucarest (dos ubicaciones), Brașov, Cluj-Napoca, Timișoara, Pitești y Ploiești en Rumanía, además de Bogotá, Colombia, y Los Ángeles, EE. UU. Cuenta con la certificación GOLD de LiveJasmin y ha ganado dos veces el premio "Best Live Cam Studio of the Year" en los GFY Awards de Las Vegas. La red trabaja principalmente con LiveJasmin y Flirt4Free, tiene más de 15 años de experiencia combinada, y ofrece a las modelos un contrato de trabajo formal junto con una política de protección de identidad basada en apodos en lugar de nombres reales.',
          ro: 'Studio 20 a pornit ca un singur studio pilot în București în 2013 și a crescut de atunci într-o franciză globală de live-cam, cu locații acum în București (două sedii), Brașov, Cluj-Napoca, Timișoara, Pitești și Ploiești în România, plus Bogotá, Columbia, și Los Angeles, SUA. Deține certificarea GOLD LiveJasmin și a câștigat de două ori premiul „Best Live Cam Studio of the Year" la GFY Awards din Las Vegas. Rețeaua lucrează în principal cu LiveJasmin și Flirt4Free, are peste 15 ani de experiență combinată și oferă modelelor un contract de muncă formal, alături de o politică de protecție a identității bazată pe pseudonime, nu pe numele reale.',
          uk: 'Studio 20 почала як єдина пілотна студія в Бухаресті у 2013 році, а відтоді виросла у глобальну live-cam франшизу з локаціями в Бухаресті (два сайти), Брашові, Клуж-Напоці, Тімішоарі, Пітешті та Плоєшті в Румунії, а також у Боготі, Колумбія, та Лос-Анджелесі, США. Має сертифікацію GOLD LiveJasmin і двічі вигравала нагороду «Best Live Cam Studio of the Year» на GFY Awards у Лас-Вегасі. Мережа працює переважно з LiveJasmin та Flirt4Free, має понад 15 років сукупного досвіду і пропонує моделям офіційний трудовий договір разом із політикою захисту особистості на основі псевдонімів, а не реальних імен.',
          ru: 'Studio 20 началась как единственная пилотная студия в Бухаресте в 2013 году, а с тех пор выросла в глобальную live-cam франшизу с локациями в Бухаресте (два сайта), Брашове, Клуж-Напоке, Тимишоаре, Питешти и Плоешти в Румынии, а также в Боготе, Колумбия, и Лос-Анджелесе, США. Обладает сертификацией GOLD LiveJasmin и дважды выигрывала награду «Best Live Cam Studio of the Year» на GFY Awards в Лас-Вегасе. Сеть работает в основном с LiveJasmin и Flirt4Free, имеет более 15 лет совокупного опыта и предлагает моделям официальный трудовой договор вместе с политикой защиты личности на основе псевдонимов, а не настоящих имён.',
          fr: 'Studio 20 a débuté comme un studio pilote unique à Bucarest en 2013 et s\'est depuis développé en une franchise mondiale de live-cam, avec des emplacements désormais à Bucarest (deux sites), Brașov, Cluj-Napoca, Timișoara, Pitești et Ploiești en Roumanie, ainsi qu\'à Bogotá, en Colombie, et à Los Angeles, aux États-Unis. Il détient une certification GOLD LiveJasmin et a remporté deux fois le prix « Best Live Cam Studio of the Year » aux GFY Awards de Las Vegas. Le réseau travaille principalement avec LiveJasmin et Flirt4Free, possède plus de 15 ans d\'expérience combinée, et propose aux modèles un contrat de travail formel ainsi qu\'une politique de protection de l\'identité basée sur des pseudonymes plutôt que sur de vrais noms.',
          pt: 'A Studio 20 começou como um único estúdio piloto em Bucareste em 2013 e desde então cresceu para se tornar uma franquia global de live-cam, com unidades agora em Bucareste (duas unidades), Brașov, Cluj-Napoca, Timișoara, Pitești e Ploiești, na Romênia, além de Bogotá, na Colômbia, e Los Angeles, nos EUA. Possui certificação GOLD da LiveJasmin e já venceu duas vezes o prêmio "Best Live Cam Studio of the Year" no GFY Awards, em Las Vegas. A rede trabalha principalmente com LiveJasmin e Flirt4Free, tem mais de 15 anos de experiência combinada, e oferece às modelos um contrato de trabalho formal, além de uma política de proteção de identidade baseada em apelidos em vez de nomes reais.',
        },
        facts: {
          experienceYears: 15,
          locations: ['Bucharest', 'Brașov', 'Cluj-Napoca', 'Timișoara', 'Pitești', 'Ploiești', 'Bogotá', 'Los Angeles'],
          platforms: ['LiveJasmin (GOLD Certified)', 'Flirt4Free'],
          perks: ['legalContract'],
          address: 'Nerva Traian Street 3, 5th floor, Sector 3, Bucharest (HQ)',
          phone: '+40 786 070 050',
        },
      },
      {
        slug: 'missjoy-models',
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
        about: {
          en: 'MissJoy Models operates out of Bucharest\'s Universitate area, a short walk from the metro, and has twice won the "Best Emergent Live Cam Studio" award. The studio is a certified LiveJasmin partner and pays models a 75% commission split, with a weekly $500 bonus for the first three months (up to $6,000 total) and referral bonuses ranging from $1,000 to $3,000 for bringing in new models. On-site amenities include a Salon Beauty K by Kérastase for hair and beauty treatments, and the team offers structured training plus flexible scheduling for models balancing other commitments.',
          de: 'MissJoy Models ist im Bukarester Viertel Universitate ansässig, nur einen kurzen Fußweg von der Metro entfernt, und wurde zweimal mit dem Preis „Best Emergent Live Cam Studio" ausgezeichnet. Das Studio ist ein zertifizierter LiveJasmin-Partner und zahlt Models einen Provisionssatz von 75 %, mit einem wöchentlichen Bonus von 500 US-Dollar für die ersten drei Monate (bis zu 6.000 US-Dollar insgesamt) sowie Empfehlungsboni zwischen 1.000 und 3.000 US-Dollar für die Vermittlung neuer Models. Zu den Annehmlichkeiten vor Ort zählt ein Salon Beauty K by Kérastase für Haar- und Beautybehandlungen, und das Team bietet strukturiertes Training sowie flexible Zeitpläne für Models mit anderen Verpflichtungen.',
          es: 'MissJoy Models opera en la zona de Universitate en Bucarest, a poca distancia a pie del metro, y ha ganado dos veces el premio "Best Emergent Live Cam Studio". El estudio es socio certificado de LiveJasmin y paga a las modelos una comisión del 75%, con un bono semanal de 500 dólares durante los primeros tres meses (hasta 6.000 dólares en total) y bonos por referidos de entre 1.000 y 3.000 dólares por incorporar nuevas modelos. Entre las comodidades del lugar se incluye un Salon Beauty K by Kérastase para tratamientos de cabello y belleza, y el equipo ofrece formación estructurada además de horarios flexibles para modelos con otros compromisos.',
          ro: 'MissJoy Models funcționează în zona Universitate din București, la câțiva pași de metrou, și a câștigat de două ori premiul „Best Emergent Live Cam Studio". Studioul este partener certificat LiveJasmin și plătește modelelor un comision de 75%, cu un bonus săptămânal de 500 de dolari în primele trei luni (până la 6.000 de dolari în total) și bonusuri de recomandare între 1.000 și 3.000 de dolari pentru aducerea de modele noi. Printre facilitățile de la fața locului se numără un Salon Beauty K by Kérastase pentru tratamente de păr și înfrumusețare, iar echipa oferă instruire structurată și program flexibil pentru modelele cu alte angajamente.',
          uk: 'MissJoy Models працює в районі Universitate в Бухаресті, за кілька кроків від метро, і двічі вигравала нагороду «Best Emergent Live Cam Studio». Студія є сертифікованим партнером LiveJasmin і платить моделям комісію 75%, з щотижневим бонусом 500 доларів протягом перших трьох місяців (до 6 000 доларів загалом) та реферальними бонусами від 1 000 до 3 000 доларів за залучення нових моделей. Серед зручностей на місці — Salon Beauty K by Kérastase для догляду за волоссям і краси, а команда пропонує структуроване навчання та гнучкий графік для моделей з іншими зобов\'язаннями.',
          ru: 'MissJoy Models работает в районе Universitate в Бухаресте, в нескольких шагах от метро, и дважды выигрывала награду «Best Emergent Live Cam Studio». Студия является сертифицированным партнёром LiveJasmin и платит моделям комиссию 75%, с еженедельным бонусом 500 долларов в первые три месяца (до 6 000 долларов в общей сложности) и реферальными бонусами от 1 000 до 3 000 долларов за привлечение новых моделей. Среди удобств на месте — Salon Beauty K by Kérastase для ухода за волосами и красоты, а команда предлагает структурированное обучение и гибкий график для моделей с другими обязательствами.',
          fr: 'MissJoy Models opère dans le quartier Universitate de Bucarest, à quelques pas du métro, et a remporté deux fois le prix « Best Emergent Live Cam Studio ». Le studio est un partenaire certifié LiveJasmin et verse aux modèles une commission de 75 %, avec un bonus hebdomadaire de 500 dollars pendant les trois premiers mois (jusqu\'à 6 000 dollars au total) et des primes de parrainage allant de 1 000 à 3 000 dollars pour l\'apport de nouvelles modèles. Parmi les commodités sur place figure un Salon Beauty K by Kérastase pour les soins capillaires et esthétiques, et l\'équipe propose une formation structurée ainsi que des horaires flexibles pour les modèles ayant d\'autres engagements.',
          pt: 'A MissJoy Models opera na região de Universitate, em Bucareste, a poucos passos do metrô, e já venceu duas vezes o prêmio "Best Emergent Live Cam Studio". O estúdio é parceiro certificado da LiveJasmin e paga às modelos uma comissão de 75%, com um bônus semanal de $500 nos primeiros três meses (até $6.000 no total) e bônus de indicação entre $1.000 e $3.000 por trazer novas modelos. Entre as comodidades no local está um Salon Beauty K by Kérastase para tratamentos de cabelo e beleza, e a equipe oferece treinamento estruturado e horários flexíveis para modelos com outros compromissos.',
        },
        facts: {
          earnings: '75% split',
          locations: ['Bucharest'],
          platforms: ['LiveJasmin'],
          perks: ['freeBeauty', 'referralBonus'],
          address: 'Strada Ion Nistor 4, Sector 3, Bucharest',
          phone: '0773 80 90 10',
        },
      },
      {
        slug: 'belle-studio',
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
        about: {
          en: 'Belle Studio is a Bucharest-based operation that lets models choose between working from its studio or streaming independently from home, with a guaranteed minimum of $3,000 a month. Beginners typically earn $3,000 to $6,000 in their first two to three months, with top performers reportedly clearing $15,000 or more later on. The studio recommends a schedule of around 7 hours a day, 5 days a week, and backs that up with a beauty and wellness package (social media management, lash and nail services, optional cosmetic procedures after 3 months), plus an annual all-expenses-paid group trip and a car awarded to its top-performing model each year.',
          de: 'Belle Studio ist ein Bukarester Unternehmen, bei dem Models wählen können, ob sie im Studio arbeiten oder unabhängig von zu Hause aus streamen möchten, mit einer garantierten Mindestsumme von 3.000 US-Dollar im Monat. Anfängerinnen verdienen in den ersten zwei bis drei Monaten typischerweise 3.000 bis 6.000 US-Dollar, während Topmodels später angeblich 15.000 US-Dollar oder mehr erzielen. Das Studio empfiehlt einen Zeitplan von rund 7 Stunden täglich an 5 Tagen die Woche und unterstützt dies mit einem Beauty- und Wellness-Paket (Social-Media-Management, Wimpern- und Nagelservices, optionale kosmetische Eingriffe nach 3 Monaten) sowie einer jährlichen, vollständig bezahlten Gruppenreise und einem Auto, das jedes Jahr an das leistungsstärkste Model vergeben wird.',
          es: 'Belle Studio es una operación con sede en Bucarest que permite a las modelos elegir entre trabajar en el estudio o transmitir de forma independiente desde casa, con un mínimo garantizado de 3.000 dólares al mes. Las principiantes suelen ganar entre 3.000 y 6.000 dólares en sus primeros dos o tres meses, mientras que las modelos top llegan a superar los 15.000 dólares más adelante, según indican. El estudio recomienda un horario de unas 7 horas diarias, 5 días a la semana, respaldado por un paquete de belleza y bienestar (gestión de redes sociales, servicios de pestañas y uñas, procedimientos estéticos opcionales tras 3 meses), además de un viaje anual en grupo con todos los gastos pagados y un coche que se entrega cada año a la modelo con mejor rendimiento.',
          ro: 'Belle Studio este o operațiune cu sediul în București care le permite modelelor să aleagă între a lucra la studio sau a transmite independent de acasă, cu un minim garantat de 3.000 de dolari pe lună. Începătoarele câștigă de obicei între 3.000 și 6.000 de dolari în primele două-trei luni, iar modelele de top ajung ulterior, conform studioului, la 15.000 de dolari sau mai mult. Studioul recomandă un program de aproximativ 7 ore pe zi, 5 zile pe săptămână, susținut de un pachet de frumusețe și wellness (management social media, servicii de gene și manichiură, proceduri estetice opționale după 3 luni), plus o excursie anuală de grup cu toate cheltuielile plătite și o mașină acordată anual modelului cu cele mai bune performanțe.',
          uk: 'Belle Studio — це компанія з Бухареста, яка дозволяє моделям обирати між роботою в студії або незалежним стрімінгом з дому, з гарантованим мінімумом 3 000 доларів на місяць. Початківці зазвичай заробляють від 3 000 до 6 000 доларів у перші два-три місяці, тоді як топ-моделі пізніше, за заявою студії, отримують 15 000 доларів і більше. Студія рекомендує графік близько 7 годин на день, 5 днів на тиждень, підкріплений бʼюті- та велнес-пакетом (управління соцмережами, послуги вій та манікюру, опціональні косметичні процедури після 3 місяців), а також щорічною груповою поїздкою з повною оплатою витрат і автомобілем, який щороку вручають найкращій моделі.',
          ru: 'Belle Studio — это компания из Бухареста, которая позволяет моделям выбирать между работой в студии или независимым стримингом из дома, с гарантированным минимумом 3 000 долларов в месяц. Новички обычно зарабатывают от 3 000 до 6 000 долларов в первые два-три месяца, тогда как топ-модели позже, по заявлению студии, получают 15 000 долларов и больше. Студия рекомендует график около 7 часов в день, 5 дней в неделю, подкреплённый бьюти- и велнес-пакетом (управление соцсетями, услуги ресниц и маникюра, опциональные косметические процедуры после 3 месяцев), а также ежегодной групповой поездкой с полной оплатой расходов и автомобилем, который ежегодно вручается лучшей модели.',
          fr: "Belle Studio est une entreprise basée à Bucarest qui permet aux modèles de choisir entre travailler au studio ou diffuser de manière indépendante depuis chez elles, avec un minimum garanti de 3 000 dollars par mois. Les débutantes gagnent généralement entre 3 000 et 6 000 dollars durant leurs deux à trois premiers mois, tandis que les meilleures modèles dépasseraient ensuite les 15 000 dollars ou plus. Le studio recommande un rythme d'environ 7 heures par jour, 5 jours par semaine, soutenu par un forfait beauté et bien-être (gestion des réseaux sociaux, services de cils et manucure, interventions esthétiques optionnelles après 3 mois), ainsi qu'un voyage de groupe annuel tous frais payés et une voiture remise chaque année à la modèle la plus performante.",
          pt: 'A Belle Studio é uma operação sediada em Bucareste que permite às modelos escolher entre trabalhar no estúdio ou transmitir de forma independente de casa, com um mínimo garantido de $3.000 por mês. Iniciantes normalmente ganham entre $3.000 e $6.000 nos primeiros dois a três meses, enquanto as modelos top chegam depois, segundo o estúdio, a $15.000 ou mais. O estúdio recomenda uma rotina de cerca de 7 horas por dia, 5 dias por semana, apoiada por um pacote de beleza e bem-estar (gestão de redes sociais, serviços de cílios e manicure, procedimentos estéticos opcionais após 3 meses), além de uma viagem anual em grupo com todas as despesas pagas e um carro concedido todo ano à modelo com melhor desempenho.',
        },
        facts: {
          earnings: '$3,000+/mo guaranteed',
          locations: ['Bucharest'],
          perks: ['remoteOption', 'paidTrip', 'freeBeauty'],
          phone: '+40 739 411 765',
          email: 'bellemodels99@gmail.com',
        },
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
