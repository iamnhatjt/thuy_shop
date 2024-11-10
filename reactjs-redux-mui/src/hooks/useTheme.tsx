import { useColorScheme, useTheme as useMuiTheme } from "@mui/material";
import { ThemeMode } from "../constant/enums";
const useTheme = () => {
  const theme = useMuiTheme();
  const { mode, setMode } = useColorScheme();

  return {
    ...theme,
    isDarkMode: mode === ThemeMode.DARK,
    mode,
    setMode,
  };
};

export default useTheme;
