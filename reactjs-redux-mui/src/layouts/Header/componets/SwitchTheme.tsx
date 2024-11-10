import { ThemeMode } from "../../../constant/enums";
import { IconButton } from "@mui/material";
import MoonIcon from "../../../icons/MoonIcon";
import SunIcon from "../../../icons/SunIcon";
import { memo } from "react";
import useTheme from "../../../hooks/useTheme";

const SwitchTheme = () => {
  const { isDarkMode, setMode } = useTheme();

  const onToggleMode = () => {
    setMode(isDarkMode ? ThemeMode.LIGHT : ThemeMode.DARK);
  };

  return (
    <IconButton onClick={onToggleMode}>
      {isDarkMode ? (
        <MoonIcon sx={{ color: "common.white" }} />
      ) : (
        <SunIcon sx={{ color: "common.black" }} />
      )}
    </IconButton>
  );
};

export default memo(SwitchTheme);
