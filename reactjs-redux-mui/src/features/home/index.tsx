import { Box } from "@mui/material";
import React from "react";
import Banner from "./components/Banner";

const Home: React.FC = () => {
  return (
    <Box>
      <Banner />
    </Box>
  );
};

export default React.memo(Home);
