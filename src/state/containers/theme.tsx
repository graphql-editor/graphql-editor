import { createContainer } from 'unstated-next';
import { useState } from 'react';
import { DarkTheme, EditorTheme } from '@/Theming/DarkTheme';
const useThemeContainer = createContainer((theme: EditorTheme = DarkTheme) => {
  const [currentTheme, setCurrentTheme] = useState(theme);
  return {
    theme: currentTheme,
    setTheme: setCurrentTheme,
  };
});

export const useTheme = useThemeContainer.useContainer;
export const ThemeProvider = useThemeContainer.Provider;
