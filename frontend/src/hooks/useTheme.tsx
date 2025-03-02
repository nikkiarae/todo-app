"use client";

import {
  FC,
  ReactNode,
  useEffect,
  useState,
  createContext,
  useContext,
  useMemo,
} from "react";
import {
  ThemeProvider as MuiThemeProvider,
  CssBaseline,
  Theme,
  PaletteMode,
  createTheme,
  responsiveFontSizes,
} from "@mui/material";
import commonStyles from "@/styles/common";
import { CustomPalette } from "@/types/general";

interface ThemeContextProps {
  mode: PaletteMode;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
  palette: CustomPalette;
}

export const ThemeProvider: FC<ThemeProviderProps> = ({
  children,
  palette,
}) => {
  const [mode, setMode] = useState<PaletteMode>("light");

  const createThemeWithMode = (mode: PaletteMode): Theme => {
    return createTheme({
      palette: {
        ...(mode === "dark" ? palette.dark : palette.light),
        mode,
      },
      ...commonStyles,
    });
  };

  // Use `useMemo` to optimize theme creation
  const theme = useMemo(() => {
    return responsiveFontSizes(createThemeWithMode(mode));
  }, [mode, palette]);

  const toggleTheme = () => {
    const newMode = mode === "light" ? "dark" : "light";
    setMode(newMode);
  };

  useEffect(() => {
    const matchMedia = window.matchMedia("(prefers-color-scheme: dark)");
    setMode(matchMedia.matches ? "dark" : "light");

    const handleChange = (e: MediaQueryListEvent) => {
      const newMode = e.matches ? "dark" : "light";
      setMode(newMode);
    };

    matchMedia.addEventListener("change", handleChange);
    return () => matchMedia.removeEventListener("change", handleChange);
  }, []);

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextProps => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeMode must be used within a ThemeProvider");
  }
  return context;
};
