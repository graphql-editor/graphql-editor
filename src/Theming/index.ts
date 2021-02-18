import { Colors } from '@/Colors';
import { NestedCSSProperties } from 'typestyle/lib/types';

type ThemeType<T extends keyof NestedCSSProperties> = Required<
  Pick<NestedCSSProperties, T>
> &
  Omit<NestedCSSProperties, T>;

export interface ThemeDefinition {
  ErrorContainer: ThemeType<'color' | 'background' | 'border'>;
  Sidebar: ThemeType<'background'>;
}

export const MainTheme: ThemeDefinition = {
  ErrorContainer: {
    color: Colors.pink[0],
    background: `${Colors.red[6]}ee`,
    border: `1px solid ${Colors.red[0]}`,
  },
  Sidebar: { background: Colors.grey[8] },
};
