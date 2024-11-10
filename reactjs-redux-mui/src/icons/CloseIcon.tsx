import { memo } from "react";
import { SvgIcon, SvgIconProps } from "@mui/material";

const CloseIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fontSize="inherit"
      {...props}
    >
      <path
        d="M15.625 4.375L4.375 15.625"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.625 15.625L4.375 4.375"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SvgIcon>
  );
};

export default memo(CloseIcon);
