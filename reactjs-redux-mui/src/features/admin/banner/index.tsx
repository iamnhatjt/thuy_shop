import React from "react";
import BannerTable from "./components/BannerTable";
import { Box, Button, Stack } from "@mui/material";
import { useAdminBanner } from "../../../store/banner/selectors";
import BannerAddingPopup from "./components/BannerAddingPopup";

const AdminBanner: React.FC = () => {
  const { onToggleOpenBanner } = useAdminBanner();

  return (
    <>
      <Stack direction="row" alignItems="center" justifyContent="end">
        <Button variant="contained" onClick={() => onToggleOpenBanner(true)}>
          New Banner
        </Button>
      </Stack>
      <BannerTable />
      {/**
       * Popup
       */}
      <BannerAddingPopup />
    </>
  );
};

export default React.memo(AdminBanner);
