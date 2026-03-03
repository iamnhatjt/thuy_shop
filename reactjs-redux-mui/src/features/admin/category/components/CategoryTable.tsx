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
  Typography,
} from "@mui/material";
import { formatDate } from "../../../../utils";
import Iconify from "../../../../layouts/sharedComponents/Iconify";

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
      columnName: "",
      fieldName: "",
      customDisplay: (_data, index) => (
        <Typography variant="subtitle2">
          {typeof index === "number"
            ? index + 1
            : categoryResPagination?.data?.indexOf(_data) + 1}
        </Typography>
      ),
    },
    {
      columnName: "Title",
      fieldName: "title",
    },
    {
      columnName: "Active",
      fieldName: "isActive",
      customDisplay: (data: CategoryDataInterface) => (
        <Chip
          label={data.isActive ? "Active" : "Inactive"}
          color={data.isActive ? "success" : "default"}
          size="small"
        />
      ),
    },
    {
      columnName: "Parent",
      fieldName: "parentId",
      customDisplay: (data: CategoryDataInterface) => (
        <Typography variant="subtitle2">
          {data.parentId ? `#${data.parentId}` : "—"}
        </Typography>
      ),
    },
    {
      columnName: "Created At",
      fieldName: "createdAt",
      customDisplay: (data) => (
        <Typography variant="subtitle2">
          {formatDate(data?.createdAt)}
        </Typography>
      ),
    },
    {
      columnName: "",
      fieldName: "",
      customDisplay: (data: CategoryDataInterface) => (
        <>
          <Iconify
            icon="mdi:pencil"
            color="#2d2e7f"
            onClick={() => onEditCategory(data)}
          />
          <Iconify
            icon="majesticons:delete-bin"
            color="red"
            onClick={() => setIdDelete(data?.id)}
          />
        </>
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
      {/* Delete dialog */}
      <Dialog open={!!idDelete} onClose={() => setIdDelete(null)}>
        <DialogTitle>Delete Category</DialogTitle>
        <DialogContent>This action cannot be reverted!</DialogContent>
        <DialogActions>
          <Button variant="text" onClick={() => setIdDelete(null)}>
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
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default React.memo(CategoryTable);
