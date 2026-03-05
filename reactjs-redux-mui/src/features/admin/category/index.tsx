import React from "react";
import { Box } from "@mui/material";
import CategoryTable from "./components/CategoryTable";
import { useAdminCategory } from "../../../store/category/selectors";
import CategoryFormPopup from "./components/CategoryFormPopup";
import AdminHeader from "../../../layouts/Header/componets/AdminHeader";

const AdminCategory: React.FC = () => {
  const { onToggleFormPopup } = useAdminCategory();

  return (
    <>
      <AdminHeader
        title="Category Management"
        subtitle="Manage your product categories and subcategories"
        searchPlaceholder="Search categories..."
        actionLabel="Add Category"
        onAction={() => onToggleFormPopup(true)}
      />
      <Box sx={{ p: 3, flex: 1 }}>
        <Box
          sx={{
            bgcolor: "#fff",
            borderRadius: "16px",
            border: "1px solid #e7ebf3",
            overflow: "hidden",
          }}
        >
          <CategoryTable />
        </Box>
      </Box>
      <CategoryFormPopup />
    </>
  );
};

export default React.memo(AdminCategory);
