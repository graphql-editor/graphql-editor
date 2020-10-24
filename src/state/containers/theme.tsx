import { createContainer } from 'unstated-next';
import { useState } from 'react';
import { ThemeDefinition, MainTheme } from '@/Theming';
import { style } from 'typestyle';

const useThemesStateContainer = createContainer(() => {
  const [theme, setTheme] = useState<ThemeDefinition>(MainTheme);
  const themed = (themeKey: keyof ThemeDefinition) => (className: string) =>
    [className, style(theme[themeKey])].join(' ');
  return { theme, setTheme, themed };
});

export const useTheme = useThemesStateContainer.useContainer;
export const ThemeProvider = useThemesStateContainer.Provider;
