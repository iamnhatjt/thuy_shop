import React, { useState } from "react";
import BannerTable from "./components/BannerTable";
import { Button } from "@mui/material";
import { useAddBannerMutation } from "../../../store/banner/bannerApiSlice";
import { useAdminBanner } from "../../../store/banner/selectors";
import BannerAddingPopup from "./components/BannerAddingPopup";

const AdminBanner: React.FC = () => {
  const [addbanner] = useAddBannerMutation();
  const [file, setFile] = useState<any>();

  const { isOpenAddingPopup, onAddingBanner, onToggleOpenBanner } =
    useAdminBanner();

  return (
    <>
      <Button variant="contained" onClick={() => onToggleOpenBanner(true)}>
        Adding
      </Button>
      <BannerTable />
      {/*  Popup*/}
      <BannerAddingPopup />
    </>
  );
};

export default React.memo(AdminBanner);
