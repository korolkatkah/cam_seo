export interface Studio {
  name: string;
  city: string;
  website: string;
  blurb: string;
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
        blurb: 'One of the largest webcam studios in Europe, with 16 rooms and around 70 models working across three shifts.',
      },
      {
        name: 'Charm Studio',
        city: 'Bucharest',
        website: 'https://charmstudio.ro',
        blurb: 'Runs three central Bucharest locations (Piața Unirii, Piața Victoriei, Piața Universității) with over a decade in the industry.',
      },
      {
        name: 'Studio 20',
        city: 'Bucharest (global franchise)',
        website: 'https://studio20.live',
        blurb: 'Launched its pilot studio in Bucharest in 2013 and grew into a live-cam franchise network with locations on three continents.',
      },
      {
        name: 'MissJoy Models',
        city: 'Bucharest',
        website: 'https://www.missjoymodels.ro',
        blurb: 'Winner of the "Best Emergent Live Cam Studio" award for two consecutive years.',
      },
      {
        name: 'Belle Studio',
        city: 'Bucharest',
        website: 'https://mybellestudio.com',
        blurb: 'Central Bucharest studio built around modern equipment and structured model training.',
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
        blurb: 'Model agency with an office in central Kyiv, recruiting for international webcam platforms.',
      },
      {
        name: 'Trinity (Webcam Studiya)',
        city: 'Kyiv',
        website: 'https://webcamstudiya.com',
        blurb: 'One of the earlier webcam studios operating in Kyiv, with over a decade active on major platforms.',
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
        blurb: 'Videochat studio advertising commission rates up to 60% for models at professional level.',
      },
      {
        name: 'WebModel Valencia',
        city: 'Valencia',
        website: 'https://webmodel-valencia.com',
        blurb: 'Studio based in Valencia providing a working space and equipment for webcam models.',
      },
    ],
  },
];

export const countryNames: Record<CountryKey, Record<string, string>> = {
  romania: { en: 'Romania', de: 'Rumänien', es: 'Rumanía', ro: 'România', uk: 'Румунія', ru: 'Румыния', fr: 'Roumanie', pt: 'Romênia' },
  ukraine: { en: 'Ukraine', de: 'Ukraine', es: 'Ucrania', ro: 'Ucraina', uk: 'Україна', ru: 'Украина', fr: 'Ukraine', pt: 'Ucrânia' },
  spain: { en: 'Spain', de: 'Spanien', es: 'España', ro: 'Spania', uk: 'Іспанія', ru: 'Испания', fr: 'Espagne', pt: 'Espanha' },
};
