import { Stack } from "@mui/material";
import Drawer from "./componets/Drawer";
import React from "react";
import { Link } from "react-router-dom";
import { HOME_PATH } from "../../constant/paths";
import SwitchLanguage from "./componets/SwitchLanguage";
import SwitchTheme from "./componets/SwitchTheme";

const Header = () => {
  return (
    <Stack
      height={HEADER_HEIGHT}
      borderBottom="1px solid"
      borderColor="gray.100"
      bgcolor="Background.paper"
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      px={{ xs: 2, md: 3 }}
      width="100%"
    >
      <Link to={HOME_PATH}>"Home logo"</Link>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="end"
        spacing={0.5}
        overflow="hidden"
        flex={1}
      >
        <Stack direction="row" alignItems="center" spacing={2}>
          <SwitchLanguage />
          <SwitchTheme />
        </Stack>
      </Stack>
      <Drawer />
    </Stack>
  );
};

export default React.memo(Header);

export const HEADER_HEIGHT = 50;
