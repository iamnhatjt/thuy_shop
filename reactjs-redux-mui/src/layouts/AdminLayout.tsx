import AdminDrawer from "./Header/componets/AdminDrawer";
import { Stack } from "@mui/material";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <Stack direction="row">
      <AdminDrawer />
      <Outlet />
    </Stack>
  );
};

export default AdminLayout;
