import React from "react";
import {
  AppBar,
  Box,
  Button,
  InputBase,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { Search, Add } from "@mui/icons-material";
import { SIDEBAR_WIDTH } from "./AdminDrawer";

interface AdminHeaderProps {
  title: string;
  subtitle?: string;
  searchPlaceholder?: string;
  actionLabel?: string;
  onAction?: () => void;
  onSearch?: (query: string) => void;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({
  title,
  subtitle,
  searchPlaceholder = "Search...",
  actionLabel,
  onAction,
  onSearch,
}) => {
  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: "#fff",
        borderBottom: "1px solid #e7ebf3",
        color: "#0d121b",
        zIndex: 10,
      }}
    >
      <Toolbar
        sx={{
          minHeight: "64px !important",
          px: { xs: 2, md: 3 },
          gap: 2,
        }}
      >
        {/* Left: Title */}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography fontWeight={800} fontSize="18px" color="#0d121b" noWrap>
            {title}
          </Typography>
          {subtitle && (
            <Typography fontSize="13px" color="#9ca3af" noWrap>
              {subtitle}
            </Typography>
          )}
        </Box>

        {/* Center: Search */}
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            alignItems: "center",
            bgcolor: "#f8f9fc",
            borderRadius: "10px",
            border: "1px solid #e7ebf3",
            px: 2,
            width: 280,
            transition: "all 0.2s",
            "&:focus-within": {
              borderColor: "#135bec",
              boxShadow: "0 0 0 2px rgba(19, 91, 236, 0.1)",
            },
          }}
        >
          <Search sx={{ color: "#9ca3af", fontSize: 20, mr: 1 }} />
          <InputBase
            placeholder={searchPlaceholder}
            fullWidth
            sx={{ py: 0.8, fontSize: "14px" }}
            onChange={(e) => onSearch?.(e.target.value)}
          />
        </Box>

        {/* Right: Action button */}
        {actionLabel && (
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={onAction}
            sx={{
              borderRadius: "10px",
              textTransform: "none",
              fontWeight: 700,
              fontSize: "14px",
              py: 1,
              px: 2.5,
              bgcolor: "#135bec",
              boxShadow: "0 2px 8px rgba(19, 91, 236, 0.3)",
              "&:hover": { bgcolor: "#0e44b3" },
              whiteSpace: "nowrap",
            }}
          >
            {actionLabel}
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default React.memo(AdminHeader);
