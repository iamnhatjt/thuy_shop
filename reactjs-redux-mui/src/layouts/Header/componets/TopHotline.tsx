import React from "react";
import { Stack, Typography } from "@mui/material";
import useTranslate from "../../../hooks/useTranslate";
import { HOT_LINE } from "../../../constant";

const TopHotline: React.FC = () => {
  const { tCommon } = useTranslate();
  return (
    <Stack
      justifyContent="center"
      direction="row"
      sx={{
        backgroundColor: "primary.main",
        padding: "8px 0px",
      }}
    >
      <Typography
        variant="body2"
        sx={{
          color: "common.white",
          textTransform: "uppercase",
        }}
      >
        {tCommon("common.hotline")}: {HOT_LINE}
      </Typography>
    </Stack>
  );
};

export default TopHotline;
