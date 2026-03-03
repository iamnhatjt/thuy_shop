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
  Badge,
} from "@mui/material";
import {
  LocationOn,
  Person,
  Search,
  ShoppingCart,
  Star,
  Bed,
} from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import useBreakpoint from "../../../hooks/useBreakpoint";
import { Icon } from "@iconify/react";
import { useNavbarCategories } from "../../../store/category/selectors";

function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { isMdSmaller } = useBreakpoint();
  const { navItems } = useNavbarCategories();

  const toggleDrawer = (open: boolean) => (event: MouseEvent) => {
    setDrawerOpen(open);
  };
  
  return (
    <AppBar 
      position="sticky" 
      color="inherit" 
      elevation={0}
      sx={{ 
        borderBottom: "1px solid #e7ebf3",
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        backdropFilter: "blur(12px)",
        px: { xs: 1, md: 3 },
        pt: { xs: 1, md: 1.5 },
        pb: { xs: 1, md: 0 },
      }}
    >
      <Toolbar disableGutters sx={{ flexDirection: "column", gap: 2, mb: { md: 1 } }}>
        {/* Top Header Row */}
        <Stack 
          direction="row" 
          justifyContent="space-between" 
          alignItems="center"
          width="100%" 
          maxWidth="1440px"
          mx="auto"
          gap={{ xs: 1, md: 4 }}
        >
          {isMdSmaller && (
            <IconButton color="primary" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
          )}

          {/* Premium Logo Section */}
          <Box display="flex" alignItems="center" gap={1.5} component={Link} to="/" sx={{ textDecoration: 'none', color: '#135bec' }}>
            <Box 
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '8px',
                bgcolor: 'rgba(19, 91, 236, 0.1)',
                p: { xs: 0.5, md: 1 },
              }}
            >
              <Bed sx={{ fontSize: { xs: 24, md: 32 } }} />
            </Box>
            <Typography 
              variant="h6" 
              fontWeight={800} 
              sx={{ 
                display: { xs: 'block', sm: 'block' },
                color: '#0d121b',
                letterSpacing: '-0.5px',
                fontSize: { xs: '18px', md: '22px' }
              }}
            >
              Thuy<span style={{ color: '#135bec' }}>Shop</span>
            </Typography>
          </Box>

          {/* Center Search Bar (Desktop) */}
          {!isMdSmaller && (
            <Box sx={{ flex: 1, maxWidth: '600px' }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "#f8f9fc",
                  borderRadius: "12px",
                  paddingLeft: 2,
                  paddingRight: 1,
                  border: '1px solid #e7ebf3',
                  transition: 'all 0.2s',
                  '&:focus-within': {
                    borderColor: '#135bec',
                    boxShadow: '0 0 0 2px rgba(19, 91, 236, 0.1)'
                  }
                }}
              >
                <Icon icon="material-symbols:search" color="#4c669a" fontSize={24} style={{ marginRight: 8 }} />
                <InputBase 
                  placeholder="Tìm kiếm sản phẩm..." 
                  fullWidth 
                  sx={{ py: 1.5, fontSize: '15px' }}
                />
              </Box>
            </Box>
          )}

          {/* Right Icons */}
          <Stack direction="row" alignItems="center" gap={{ xs: 0.5, md: 2 }}>
            {!isMdSmaller && (
              <IconButton 
                component="a" 
                href="#"
                sx={{ 
                  borderRadius: '12px', px: 2, py: 1, gap: 1,
                  '&:hover': { bgcolor: '#f8f9fc' }
                }}
              >
                <LocationOn sx={{ color: '#0d121b' }} />
                <Typography variant="body2" fontWeight={600} color="#0d121b">
                  Cửa hàng
                </Typography>
              </IconButton>
            )}
            
            <IconButton 
              component="a" 
              href="#"
              sx={{ 
                borderRadius: '12px', px: { xs: 1, md: 2 }, py: 1, gap: 1,
                '&:hover': { bgcolor: '#f8f9fc' }
              }}
            >
              <Person sx={{ color: '#0d121b' }} />
              {!isMdSmaller && (
                <Typography variant="body2" fontWeight={600} color="#0d121b">
                  Tài khoản
                </Typography>
              )}
            </IconButton>

            <IconButton 
              component="a" 
              href="#"
              sx={{ 
                bgcolor: '#135bec',
                color: 'white',
                borderRadius: '12px',
                px: { xs: 1, md: 2.5 }, 
                py: { xs: 1, md: 1.2 }, 
                gap: 1,
                transition: 'all 0.2s',
                '&:hover': { bgcolor: '#0e44b3' }
              }}
            >
              <Badge badgeContent={2} color="error" sx={{ '& .MuiBadge-badge': { fontWeight: 'bold' } }}>
                <ShoppingCart />
              </Badge>
              {!isMdSmaller && (
                <Typography variant="body2" fontWeight={700}>
                  Giỏ hàng
                </Typography>
              )}
            </IconButton>
          </Stack>
        </Stack>

        {/* Desktop Navigation Links */}
        {!isMdSmaller && (
          <Stack
            direction="row"
            justifyContent="center"
            className="header-nav-large"
            width="100%"
            maxWidth="1440px"
            mx="auto"
            sx={{ pt: 1 }}
          >
            {navItems.map((item) => (
              <div className="header-nav-title" key={item.url}>
                <Link
                  style={{ textDecoration: "none", color: "inherit" }}
                  to={item.url}
                >
                  <Typography 
                    variant="body2" 
                    fontWeight={600} 
                    sx={{ color: '#4c669a', '&:hover': { color: '#135bec' } }}
                  >
                    {item.title}
                  </Typography>
                </Link>
                {!!item.subtitle && (
                  <Icon
                    icon="gridicons:dropdown"
                    style={{ fontWeight: 500, fontSize: "20px", color: '#4c669a' }}
                  />
                )}
                {!!item.subtitle && (
                  <ul className="header-nav-subtitle" style={{ borderRadius: '12px', boxShadow: '0 10px 40px rgba(0,0,0,0.08)', border: '1px solid #e7ebf3' }}>
                    {item.subtitle.map((subItem) => (
                      <li key={subItem.url}>
                        <Link
                          to={subItem.url}
                          style={{ textDecoration: "none", color: "inherit" }}
                        >
                          <Typography variant="body2" sx={{ padding: "10px 16px", fontWeight: 500 }}>
                            {subItem.title}
                          </Typography>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </Stack>
        )}

      </Toolbar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        PaperProps={{ sx: { width: '280px', p: 2 } }}
      >
        <Box display="flex" alignItems="center" gap={1.5} mb={3}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '8px', bgcolor: 'rgba(19, 91, 236, 0.1)', p: 0.5 }}>
            <Bed sx={{ fontSize: 24, color: '#135bec' }} />
          </Box>
          <Typography variant="h6" fontWeight={800} sx={{ color: '#0d121b', letterSpacing: '-0.5px' }}>
            Thuy<span style={{ color: '#135bec' }}>Shop</span>
          </Typography>
        </Box>
        
        {/* Mobile Search */}
        <Box
          sx={{ display: "flex", alignItems: "center", backgroundColor: "#f8f9fc", borderRadius: "12px", px: 2, mb: 3, border: '1px solid #e7ebf3' }}
        >
          <Icon icon="material-symbols:search" color="#4c669a" fontSize={20} style={{ marginRight: 8 }} />
          <InputBase placeholder="Tìm kiếm..." fullWidth sx={{ py: 1 }} />
        </Box>

        <List disablePadding>
          {navItems.map((navItem) => (
            <React.Fragment key={navItem.url}>
              <ListItem component={Link} to={navItem.url} sx={{ px: 0, py: 1.5 }}>
                <ListItemText 
                  primary={navItem.title} 
                  primaryTypographyProps={{ fontWeight: 600, color: '#0d121b' }} 
                />
              </ListItem>
              {navItem.subtitle && (
                <List component="div" disablePadding sx={{ bgcolor: '#f8f9fc', borderRadius: '8px', mb: 1 }}>
                  {navItem.subtitle.map((subItem) => (
                    <ListItem component={Link} to={subItem.url} key={subItem.url} sx={{ pl: 2, py: 1 }}>
                      <ListItemText 
                        primary={subItem.title} 
                        primaryTypographyProps={{ fontSize: '14px', color: '#4c669a' }} 
                      />
                    </ListItem>
                  ))}
                </List>
              )}
              <Divider sx={{ borderColor: '#e7ebf3' }} />
            </React.Fragment>
          ))}
        </List>
      </Drawer>
    </AppBar>
  );
}

export default React.memo(Header);

