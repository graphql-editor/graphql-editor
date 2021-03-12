import { EditorTheme } from '@/Theming/DarkTheme';

export const themed = <T>(fn: (theme: EditorTheme) => T) => fn;
