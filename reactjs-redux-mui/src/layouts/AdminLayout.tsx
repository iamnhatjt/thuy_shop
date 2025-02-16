import AdminDrawer from "./Header/componets/AdminDrawer";
import { Box, Stack } from "@mui/material";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <Stack direction="row">
      <AdminDrawer />
      <Box
        sx={{
          marginLeft: "240px",
          width: "100%",
        }}
      >
        <Outlet />
      </Box>
    </Stack>
  );
};

export default AdminLayout;
