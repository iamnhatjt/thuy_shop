import { useCallback, useEffect, useState } from "react";
import { Size } from "../constant/type";
const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState<Size>({});

  const onResize = useCallback(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, []);

  useEffect(() => {
    // Run when on mount
    onResize();

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [onResize]);

  return windowSize;
};

export default useWindowSize;
