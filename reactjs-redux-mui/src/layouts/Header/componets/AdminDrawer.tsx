import {
  Box,
  Drawer,
  drawerClasses,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
  Badge,
  Avatar,
  IconButton,
  Stack,
} from "@mui/material";
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Dashboard,
  Category,
  ShoppingCart,
  People,
  BarChart,
  Settings,
  Security,
  Logout,
  Bed,
  Image,
} from "@mui/icons-material";
import {
  ADMIN_BANNER_PATH,
  ADMIN_CATEGORY_PATH,
} from "../../../constant/paths";
import { useAuth } from "../../../store/app/selectors";
import { useAppDispatch } from "../../../store/hooks";
import { clearAuth } from "../../../store/app/reducers";

const SIDEBAR_WIDTH = 260;

interface NavItemConfig {
  label: string;
  icon: React.ReactElement;
  path: string;
  badge?: number;
}

const mainNavItems: NavItemConfig[] = [
  { label: "Dashboard", icon: <Dashboard />, path: "/admin" },
  { label: "Categories", icon: <Category />, path: ADMIN_CATEGORY_PATH },
  { label: "Banners", icon: <Image />, path: ADMIN_BANNER_PATH },
  { label: "Orders", icon: <ShoppingCart />, path: "/admin/orders", badge: 12 },
  { label: "Customers", icon: <People />, path: "/admin/customers" },
  { label: "Analytics", icon: <BarChart />, path: "/admin/analytics" },
];

const settingsNavItems: NavItemConfig[] = [
  { label: "General", icon: <Settings />, path: "/admin/settings" },
  { label: "Security", icon: <Security />, path: "/admin/security" },
];

const AdminDrawer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(clearAuth());
    navigate("/admin/login", { replace: true });
  };

  const isActive = (path: string) => location.pathname === path;

  const renderNavItem = (item: NavItemConfig) => {
    const active = isActive(item.path);
    return (
      <ListItemButton
        key={item.path}
        onClick={() => navigate(item.path)}
        sx={{
          borderRadius: "10px",
          mb: 0.5,
          py: 1,
          px: 1.5,
          bgcolor: active ? "#135bec" : "transparent",
          color: active ? "#fff" : "#4a5568",
          "&:hover": {
            bgcolor: active ? "#0e44b3" : "#f0f4ff",
          },
          transition: "all 0.15s ease",
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: 36,
            color: active ? "#fff" : "#6b7280",
          }}
        >
          {item.icon}
        </ListItemIcon>
        <ListItemText
          primary={item.label}
          primaryTypographyProps={{
            fontWeight: active ? 700 : 500,
            fontSize: "14px",
          }}
        />
        {item.badge && (
          <Badge
            badgeContent={item.badge}
            color="primary"
            sx={{
              "& .MuiBadge-badge": {
                bgcolor: active ? "#fff" : "#135bec",
                color: active ? "#135bec" : "#fff",
                fontWeight: 700,
                fontSize: "11px",
              },
            }}
          />
        )}
      </ListItemButton>
    );
  };

  return (
    <Drawer
      anchor="left"
      variant="permanent"
      open={true}
      sx={{
        [`& .${drawerClasses.paper}`]: {
          width: `${SIDEBAR_WIDTH}px`,
          bgcolor: "#fff",
          borderRight: "1px solid #e7ebf3",
          backgroundImage: "none",
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      {/* Logo */}
      <Box sx={{ px: 2.5, py: 2.5 }}>
        <Stack direction="row" alignItems="center" spacing={1.5}>
          <Box
            sx={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              bgcolor: "#135bec",
            }}
          />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Bed sx={{ fontSize: 22, color: "#135bec" }} />
            <Typography fontWeight={800} fontSize="16px" color="#0d121b">
              ThuyShop Admin
            </Typography>
          </Box>
        </Stack>
      </Box>

      {/* Main Navigation */}
      <Box sx={{ px: 1.5, flex: 1 }}>
        <List disablePadding>
          {mainNavItems.map(renderNavItem)}
        </List>

        <Typography
          variant="caption"
          fontWeight={700}
          color="#9ca3af"
          sx={{ px: 1.5, pt: 3, pb: 1, display: "block", letterSpacing: "1px" }}
        >
          SETTINGS
        </Typography>

        <List disablePadding>
          {settingsNavItems.map(renderNavItem)}
        </List>
      </Box>

      {/* User Profile */}
      <Box sx={{ p: 2, borderTop: "1px solid #e7ebf3" }}>
        <Stack direction="row" alignItems="center" spacing={1.5}>
          <Avatar
            sx={{
              width: 40,
              height: 40,
              bgcolor: "#fde8d8",
              color: "#e07c3e",
              fontWeight: 700,
              fontSize: "14px",
            }}
          >
            A
          </Avatar>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography
              fontWeight={700}
              fontSize="14px"
              color="#0d121b"
              noWrap
            >
              Admin
            </Typography>
            <Typography fontSize="12px" color="#9ca3af" noWrap>
              Store Manager
            </Typography>
          </Box>
          <IconButton
            onClick={handleLogout}
            size="small"
            sx={{ color: "#9ca3af", "&:hover": { color: "#ef4444" } }}
          >
            <Logout fontSize="small" />
          </IconButton>
        </Stack>
      </Box>
    </Drawer>
  );
};

export default React.memo(AdminDrawer);
export { SIDEBAR_WIDTH };
