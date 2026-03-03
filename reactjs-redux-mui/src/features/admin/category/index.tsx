import React from "react";
import CategoryTable from "./components/CategoryTable";
import { Button, Stack, Typography } from "@mui/material";
import { useAdminCategory } from "../../../store/category/selectors";
import CategoryFormPopup from "./components/CategoryFormPopup";

const AdminCategory: React.FC = () => {
  const { onToggleFormPopup } = useAdminCategory();

  return (
    <>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ px: 3, py: 2 }}
      >
        <Typography variant="h5" fontWeight={700} color="primary">
          Category Management
        </Typography>
        <Button variant="contained" onClick={() => onToggleFormPopup(true)}>
          New Category
        </Button>
      </Stack>
      <CategoryTable />
      <CategoryFormPopup />
    </>
  );
};

export default React.memo(AdminCategory);
