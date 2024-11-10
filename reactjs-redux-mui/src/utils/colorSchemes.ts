import { ThemeMode } from "../constant/enums";

const lightColor = "47, 43, 61";
const darkColor = "208, 212, 241";

const colorSchemes = {
  [ThemeMode.LIGHT]: {
    palette: {
      common: {
        black: "#000000",
        white: "#FFFFFF",
      },
      primary: {
        main: "#2d2e7f", // OK
        light: "#E1F0FF", // OK
        dark: "#187DE4", // OK
        contrastText: "#FFFFFF",
      },
      secondary: {
        main: "#1BC5BD", // OK
        light: "#C9F7F5", // OK
        dark: "#0BB7AF", // OK
        contrastText: "#FFFFFF",
      },
      error: {
        main: "#EA5455", // OK
        light: "#FFE2E5", // OK
        dark: "#EE2D41", // OK
        contrastText: "#FFFFFF",
      },
      warning: {
        main: "#FFA800", // OK
        light: "#FFF4DE", // OK
        dark: "#EE9D01", // OK
        contrastText: "#FFFFFF",
      },
      info: {
        main: "#666666", // OK
        light: "#ECECF3", // OK
        dark: "#80808F", // OK
        contrastText: "#FFFFFF",
      },
      success: {
        main: "#0BB783", // OK
        light: "#D7F9EF", // OK
        dark: "#04AA77", // OK
        contrastText: "#FFFFFF",
      },
      positive: {
        main: "#6993FF",
        light: "#E1E9FF",
      },
      purple: {
        main: "#8950FC",
        light: "#EEE5FF",
      },
      blue: {
        light: "#E1F0FF",
      },
      grey: {
        50: "#F7F7FD", // OK
        100: "#ECECF3", // OK
        200: "#ECF0F3",
        300: "#999999", // OK
        400: "#666666", // OK
        500: "#B5B5C3",
        600: "#80808F",
        700: "#464E5F",
        800: "#1B283F",
        900: "#212121", // OK
        A100: "#F5F5F5",
        A200: "#BABCC6",
        A400: "#BDBDBD",
        A700: "#616161",
      },
      text: {
        primary: `rgba(${lightColor}, 0.78)`, // OK
        secondary: "rgba(0, 0, 0, .06)",
        disabled: "rgba(0, 0, 0, .38)",
      },
      divider: "rgba(0, 0, 0, .12)",
      background: {
        paper: "#FFFFFF",
        default: "#F7F7FD",
      },
      customColor: {
        main: darkColor,
      },
    },
  },
  [ThemeMode.DARK]: {
    palette: {
      common: {
        black: "#000000",
        white: "#FFFFFF",
      },
      primary: {
        main: "#3699FF", // OK
        light: "#E1F0FF", // OK
        dark: "#187DE4", // OK
        contrastText: "rgba(0, 0, 0, .87)",
      },
      secondary: {
        main: "#1BC5BD", // OK
        light: "#C9F7F5", // OK
        dark: "#0BB7AF", // OK
        contrastText: "rgba(0, 0, 0, .87)",
      },
      error: {
        main: "#F64E60", // OK
        light: "#FFE2E5", // OK
        dark: "#EE2D41", // OK
        contrastText: "rgba(0, 0, 0, .87)",
      },
      warning: {
        main: "#FFA800", // OK
        light: "#FFF4DE", // OK
        dark: "#EE9D01", // OK
        contrastText: "rgba(0, 0, 0, .87)",
      },
      info: {
        main: "#666666", // OK
        light: "#ECECF3", // OK
        dark: "#80808F", // OK
        contrastText: "rgba(0, 0, 0, .87)",
      },
      success: {
        main: "#0BB783", // OK
        light: "#D7F9EF", // OK
        dark: "#04AA77", // OK
        contrastText: "rgba(0, 0, 0, .87)",
      },
      purple: {
        main: "#8950FC",
        light: "#EEE5FF",
      },
      grey: {
        50: "#1E1E1E", // OK
        100: "#504e4e", // OK
        200: "#ECF0F3",
        300: "#D6D6D6", // OK
        400: "#cfcfcf",
        500: "#B5B5C3",
        600: "#80808F",
        700: "#464E5F",
        800: "#1B283F",
        900: "#FFFFFF", // OK
        A100: "#F5F5F5",
        A200: "#dcdde2", // ok
        A400: "#BDBDBD",
        A700: "#616161",
      },
      text: {
        primary: `rgba(${darkColor}, 0.78)`, // OK
        secondary: "rgba(255, 255, 255, .7)",
        disabled: "rgba(255, 255, 255, .5)",
      },
      background: {
        paper: "#313130",
        default: "#3B3A39",
      },
      customColor: {
        main: darkColor,
      },
    },
  },
};

export default colorSchemes;
