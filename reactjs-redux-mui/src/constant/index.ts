import { ThemeMode } from "./enums";

export const ACCESS_TOKEN_STORAGE_KEY = "aT";
export const REFRESH_TOKEN_STORAGE_KEY = "rT";
export const LANGUAGE_STORAGE_KEY = "language";
export const DEFAULT_MODE = ThemeMode.LIGHT;
export const DARK_THEME_MEDIA_SYSTEM = "(prefers-color-scheme: dark)";

export const API_TIMEOUT = 30_000; //s
export const AN_ERROR_TRY_RELOAD_PAGE = "error.anErrorTryReload";
export const API_URL = process.env.REACT_APP_API_URL as string;

export const HOT_LINE = process.env.REACT_APP_HOT_LINE as string;
