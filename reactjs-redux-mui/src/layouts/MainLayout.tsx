import { Stack, Snackbar } from "@mui/material";
import SideBar from "./sharedComponents/SideBar";
import { memo } from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <Stack
      direction="row"
      width="100vw"
      height="100vh"
      flex={1}
      overflow="hidden"
    >
      <SideBar />
      <Stack flex={1} width="100%" height="100%" overflow="hidden">
        <Header />
        <Stack flex={1} spacing={{ xs: 1.5, sm: 3 }} sx={{ overflow: "auto" }}>
          <Outlet />
        </Stack>
      </Stack>
      <Snackbar />
    </Stack>
  );
};

export default memo(MainLayout);
