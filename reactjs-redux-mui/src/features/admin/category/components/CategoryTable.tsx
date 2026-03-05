import React from "react";
import Loading from "../../../../layouts/sharedComponents/Loading";
import TableCustom, {
  ColumnTableType,
} from "../../../../layouts/sharedComponents/TableCustom";
import { useAdminCategory } from "../../../../store/category/selectors";
import { CategoryDataInterface } from "../../../../store/category/reducers";
import {
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { Edit, DeleteOutline } from "@mui/icons-material";
import { formatDate } from "../../../../utils";

const CategoryTable: React.FC = () => {
  const {
    categoryResPagination,
    isLoading,
    onChangePagination,
    onDeleteCategory,
    onEditCategory,
  } = useAdminCategory();

  const [idDelete, setIdDelete] = React.useState<number | null>(null);

  const columns: ColumnTableType[] = categoryResPagination && [
    {
      columnName: "#",
      fieldName: "",
      customDisplay: (_data, index) => (
        <Typography variant="body2" fontWeight={500} color="#6b7280">
          {typeof index === "number"
            ? index + 1
            : categoryResPagination?.data?.indexOf(_data) + 1}
        </Typography>
      ),
    },
    {
      columnName: "Title",
      fieldName: "title",
      customDisplay: (data: CategoryDataInterface) => (
        <Typography variant="body2" fontWeight={600} color="#0d121b">
          {data.title}
        </Typography>
      ),
    },
    {
      columnName: "Status",
      fieldName: "isActive",
      customDisplay: (data: CategoryDataInterface) => (
        <Chip
          label={data.isActive ? "Active" : "Inactive"}
          size="small"
          sx={{
            fontWeight: 600,
            fontSize: "12px",
            borderRadius: "6px",
            bgcolor: data.isActive ? "#ecfdf5" : "#fef2f2",
            color: data.isActive ? "#059669" : "#dc2626",
            border: data.isActive
              ? "1px solid #a7f3d0"
              : "1px solid #fecaca",
          }}
        />
      ),
    },
    {
      columnName: "Parent",
      fieldName: "parentId",
      customDisplay: (data: CategoryDataInterface) => (
        <Typography variant="body2" color="#6b7280">
          {data.parentId ? `#${data.parentId}` : "—"}
        </Typography>
      ),
    },
    {
      columnName: "Created",
      fieldName: "createdAt",
      customDisplay: (data) => (
        <Typography variant="body2" color="#6b7280">
          {formatDate(data?.createdAt)}
        </Typography>
      ),
    },
    {
      columnName: "Actions",
      fieldName: "",
      customDisplay: (data: CategoryDataInterface) => (
        <Stack direction="row" spacing={0.5}>
          <IconButton
            size="small"
            onClick={() => onEditCategory(data)}
            sx={{
              color: "#135bec",
              "&:hover": { bgcolor: "#eff6ff" },
            }}
          >
            <Edit fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => setIdDelete(data?.id)}
            sx={{
              color: "#ef4444",
              "&:hover": { bgcolor: "#fef2f2" },
            }}
          >
            <DeleteOutline fontSize="small" />
          </IconButton>
        </Stack>
      ),
    },
  ];

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <TableCustom
        columns={columns || []}
        rows={categoryResPagination?.data || []}
        pagination={
          categoryResPagination?.pagination || {
            pageNum: 1,
            pageSize: 10,
            totalCount: 0,
          }
        }
        onChangePageNumber={(pageNum: number) =>
          onChangePagination({
            pageNum: pageNum,
            pageSize: 10,
          })
        }
      />
      {/* Delete confirmation dialog */}
      <Dialog
        open={!!idDelete}
        onClose={() => setIdDelete(null)}
        PaperProps={{
          sx: { borderRadius: "16px", p: 1 },
        }}
      >
        <DialogTitle sx={{ fontWeight: 700 }}>Delete Category</DialogTitle>
        <DialogContent>
          <Typography color="#6b7280">
            This action cannot be undone. Are you sure you want to delete this
            category?
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button
            variant="outlined"
            onClick={() => setIdDelete(null)}
            sx={{
              borderRadius: "10px",
              textTransform: "none",
              fontWeight: 600,
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              if (!!idDelete) {
                onDeleteCategory(idDelete).then(() => setIdDelete(null));
              }
            }}
            sx={{
              borderRadius: "10px",
              textTransform: "none",
              fontWeight: 600,
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default React.memo(CategoryTable);
