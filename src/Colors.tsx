export const Colors = {
  grey: [
    '#FFFFFF',
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
  main: ['#FF59C5', '#E550B1', '#CC479E', '#B23E8A', '#993676', '#802D62', '#66244F', '#4D1B3B', '#331227', '#1A0914'],
  green: ['#30FFC8', '#2CE6B4', '#27CCA0', '#22B38C', '#188064', '#0F4D3C', '#0A3328'],
  yellow: ['#FED531', '#E6C02C', '#CCAB27', '#B39622', '#806B18', '#4D400F', '#332B0A'],
  red: ['#FF306B', '#E62C60', '#CC2756', '#B3224B', '#801835', '#4D0F20', '#330A15'],
  blue: ['#30C1FF', '#2BAEE5', '#269ACC', '#2287B3', '#1D7499', '#186080', '#134D66', '#0E3A4D'],
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
