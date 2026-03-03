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

  // Reset form when popup opens/closes or editing category changes
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

  // Filter out current category (and its children) from parent options to prevent circular references
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
    <Dialog open={isOpenFormPopup} maxWidth="sm" fullWidth onClose={handleClose}>
      <form onSubmit={formik.handleSubmit}>
        <DialogTitle align="center">
          {isEditing ? "Edit Category" : "Add Category"}
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              fullWidth
              label="Title"
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
            />
            <TextField
              fullWidth
              select
              label="Parent Category"
              name="parentId"
              value={formik.values.parentId}
              onChange={formik.handleChange}
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
                />
              }
              label="Active"
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button variant="text" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            size="large"
            color="success"
            variant="contained"
            type="submit"
          >
            {isEditing ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default React.memo(CategoryFormPopup);
