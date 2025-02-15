import {
  Drawer,
  drawerClasses,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React from "react";
import Iconify from "../../sharedComponents/Iconify";
import { useNavigate } from "react-router-dom";
import { ADMIN_BANNER_PATH } from "../../../constant/paths";

interface leftSideType {
  url: string;
  key: string;
  icon: string;
}

const AdminDrawer = () => {
  const navigate = useNavigate();

  const listLeftSide: leftSideType[] = [
    {
      url: ADMIN_BANNER_PATH,
      key: "Banner",
      icon: "unjs:ipx",
    },
  ];

  return (
    <>
      <Drawer
        anchor="left"
        variant="permanent"
        open={true}
        sx={{
          backgroundColor: "white",
          [`& .${drawerClasses.paper}`]: {
            backgroundColor: "Background.white",
            backgroundImage: "none",
            width: "240px",
            height: "100%",
          },
        }}
      >
        <List>
          {listLeftSide.map((item: leftSideType, key: number) => (
            <ListItemButton key={key} onClick={() => navigate(item.url)}>
              <ListItemIcon>
                <Iconify icon={item.icon} height={32} />
              </ListItemIcon>
              <ListItemText primary={item.key} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default React.memo(AdminDrawer);
