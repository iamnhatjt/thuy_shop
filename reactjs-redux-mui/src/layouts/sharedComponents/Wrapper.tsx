import { Stack } from "@mui/material";
import React, { useMemo } from "react";
import useWindowSize from "../../hooks/useWindowSize";

type WrapperProps = {
  children: React.ReactNode;
};

const Wrapper = (props: WrapperProps) => {
  const { height } = useWindowSize();
  const isSmallHeight = useMemo(() => height && height < 768, [height]);
  return (
    <Stack
      flex={1}
      mx={{ sm: 6, lg: 8 }}
      my={{ sm: isSmallHeight ? 3 : 6, lg: isSmallHeight ? 3 : 8 }}
      direction="row"
      sx={{
        background: {
          sm: "none",
        },

        backgroundSize: { xs: "cover", sm: undefined },
      }}
      height={({ spacing }) => ({
        xs: "calc(var(--vh, 1vh) * 100)",
        sm: `calc(calc(var(--vh, 1vh) * 100) - ${spacing(
          (isSmallHeight ? 3 : 6) * 2,
        )})`,
        lg: `calc(calc(var(--vh, 1vh) * 100) - ${spacing(
          (isSmallHeight ? 3 : 8) * 2,
        )})`,
      })}
      bgcolor="common.white"
      justifyContent={{ xs: "center", sm: "initial" }}
      alignItems={{ xs: "center", sm: "initial" }}
    >
      {props.children}
    </Stack>
  );
};

export default Wrapper;
