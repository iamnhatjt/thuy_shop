import AdminDrawer, { SIDEBAR_WIDTH } from "./Header/componets/AdminDrawer";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#f5f7fb" }}>
      <AdminDrawer />
      <Box
        component="main"
        sx={{
          ml: `${SIDEBAR_WIDTH}px`,
          width: `calc(100% - ${SIDEBAR_WIDTH}px)`,
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default AdminLayout;
