import { IconButton, Stack, StackProps } from "@mui/material";
import { memo, useMemo } from "react";
import { useSidebar } from "../../store/app/selectors";
import useBreakpoint from "../../hooks/useBreakpoint";
import DoubleArrowIcon from "../../icons/DoubleArrowIcon";
import Menu from "./Menu";

const SideBar = (props: StackProps) => {
  const { isExpandedSidebar, onToogleExandSidebar } = useSidebar();
  const { isLgSmaller } = useBreakpoint();

  const isShowLarge = useMemo(
    () => isExpandedSidebar && !isLgSmaller,
    [isExpandedSidebar, isLgSmaller],
  );

  const onToggle = () => {
    onToogleExandSidebar();
  };

  return (
    <Stack
      height="100%"
      sx={{
        transition: "width .3s",
        backgroundColor: "Background.paper",
        "&::-webkit-scrollbar": {
          width: 4,
          height: 4,
        },
      }}
      alignItems="center"
      p={isShowLarge ? { sm: 1.5, xl: 3 } : 1}
      width={isShowLarge ? { xs: LARGE_SIZE, xl: LARGEST_SIZE } : SMALL_SIZE}
      maxWidth={{ xs: LARGEST_SIZE, xl: LARGEST_SIZE }}
      overflow="hidden"
      spacing={isShowLarge ? { xs: 2, xl: 3 } : 2.5}
      display={{ xs: "none", sm: "flex" }}
      borderRight="1px solid"
      borderColor="grey.100"
      {...props}
    >
      <Stack
        width={{ lg: "100%" }}
        direction={isShowLarge ? "row" : "column-reverse"}
        alignItems="center"
        justifyContent={isShowLarge ? "space-between" : "center"}
        spacing={2.5}
      >
        hello
        {!isLgSmaller && (
          <IconButton onClick={onToggle}>
            <DoubleArrowIcon
              fontSize="medium"
              color="success"
              sx={{
                transform: isExpandedSidebar ? undefined : "rotate(-180deg)",
              }}
            />
          </IconButton>
        )}
      </Stack>
      <Menu />
    </Stack>
  );
};

export default memo(SideBar);

const LARGEST_SIZE = 340;
const LARGE_SIZE = 280;
const SMALL_SIZE = 60;
