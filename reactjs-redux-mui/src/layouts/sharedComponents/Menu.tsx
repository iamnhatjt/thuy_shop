import { Stack } from "@mui/material";
import { MenuItemProps } from "../../constant/type";
import { HOME_PATH } from "../../constant/paths";
import DoubleArrowIcon from "../../icons/DoubleArrowIcon";
import { Link } from "react-router-dom";
import { memo } from "react";

const Menu = () => {
  return (
    <Stack
      width="100%"
      spacing={{ xs: 1, xl: 1.5 }}
      sx={{
        overflowX: "hidden",
        overflowY: "auto",
      }}
    >
      {DATA.map((item) => {
        const isAuthoried = true;

        if (isAuthoried) {
          return <Link to={item?.href ?? ""}>{item.label}</Link>;
        }
        return null;
      })}
    </Stack>
  );
};

export default memo(Menu);

const DATA: MenuItemProps[] = [
  {
    label: "first",
    href: HOME_PATH,
    icon: <DoubleArrowIcon />,
    roles: ["All"],
  },
];
