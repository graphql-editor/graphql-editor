import { EditorTheme } from '@/gshared/theme/DarkTheme';

export const themed = <T>(fn: (theme: EditorTheme) => T) => fn;
