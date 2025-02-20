import React from "react";
import Loading from "../../../../layouts/sharedComponents/Loading";
import TableCustom, {
  ColumnTableType,
} from "../../../../layouts/sharedComponents/TableCustom";
import { useAdminBanner } from "../../../../store/banner/selectors";
import { BannerDataInterface } from "../../../../store/banner/reducers";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { formatDate } from "../../../../utils";
import Iconify from "../../../../layouts/sharedComponents/Iconify";

const BannerTable: React.FC = () => {
  const { bannerResPagination, isLoading, onChangePagination, onDeleteBanner } =
    useAdminBanner();

  const [idDelete, setIdDelete] = React.useState<number | null>(null);

  const columns: ColumnTableType[] = bannerResPagination && [
    {
      columnName: "",
      fieldName: "",
      customDisplay: (data) => (
        <Typography variant="subtitle2">
          {bannerResPagination?.data?.indexOf(data) + 1}
        </Typography>
      ),
    },
    {
      columnName: "File Name",
      fieldName: "fileName",
    },
    {
      columnName: "Image preview",
      fieldName: "url",
      customDisplay: (data: BannerDataInterface) => (
        <img
          src={data?.url}
          alt={data?.fileName}
          style={{
            width: "180px",
            maxHeight: "120px",
            objectFit: "cover",
          }}
        />
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
      columnName: "Updated At",
      fieldName: "updatedAt",
      customDisplay: (data) => (
        <Typography variant="subtitle2">
          {formatDate(data?.updatedAt)}
        </Typography>
      ),
    },
    {
      columnName: "",
      fieldName: "",
      customDisplay: (data) => (
        <Iconify
          icon="majesticons:delete-bin"
          color="red"
          onClick={() => setIdDelete(data?.id)}
        />
      ),
    },
  ];

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <TableCustom
        columns={columns}
        rows={bannerResPagination.data}
        pagination={bannerResPagination.pagination}
        onChangePageNumber={(pageNum: number) =>
          onChangePagination({
            pageNum: pageNum,
            pageSize: 10,
          })
        }
      />
      {/*Delete dialog*/}
      <Dialog open={!!idDelete} onClose={() => setIdDelete(null)}>
        <DialogTitle> Delete Banner</DialogTitle>
        <DialogContent>This action cannot revert !</DialogContent>
        <DialogActions>
          <Button variant="text">Cancel</Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              if (!!idDelete) {
                onDeleteBanner(idDelete).then(() => setIdDelete(null));
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

export default React.memo(BannerTable);
