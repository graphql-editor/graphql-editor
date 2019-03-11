import { style, classes } from 'typestyle';

const defaultIcon = style({
  $nest: {
    '&::before': {
      fontFamily: 'untitled-font-1',
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontVariant: 'normal',
      textTransform: 'none',
      textDecoration: 'none',
      lineHeight: 1,
      verticalAlign:'middle'
    }
  }
  // "-webkit-font-smoothing": "antialiased",
  // "-moz-osx-font-smoothing": "grayscale"
});
export const lC = classes(defaultIcon, style({ $nest: { '&:before': { content: `"\\61"` } } }));
export const rC = classes(defaultIcon, style({ $nest: { '&:before': { content: `"\\62"` } } }));
export const accept = classes(defaultIcon, style({ $nest: { '&:before': { content: `"\\63"` } } }));
export const add = classes(defaultIcon, style({ $nest: { '&:before': { content: `"\\64"` } } }));
export const arrowDown = classes(
  defaultIcon,
  style({ $nest: { '&:before': { content: `"\\65"` } } })
);
export const arrowRight = classes(
  defaultIcon,
  style({ $nest: { '&:before': { content: `"\\66"` } } })
);
export const arrowLeft = classes(
  defaultIcon,
  style({ $nest: { '&:before': { content: `"\\67"` } } })
);
export const arrowUp = classes(
  defaultIcon,
  style({ $nest: { '&:before': { content: `"\\68"` } } })
);
export const bell = classes(defaultIcon, style({ $nest: { '&:before': { content: `"\\69"` } } }));
export const bolt = classes(defaultIcon, style({ $nest: { '&:before': { content: `"\\6a"` } } }));
export const burger = classes(defaultIcon, style({ $nest: { '&:before': { content: `"\\6b"` } } }));
export const calendar = classes(
  defaultIcon,
  style({ $nest: { '&:before': { content: `"\\6c"` } } })
);
export const cart = classes(defaultIcon, style({ $nest: { '&:before': { content: `"\\6d"` } } }));
export const center = classes(defaultIcon, style({ $nest: { '&:before': { content: `"\\6e"` } } }));
export const cheese = classes(defaultIcon, style({ $nest: { '&:before': { content: `"\\6f"` } } }));
export const clock = classes(defaultIcon, style({ $nest: { '&:before': { content: `"\\70"` } } }));
export const close = classes(defaultIcon, style({ $nest: { '&:before': { content: `"\\71"` } } }));
export const cloud = classes(defaultIcon, style({ $nest: { '&:before': { content: `"\\72"` } } }));
export const comment = classes(
  defaultIcon,
  style({ $nest: { '&:before': { content: `"\\73"` } } })
);
export const creditCard = classes(
  defaultIcon,
  style({ $nest: { '&:before': { content: `"\\74"` } } })
);
export const crop = classes(defaultIcon, style({ $nest: { '&:before': { content: `"\\75"` } } }));
export const cut = classes(defaultIcon, style({ $nest: { '&:before': { content: `"\\76"` } } }));
export const remove = classes(defaultIcon, style({ $nest: { '&:before': { content: `"\\77"` } } }));
export const disk = classes(defaultIcon, style({ $nest: { '&:before': { content: `"\\78"` } } }));
export const docs = classes(defaultIcon, style({ $nest: { '&:before': { content: `"\\79"` } } }));
export const drink = classes(defaultIcon, style({ $nest: { '&:before': { content: `"\\7a"` } } }));
export const drink2 = classes(defaultIcon, style({ $nest: { '&:before': { content: `"\\41"` } } }));
export const edit = classes(defaultIcon, style({ $nest: { '&:before': { content: `"\\42"` } } }));
export const examples = classes(
  defaultIcon,
  style({ $nest: { '&:before': { content: `"\\43"` } } })
);
export const flag = classes(defaultIcon, style({ $nest: { '&:before': { content: `"\\44"` } } }));
export const folder = classes(defaultIcon, style({ $nest: { '&:before': { content: `"\\45"` } } }));
export const fork = classes(defaultIcon, style({ $nest: { '&:before': { content: `"\\46"` } } }));
export const gauge = classes(defaultIcon, style({ $nest: { '&:before': { content: `"\\47"` } } }));
export const heart = classes(defaultIcon, style({ $nest: { '&:before': { content: `"\\48"` } } }));
export const home = classes(defaultIcon, style({ $nest: { '&:before': { content: `"\\49"` } } }));
export const idea = classes(defaultIcon, style({ $nest: { '&:before': { content: `"\\4a"` } } }));
export const left = classes(defaultIcon, style({ $nest: { '&:before': { content: `"\\4b"` } } }));
export const link = classes(defaultIcon, style({ $nest: { '&:before': { content: `"\\4c"` } } }));
export const load = classes(defaultIcon, style({ $nest: { '&:before': { content: `"\\4d"` } } }));
export const login = classes(defaultIcon, style({ $nest: { '&:before': { content: `"\\4e"` } } }));
export const logout = classes(defaultIcon, style({ $nest: { '&:before': { content: `"\\4f"` } } }));
export const mail = classes(defaultIcon, style({ $nest: { '&:before': { content: `"\\50"` } } }));
export const map = classes(defaultIcon, style({ $nest: { '&:before': { content: `"\\51"` } } }));
export const menu = classes(defaultIcon, style({ $nest: { '&:before': { content: `"\\52"` } } }));
export const mic = classes(defaultIcon, style({ $nest: { '&:before': { content: `"\\53"` } } }));
export const moon = classes(defaultIcon, style({ $nest: { '&:before': { content: `"\\54"` } } }));
export const more = classes(defaultIcon, style({ $nest: { '&:before': { content: `"\\55"` } } }));
export const newFile = classes(
  defaultIcon,
  style({ $nest: { '&:before': { content: `"\\56"` } } })
);
export const newsquare = classes(
  defaultIcon,
  style({ $nest: { '&:before': { content: `"\\57"` } } })
);
export const photo = classes(defaultIcon, style({ $nest: { '&:before': { content: `"\\58"` } } }));
export const picture = classes(
  defaultIcon,
  style({ $nest: { '&:before': { content: `"\\59"` } } })
);
export const pin = classes(defaultIcon, style({ $nest: { '&:before': { content: `"\\5a"` } } }));
export const print = classes(defaultIcon, style({ $nest: { '&:before': { content: `"\\30"` } } }));
export const refresh = classes(
  defaultIcon,
  style({ $nest: { '&:before': { content: `"\\31"` } } })
);
export const right = classes(defaultIcon, style({ $nest: { '&:before': { content: `"\\32"` } } }));
export const save = classes(defaultIcon, style({ $nest: { '&:before': { content: `"\\33"` } } }));
export const search = classes(defaultIcon, style({ $nest: { '&:before': { content: `"\\34"` } } }));
export const send = classes(defaultIcon, style({ $nest: { '&:before': { content: `"\\35"` } } }));
export const sliders = classes(
  defaultIcon,
  style({ $nest: { '&:before': { content: `"\\36"` } } })
);
export const sliders2 = classes(
  defaultIcon,
  style({ $nest: { '&:before': { content: `"\\37"` } } })
);
export const sound = classes(defaultIcon, style({ $nest: { '&:before': { content: `"\\38"` } } }));
export const star = classes(defaultIcon, style({ $nest: { '&:before': { content: `"\\39"` } } }));
export const sub = classes(defaultIcon, style({ $nest: { '&:before': { content: `"\\21"` } } }));
export const sun = classes(defaultIcon, style({ $nest: { '&:before': { content: `"\\22"` } } }));
export const tag = classes(defaultIcon, style({ $nest: { '&:before': { content: `"\\23"` } } }));
export const terminal = classes(
  defaultIcon,
  style({ $nest: { '&:before': { content: `"\\24"` } } })
);
export const thunder = classes(
  defaultIcon,
  style({ $nest: { '&:before': { content: `"\\25"` } } })
);
export const tipi = classes(defaultIcon, style({ $nest: { '&:before': { content: `"\\26"` } } }));
export const tree = classes(defaultIcon, style({ $nest: { '&:before': { content: `"\\27"` } } }));
export const user = classes(defaultIcon, style({ $nest: { '&:before': { content: `"\\28"` } } }));
export const wallet = classes(defaultIcon, style({ $nest: { '&:before': { content: `"\\29"` } } }));
export const wine = classes(defaultIcon, style({ $nest: { '&:before': { content: `"\\2a"` } } }));
