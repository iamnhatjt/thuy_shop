import React from "react";
import Loading from "../../../../layouts/sharedComponents/Loading";
import TableCustom, {
  ColumnTableType,
} from "../../../../layouts/sharedComponents/TableCustom";
import { useAdminBanner } from "../../../../store/banner/selectors";

interface BannerDataInterface {
  id: number;
  createdAt: string;
  updatedAt: string;
  fileName: string;
  url: string;
}

const BannerTable: React.FC = () => {
  const { bannerResPagination, isLoading } = useAdminBanner();

  const columns: ColumnTableType[] = bannerResPagination && [
    {
      columnName: "File Name",
      fieldName: "fileName",
    },
    {
      columnName: "Image preview",
      fieldName: "url",
      customDisplay: (data: BannerDataInterface) => <img src={data?.url} />,
    },
    {
      columnName: "Created At",
      fieldName: "createdAt",
    },
    {
      columnName: "Updated At",
      fieldName: "updatedAt",
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
      />
    </>
  );
};

export default React.memo(BannerTable);
