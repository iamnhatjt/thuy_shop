import React from "react";

export default function Logo(style: React.HTMLAttributes<any>) {
  const logo = "/assets/images/logos/img.png";
  return <img src={logo} alt="logo" height={"40px"} />;
}
