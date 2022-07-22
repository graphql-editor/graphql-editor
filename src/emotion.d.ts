import { EditorTheme } from './gshared/theme/DarkTheme';

import '@emotion/react';

declare module '@emotion/react' {
  export interface Theme extends EditorTheme {}
}
