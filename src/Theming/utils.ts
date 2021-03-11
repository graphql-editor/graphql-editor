import { EditorTheme } from '@/Theming/model';

export const themed = <T>(fn: (theme: EditorTheme) => T) => fn;
