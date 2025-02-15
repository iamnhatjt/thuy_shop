import Iconify from "./Iconify";
import React from "react";

const Loading: React.FC = () => {
  return (
    <>
      <Iconify icon="svg-spinners:blocks-wave" />
    </>
  );
};

export default React.memo(Loading);
