export const Colors = {
  grey: [
    '#F3F3F4',
    '#E5E5E5',
    '#CCCCCC',
    '#B2B2B2',
    '#999999',
    '#808080',
    '#666666',
    '#4D4D4D',
    '#333333',
    '#1A1A1A',
    '#000000',
  ],
  main: [
    '#d966ff',
    '#c45ce6',
    '#b053cd',
    '#9b49b3',
    '#873f9a',
    '#723681',
    '#5d2c68',
    '#49224f',
    '#341835',
    '#200f1c',
    '#0b050d',
  ],
  green: [
    '#acf7c1',
    '#9ce0af',
    '#8cc99d',
    '#7bb18b',
    '#6b9a79',
    '#5b8367',
    '#4b6c54',
    '#3b5542',
    '#2a3d30',
    '#1a261e',
    '#0a0f0c',
  ],
  yellow: [
    '#cfee9e',
    '#bcd88f',
    '#a8c180',
    '#95ab72',
    '#819563',
    '#6e7f54',
    '#5b6845',
    '#475236',
    '#343c28',
    '#202519',
    '#0d0f0a',
  ],
  red: [
    '#de3c4b',
    '#c93644',
    '#b5313d',
    '#a02b36',
    '#8b262f',
    '#772028',
    '#621a21',
    '#4d151a',
    '#380f13',
    '#240a0c',
    '#0f0405',
  ],
  orange: [
    '#f18f01',
    '#da8201',
    '#c47401',
    '#ad6701',
    '#975901',
    '#804c01',
    '#693f00',
    '#533100',
    '#3c2400',
    '#261600',
    '#0f0900',
  ],
  pink: [
    '#e6bccd',
    '#d1aaba',
    '#bb99a7',
    '#a68793',
    '#907680',
    '#7b646d',
    '#65525a',
    '#504147',
    '#3a2f33',
    '#251e20',
    '#0f0c0d',
  ],
  blue: [
    '#17bebb',
    '#15adaa',
    '#139c99',
    '#118b89',
    '#0f7a78',
    '#0d6967',
    '#0a5756',
    '#084645',
    '#063535',
    '#042424',
    '#021313',
  ],
  sky: [
    '#A3E7FC',
    '#94d1e5',
    '#84bccd',
    '#75a6b5',
    '#66919e',
    '#577b87',
    '#47656f',
    '#385058',
    '#293a40',
    '#192529',
    '#0a0f11',
  ],
} as const;

type HexaDecimal = string;

const isHexa = (s: string): s is HexaDecimal => {
  return s.length === 6 || (s.length === 7 && s.slice(0, 1) === '#');
};

export const fade = (c: HexaDecimal, alpha: number) => {
  return `${c}${Math.round(alpha * 255)
    .toString(16)
    .padStart(2, '0')}`;
};

export const mix = (c1: HexaDecimal, c2: HexaDecimal, weight: number = 50) => {
  const color1 = c1.slice(1);
  const color2 = c2.slice(1);
  if (!isHexa(color1) || !isHexa(color2)) {
    throw new Error('Pass Hexadecimal values only');
  }
  function d2h(d: number) {
    return d.toString(16);
  } // convert a decimal value to hex
  function h2d(h: string) {
    return parseInt(h, 16);
  } // convert a hex value to decimal

  let color = '#';
  for (let i = 0; i <= 5; i += 2) {
    // loop through each of the 3 hex pairs—red, green, and blue
    const v1 = h2d(color1.substr(i, 2)); // extract the current pairs
    const v2 = h2d(color2.substr(i, 2));
    // combine the current pairs from each source color, according to the specified weight
    let val = d2h(Math.floor(v2 + (v1 - v2) * (weight / 100.0)));

    while (val.length < 2) {
      val = '0' + val;
    } // prepend a '0' if val results in a single digit

    color += val; // concatenate val to our new color string
  }

  return color; // PROFIT!
};
