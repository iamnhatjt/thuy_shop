import { ComponentPreview, Previews } from "@react-buddy/ide-toolbox";
import { PaletteTree } from "./palette";
import Banner from "../features/client/home/components/Banner";
import Drawer from "../layouts/Header/componets/Drawer";
import AdminDrawer from "../layouts/Header/componets/AdminDrawer";
import Signin from "../features/client/Signin";
import React from "react";
import BannerTable from "../features/admin/banner/components/BannerTable";

const ComponentPreviews: React.FC = () => {
  return (
    <Previews palette={<PaletteTree />}>
      <ComponentPreview path="/Banner">
        <Banner />
      </ComponentPreview>
      <ComponentPreview path="/Drawer">
        <Drawer />
      </ComponentPreview>
      <ComponentPreview path="/AdminDrawer">
        <AdminDrawer />
      </ComponentPreview>
      <ComponentPreview path="/Signin">
        <Signin />
      </ComponentPreview>
      <ComponentPreview path="/BannerTable">
        <BannerTable />
      </ComponentPreview>
    </Previews>
  );
};

export default ComponentPreviews;
