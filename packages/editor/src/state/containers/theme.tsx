import { createContainer } from "unstated-next";
import { useState } from "react";
import { EditorTheme, MainTheme } from "@/gshared/theme/MainTheme";
import { themeColors } from "@aexol-studio/styling-system";
const useThemeContainer = createContainer(
  (
    theme: EditorTheme = {
      ...MainTheme,
      ...themeColors("graphqleditor", "dark"),
    }
  ) => {
    const [currentTheme, setCurrentTheme] = useState(theme);
    return {
      theme: currentTheme,
      setTheme: setCurrentTheme,
    };
  }
);

export const useTheme = useThemeContainer.useContainer;
export const ThemeProvider = useThemeContainer.Provider;
