export const Colors = {
  grey: "#F3F3F4",
  main: "#d966ff",
  green: "#acf7c1",
  yellow: "#cfee9e",
  red: "#de3c4b",
  orange: "#f18f01",
  pink: "#e6bccd",
  blue: "#17bebb",
  sky: "#A3E7FC",
} as const;

type HexaDecimal = string;

const isHexa = (s: string): s is HexaDecimal => {
  return s.length === 6 || (s.length === 7 && s.slice(0, 1) === "#");
};

export const fade = (c: HexaDecimal, alpha: number) => {
  return `${c}${Math.round(alpha * 255)
    .toString(16)
    .padStart(2, "0")}`;
};

export const mix = (c1: HexaDecimal, c2: HexaDecimal, weight = 50) => {
  const color1 = c1.slice(1);
  const color2 = c2.slice(1);
  if (!isHexa(color1) || !isHexa(color2)) {
    throw new Error("Pass Hexadecimal values only");
  }
  function d2h(d: number) {
    return d.toString(16);
  } // convert a decimal value to hex
  function h2d(h: string) {
    return parseInt(h, 16);
  } // convert a hex value to decimal

  let color = "#";
  for (let i = 0; i <= 5; i += 2) {
    // loop through each of the 3 hex pairs—red, green, and blue
    const v1 = h2d(color1.substr(i, 2)); // extract the current pairs
    const v2 = h2d(color2.substr(i, 2));
    // combine the current pairs from each source color, according to the specified weight
    let val = d2h(Math.floor(v2 + (v1 - v2) * (weight / 100.0)));

    while (val.length < 2) {
      val = "0" + val;
    } // prepend a '0' if val results in a single digit

    color += val; // concatenate val to our new color string
  }

  return color; // PROFIT!
};
