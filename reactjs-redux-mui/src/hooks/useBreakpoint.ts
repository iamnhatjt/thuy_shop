import { useState, useCallback, useEffect } from "react";
import { Breakpoint, useMediaQuery, useTheme } from "@mui/material";

const useBreakpoint = () => {
  const [breakpoint, setBreakpoint] = useState<Breakpoint | undefined>();

  const { breakpoints } = useTheme();

  const isXsSmaller = useMediaQuery(breakpoints.down("xs"));
  const isSmSmaller = useMediaQuery(breakpoints.down("sm"));

  const isMdSmaller = useMediaQuery(breakpoints.down("md"));
  const isLgSmaller = useMediaQuery(breakpoints.down("lg"));
  const isXlSmaller = useMediaQuery(breakpoints.down("xl"));
  const isLgBigger = useMediaQuery(breakpoints.up("lg"));
  const isXlBigger = useMediaQuery(breakpoints.up("xl"));

  const onGetBreakpoint = useCallback(() => {
    const currentBreakpoint = getCurrentBreakpoint(breakpoints.values);
    setBreakpoint(currentBreakpoint);
  }, [breakpoints]);

  useEffect(() => {
    onGetBreakpoint();
  }, [onGetBreakpoint]);

  return {
    breakpoint,
    isXsSmaller,
    isSmSmaller,
    isMdSmaller,
    isLgSmaller,
    isXlSmaller,
    isLgBigger,
    isXlBigger,
  };
};

export default useBreakpoint;

const getCurrentBreakpoint = (breakpoints: { [key: string]: number }) => {
  if (typeof window === "undefined") return;
  let currentBreakpoint;
  let biggestBreakpointValue = 0;
  for (const breakpoint of Object.keys(breakpoints)) {
    const breakpointValue = breakpoints[breakpoint];

    if (
      breakpointValue > biggestBreakpointValue &&
      window.innerWidth >= breakpointValue
    ) {
      biggestBreakpointValue = breakpointValue;
      currentBreakpoint = breakpoint;
    }
  }

  return currentBreakpoint as Breakpoint;
};
