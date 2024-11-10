import {
  Experimental_CssVarsProvider as CssVarsProvider,
  experimental_extendTheme as extendTheme,
  getInitColorSchemeScript,
} from "@mui/material/styles";
import colorSchemes from "../utils/colorSchemes";
import React from "react";
import { DEFAULT_MODE } from "../constant";
import { CssBaseline } from "@mui/material";
import { getTheme } from "../utils";
import { ThemeMode } from "../constant/enums";

type ThemeProviderProps = {
  children: React.ReactNode;
};

const theme = extendTheme({
  colorSchemes,
});

const THEME_KEY = "app_mode";

const ThemeProvider = (props: ThemeProviderProps) => {
  const { children } = props;

  getInitColorSchemeScript({
    defaultMode: getTheme(THEME_KEY, ThemeMode.LIGHT),
    modeStorageKey: THEME_KEY,
  });

  return (
    <CssVarsProvider theme={theme} defaultMode={DEFAULT_MODE}>
      <CssBaseline />
      {children}
    </CssVarsProvider>
  );
};

export default ThemeProvider;
