import { Stack } from "@mui/material";
import React from "react";
import TopHotline from "./componets/TopHotline";
import ResponsiveNavbar from "./componets/ResponsiveNavBar";

const Header: React.FC = () => {
  return (
    <Stack>
      <TopHotline />
      <ResponsiveNavbar />

      {/*<Stack*/}
      {/*  height={HEADER_HEIGHT}*/}
      {/*  borderBottom="1px solid"*/}
      {/*  borderColor="gray.100"*/}
      {/*  bgcolor="Backgroud.paper"*/}
      {/*  direction="row"*/}
      {/*  alignItems="center"*/}
      {/*  justifyContent="space-between"*/}
      {/*  px={{ xs: 2, md: 3 }}*/}
      {/*  width="100%"*/}
      {/*>*/}
      {/*  <Link to={HOME_PATH}>"Home logo"</Link>*/}

      {/*  <Stack*/}
      {/*    direction="row"*/}
      {/*    alignItems="center"*/}
      {/*    justifyContent="end"*/}
      {/*    spacing={0.5}*/}
      {/*    overflow="hidden"*/}
      {/*    flex={1}*/}
      {/*  >*/}
      {/*    <Stack direction="row" alignItems="center" spacing={2}>*/}
      {/*      <SwitchLanguage />*/}
      {/*      <SwitchTheme />*/}
      {/*    </Stack>*/}
      {/*  </Stack>*/}
      {/*</Stack>*/}
    </Stack>
  );
};

export default React.memo(Header);

export const HEADER_HEIGHT = 50;
