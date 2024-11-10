import { ThemeMode } from "../constant/enums";
import { clientStorage } from "./storage";
import { DARK_THEME_MEDIA_SYSTEM } from "../constant";

export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const debounce = <F extends (...args: Parameters<F>) => ReturnType<F>>(
  func: F,
  waitFor: number,
) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<F>): void => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), waitFor);
  };
};

export const getTheme = (key: string, fallback: ThemeMode): ThemeMode => {
  if (typeof window === "undefined") return fallback;

  try {
    const theme = (clientStorage.get(key) as ThemeMode) || getThemeSystem();
    return theme || fallback;
  } catch (error) {
    console.error(error);
  }
  return fallback;
};

export const getThemeSystem = (e?: MediaQueryList): ThemeMode => {
  if (!e) {
    e = window.matchMedia(DARK_THEME_MEDIA_SYSTEM);
  }
  const isDark = e.matches;
  const ThemeSystem = isDark ? ThemeMode.DARK : ThemeMode.LIGHT;
  return ThemeSystem;
};
