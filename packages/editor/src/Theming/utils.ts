import { EditorTheme } from '@/gshared/theme/MainTheme';

export const themed = <T>(fn: (theme: EditorTheme) => T) => fn;
