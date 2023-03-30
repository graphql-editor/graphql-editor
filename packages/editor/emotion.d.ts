import { EditorTheme } from './src/gshared/theme/MainTheme';

import '@emotion/react';

declare module '@emotion/react' {
  export interface Theme extends EditorTheme {}
}
