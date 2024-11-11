import React, { MouseEvent, useState } from "react";
import {
  AppBar,
  Box,
  Divider,
  Drawer,
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemText,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import {
  LocationOn,
  Person,
  Search,
  ShoppingCart,
  Star,
} from "@mui/icons-material";
import Logo from "../../sharedComponents/Logo";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import useBreakpoint from "../../../hooks/useBreakpoint";

interface NavItem {
  title: string;
  url: string;
  subtitle?: { title: string; url: string }[];
}

const NavBar: NavItem[] = [
  {
    title: "Chăn Ga Gối đệm",
    url: "/chan-ga-goi-dem",
    subtitle: [
      { title: "Chăn", url: "/chan-ga-goi-dem/chan" },
      {
        title: "Ga",
        url: "/chan-ga-goi-dem/ga",
      },
      { title: "Gối", url: "/chan-ga-goi-dem/goi" },
      { title: "Đệm", url: "/chan-ga-goi-dem/dem" },
    ],
  },
  {
    title: "Thực phẩm chay",
    url: "/thuc-pham-chay",
    subtitle: [
      { title: "Nấm", url: "/thuc-pham-chay/nam" },
      {
        title: "Giò chay",
        url: "/thuc-pham-chay/gio-chay",
      },
      { title: "Chả ngộ chay", url: "/thuc-pham-chay/cha-ngo-chay" },
      { title: "Miến", url: "/thuc-pham-chay/mien" },
    ],
  },
  {
    title: "Đồ nhựa, đồ gia dụng",
    url: "/do-nhua-do-gia-dung",
    subtitle: [
      { title: "Chậu", url: "/do-nhua-do-gia-dung/chau" },
      {
        title: "Thau",
        url: "/do-nhua-do-gia-dung/thau",
      },
      { title: "Gáo", url: "/do-nhua-do-gia-dung/gao" },
    ],
  },
  {
    title: "Đồ thủy tinh",
    url: "/do-thuy-tinh",
    subtitle: [
      { title: "Ấm chén", url: "/do-thuy-tinh/am-chen" },
      { title: "Bình", url: "/do-thuy-tinh/binh" },
    ],
  },
  { title: "Thông Khuyển mãi", url: "/thong-tin-khuyen-mai" },
  { title: "Bài viết chia sẻ", url: "/bai-viet" },
];

function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { isMdSmaller } = useBreakpoint();

  const toggleDrawer = (open: boolean) => (event: MouseEvent) => {
    setDrawerOpen(open);
  };
  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar>
        {isMdSmaller ? (
          <>
            <Stack direction="row" justifyContent="space-between" width="100%">
              <IconButton color="primary" onClick={toggleDrawer(true)}>
                <MenuIcon />
              </IconButton>
              <IconButton color="primary" onClick={toggleDrawer(true)}>
                <SearchIcon />
              </IconButton>
              <Logo />
              <IconButton color="primary">
                <Person />
              </IconButton>
              <IconButton color="primary">
                <ShoppingCart />
              </IconButton>
            </Stack>

            <Drawer
              anchor="left"
              open={drawerOpen}
              onClose={toggleDrawer(false)}
            >
              <Stack direction="row" justifyContent="center">
                <Logo />
              </Stack>
              <List>
                {NavBar.map((navItem) => (
                  <React.Fragment key={navItem.url}>
                    <ListItem component={Link} to={navItem.url}>
                      <ListItemText primary={navItem.title} />
                    </ListItem>
                    {navItem.subtitle && (
                      <List component="div" disablePadding>
                        {navItem.subtitle.map((subItem) => (
                          <ListItem
                            component={Link}
                            to={subItem.url}
                            key={subItem.url}
                            sx={{ pl: 4 }}
                          >
                            <ListItemText primary={subItem.title} />
                          </ListItem>
                        ))}
                      </List>
                    )}
                    <Divider color="primary" />
                  </React.Fragment>
                ))}
              </List>
            </Drawer>
          </>
        ) : (
          <Stack width="100%" direction="row" justifyContent="space-between">
            <Box display="flex" alignItems="center">
              <IconButton color="primary" component="a" href="#">
                <LocationOn />
                <Typography variant="body1" sx={{ ml: 0.5 }}>
                  Cửa hàng
                </Typography>
              </IconButton>
              <IconButton color="primary" component="a" href="#">
                <Star />
                <Typography variant="body1" sx={{ ml: 0.5 }}>
                  Quyền lợi thành viên
                </Typography>
              </IconButton>
            </Box>

            <Logo
              style={{
                height: "40px",
              }}
            />

            <Box display="flex" alignItems="center">
              <IconButton color="primary" component="a" href="#">
                <Person />
                <Typography variant="body1" sx={{ ml: 0.5 }}>
                  Tài khoản
                </Typography>
              </IconButton>
              <IconButton color="primary" component="a" href="#">
                <ShoppingCart />
                <Typography variant="body1" sx={{ ml: 0.5 }}>
                  Giỏ hàng
                </Typography>
              </IconButton>
            </Box>
          </Stack>
        )}
      </Toolbar>
      <Divider
        sx={{
          margin: "0px 20px",
        }}
      />
      {!isMdSmaller && (
        <Stack
          direction="row"
          justifyContent="space-between"
          width="auto"
          mx="20px"
          my="10px"
        >
          <Stack>item bar</Stack>
          <Stack>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "#f3f3ff",
                borderRadius: "30px",
                paddingLeft: 2,
                paddingRight: 1,
                width: "400px",
              }}
            >
              <InputBase placeholder="Tìm kiếm nhanh" fullWidth />
              <IconButton type="submit" sx={{ color: "#2C2A8A" }}>
                <Search />
              </IconButton>
            </Box>
          </Stack>
        </Stack>
      )}
    </AppBar>
  );
}

export default React.memo(Header);
