import { memo, useEffect } from "react";
import useToggle from "../../../hooks/useToggle";
import useBreakpoint from "../../../hooks/useBreakpoint";
import {
  IconButton,
  Drawer as MuiDrawer,
  Stack,
  drawerClasses,
} from "@mui/material";
import BarsIcon from "../../../icons/BarsIcon";
import { Link } from "react-router-dom";
import { HOME_PATH } from "../../../constant/paths";
import CloseIcon from "../../../icons/CloseIcon";

const Drawer = () => {
  const [isShow, onShow, onHide] = useToggle(false);

  const { isSmSmaller } = useBreakpoint();

  useEffect(() => {
    onHide();
  }, [isSmSmaller, onHide]);

  return (
    <>
      <IconButton onClick={onShow} className="only-mobile" sx={{ height: 40 }}>
        <BarsIcon color="primary" />
      </IconButton>
      <MuiDrawer
        anchor="left"
        open={isShow}
        onClose={onHide}
        sx={{
          [`& .${drawerClasses.paper}`]: {
            backgroundColor: "Background.paper",
            backgroundImage: "none",
            width: "100%",
            px: 3,
            py: 1.5,
          },
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Link
            to={HOME_PATH}
            style={{
              textDecoration: "none",
            }}
          >
            logo here
          </Link>
          <IconButton
            onClick={() => {
              console.log("click", isShow);
              onHide();
            }}
            sx={{
              color: "grey.900",
            }}
          >
            <CloseIcon />
          </IconButton>
        </Stack>
      </MuiDrawer>
    </>
  );
};

export default memo(Drawer);
