import React from "react";
import BannerTable from "./components/BannerTable";
import { Button } from "@mui/material";
import { useAdminBanner } from "../../../store/banner/selectors";
import BannerAddingPopup from "./components/BannerAddingPopup";

const AdminBanner: React.FC = () => {
  const { onToggleOpenBanner } = useAdminBanner();

  return (
    <>
      <Button variant="contained" onClick={() => onToggleOpenBanner(true)}>
        New Banner
      </Button>
      <BannerTable />
      {/*  Popup*/}
      <BannerAddingPopup />
    </>
  );
};

export default React.memo(AdminBanner);
