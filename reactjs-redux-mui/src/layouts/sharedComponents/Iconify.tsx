import React from "react";
import IconButton from "@mui/material/IconButton";
import { Icon, IconProps } from "@iconify/react";

interface IconifyProps extends Omit<IconProps, "icon"> {
  icon: string;
  onClick?: () => void;
}

const Iconify: React.FC<IconifyProps> = ({ icon, onClick, ...rest }) => {
  return (
    <IconButton onClick={onClick}>
      <Icon icon={icon} fontSize="1.375rem" {...rest} />
    </IconButton>
  );
};

export default Iconify;
