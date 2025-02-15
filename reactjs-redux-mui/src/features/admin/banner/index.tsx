import React from "react";
import BannerTable from "./components/BannerTable";

const AdminBanner: React.FC = () => {
  return (
    <>
      <BannerTable />
    </>
  );
};

export default React.memo(AdminBanner);
