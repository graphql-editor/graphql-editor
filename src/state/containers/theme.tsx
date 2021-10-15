import { createContainer } from 'unstated-next';
import { useState } from 'react';
import { EditorTheme } from '@/gshared/theme/DarkTheme';
import { DarkTheme } from '@/index';
const useThemeContainer = createContainer((theme: EditorTheme = DarkTheme) => {
  const [currentTheme, setCurrentTheme] = useState(theme);
  return {
    theme: currentTheme,
    setTheme: setCurrentTheme,
  };
});

export const useTheme = useThemeContainer.useContainer;
export const ThemeProvider = useThemeContainer.Provider;
