import { Grid, Stack, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { HOME_PATH } from "../../constant/paths";
import SwitchLanguage from "./componets/SwitchLanguage";
import SwitchTheme from "./componets/SwitchTheme";
import TopHotline from "./componets/TopHotline";
import { Icon } from "@iconify/react";

const NavBar = [
  {
    title: "Chăn Ga Gối đệm",
    url: "/chan-ga-goi-dem",
    subtitle: [
      {
        title: "Chăn",
        url: "/chan-ga-goi-dem/chan",
      },
      {
        title: "Ga",
        url: "/chan-ga-goi-dem/ga",
      },
      {
        title: "Gối",
        url: "/chan-ga-goi-dem/goi",
      },
      {
        title: "Đệm",
        url: "/chan-ga-goi-dem/dem",
      },
    ],
  },
  {
    title: "Thực phẩm chay",
    url: "/thuc-pham-chay",
    subTitle: [
      {
        title: "Nấm",
        url: "/thuc-pham-chay/nam",
      },
      {
        title: "Giò chay",
        url: "/thuc-pham-chay/gio-chay",
      },
      {
        title: "Chả ngộ chay",
        url: "/thuc-pham-chay/cha-ngo-chay",
      },
      {
        title: "Miến",
        url: "/thuc-pham-chay/mien",
      },
    ],
  },
  {
    title: "Đồ nhựa, đồ gia dụng",
    subTitle: ["Chậu", "Thau", "Gáo"],
    url: "do-nhua-do-gia-dung",
    subtitle: [
      {
        title: "Chậu",
        url: "/thuc-pham-chay/chau",
      },
      {
        title: "Thau",
        url: "/thuc-pham-chay/thau",
      },
      {
        title: "gáo",
        url: "/thuc-pham-chay/gao",
      },
    ],
  },
  {
    title: "Đồ thủy tinh",
    url: "/do-thuy-tinh",
    subtitle: [
      {
        title: "Ấm chén",
        url: "/do-thuy-tinh/am-chen",
      },
      {
        title: "Bình",
        url: "/do-thuy-tinh/binh",
      },
    ],
  },
  {
    title: "Thông Khuyển mãi",
    url: "/thong-tin-khuyen-mai",
  },
  {
    title: "Bài viết chia sẻ",
    url: "/bai-viet",
  },
];

const Header = () => {
  return (
    <Stack>
      <TopHotline />
      <Grid
        container
        xs={12}
        sx={{
          margin: "8px 20px 8px 20px",
          width: "auto",
        }}
        borderBottom="1px solid"
        borderColor="gray.100"
      >
        <Grid item xs={4}>
          <Typography
            variant="body1"
            sx={{
              color: "primary.main",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "5px",
            }}
          >
            <Icon
              color="#2d2e7f"
              icon="tdesign:location-filled"
              height="26"
              style={{
                color: "primary.main",
              }}
            />
            cửa hàng
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Stack direction="row" justifyContent={"center"}>
            Thuy Bich shop
          </Stack>
        </Grid>
        <Grid item xs={4}>
          <Stack direction={"row"} justifyContent={"end"} gap={6}>
            <Typography
              variant="body1"
              sx={{
                color: "primary.main",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "5px",
              }}
            >
              <Icon
                color="#2d2e7f"
                icon="mdi:account-outline"
                height="26"
                style={{
                  color: "primary.main",
                }}
              />
              Tài khoản
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "primary.main",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "5px",
              }}
            >
              <Icon
                color="#2d2e7f"
                icon="iconamoon:shopping-card-bold"
                height="26"
                style={{
                  color: "primary.main",
                }}
              />
              Giỏ hàng
            </Typography>
          </Stack>
        </Grid>
      </Grid>

      <Grid container>
        <Grid item xs={6}></Grid>
      </Grid>

      <Stack
        height={HEADER_HEIGHT}
        borderBottom="1px solid"
        borderColor="gray.100"
        bgcolor="Backgroud.paper"
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        px={{ xs: 2, md: 3 }}
        width="100%"
      >
        <Link to={HOME_PATH}>"Home logo"</Link>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="end"
          spacing={0.5}
          overflow="hidden"
          flex={1}
        >
          <Stack direction="row" alignItems="center" spacing={2}>
            <SwitchLanguage />
            <SwitchTheme />
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default React.memo(Header);

export const HEADER_HEIGHT = 50;
