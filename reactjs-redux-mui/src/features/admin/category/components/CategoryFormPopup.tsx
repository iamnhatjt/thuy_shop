import React, { useEffect, useMemo } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  MenuItem,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { useAdminCategory } from "../../../../store/category/selectors";
import { CategoryDataInterface } from "../../../../store/category/reducers";

const validationSchema = yup.object({
  title: yup.string().required("Title is required"),
  isActive: yup.boolean(),
  parentId: yup.number().nullable(),
});

const CategoryFormPopup: React.FC = () => {
  const {
    isOpenFormPopup,
    editingCategory,
    allCategories,
    onToggleFormPopup,
    onCreateCategory,
    onUpdateCategory,
  } = useAdminCategory();

  const isEditing = !!editingCategory;

  const formik = useFormik({
    initialValues: {
      title: "",
      isActive: true,
      parentId: "" as number | "",
    },
    validationSchema,
    onSubmit: async (values) => {
      const payload = {
        title: values.title,
        isActive: values.isActive,
        parentId: values.parentId === "" ? null : values.parentId,
      };

      if (isEditing && editingCategory) {
        await onUpdateCategory(editingCategory.id, payload);
      } else {
        await onCreateCategory(payload);
      }
    },
  });

  useEffect(() => {
    if (isOpenFormPopup && editingCategory) {
      formik.setValues({
        title: editingCategory.title,
        isActive: editingCategory.isActive,
        parentId: editingCategory.parentId ?? "",
      });
    } else if (isOpenFormPopup) {
      formik.resetForm();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpenFormPopup, editingCategory]);

  const parentOptions = useMemo(() => {
    if (!allCategories) return [];
    return allCategories.filter(
      (c: CategoryDataInterface) =>
        !c.parentId && (!editingCategory || c.id !== editingCategory.id),
    );
  }, [allCategories, editingCategory]);

  const handleClose = () => {
    onToggleFormPopup(false);
    formik.resetForm();
  };

  return (
    <Dialog
      open={isOpenFormPopup}
      maxWidth="sm"
      fullWidth
      onClose={handleClose}
      PaperProps={{
        sx: { borderRadius: "16px", p: 1 },
      }}
    >
      <form onSubmit={formik.handleSubmit}>
        <DialogTitle sx={{ fontWeight: 700, textAlign: "center", pb: 1 }}>
          <Typography variant="h6" fontWeight={700}>
            {isEditing ? "Edit Category" : "Add Category"}
          </Typography>
          <Typography variant="body2" color="#9ca3af" mt={0.5}>
            {isEditing
              ? "Update the category details below"
              : "Fill in the details to create a new category"}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2.5} sx={{ mt: 1 }}>
            <TextField
              fullWidth
              label="Title"
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                },
              }}
            />
            <TextField
              fullWidth
              select
              label="Parent Category"
              name="parentId"
              value={formik.values.parentId}
              onChange={formik.handleChange}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                },
              }}
            >
              <MenuItem value="">
                <em>None (Top-Level)</em>
              </MenuItem>
              {parentOptions.map((cat: CategoryDataInterface) => (
                <MenuItem key={cat.id} value={cat.id}>
                  {cat.title}
                </MenuItem>
              ))}
            </TextField>
            <FormControlLabel
              control={
                <Switch
                  checked={formik.values.isActive}
                  onChange={(e) =>
                    formik.setFieldValue("isActive", e.target.checked)
                  }
                  name="isActive"
                  color="primary"
                />
              }
              label={
                <Typography fontWeight={500}>Active</Typography>
              }
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2.5 }}>
          <Button
            variant="outlined"
            onClick={handleClose}
            sx={{
              borderRadius: "10px",
              textTransform: "none",
              fontWeight: 600,
              px: 3,
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            type="submit"
            sx={{
              borderRadius: "10px",
              textTransform: "none",
              fontWeight: 600,
              px: 3,
              bgcolor: "#135bec",
              "&:hover": { bgcolor: "#0e44b3" },
            }}
          >
            {isEditing ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default React.memo(CategoryFormPopup);
