import React from "react";
import { useGetListBannerPaginationQuery } from "../../../../store/banner/bannerApiSlice";
import Loading from "../../../../layouts/sharedComponents/Loading";
import TableCustom, {
  ColumnTableType,
} from "../../../../layouts/sharedComponents/TableCustom";

interface BannerDataInterface {
  id: number;
  createdAt: string;
  updatedAt: string;
  fileName: string;
  url: string;
}

const BannerTable: React.FC = () => {
  const { data, isLoading } = useGetListBannerPaginationQuery({
    pageNum: 1,
    pageSize: 10,
  });

  console.log(data);

  const columns: ColumnTableType[] = data && [
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
        rows={data.data}
        pagination={data.pagination}
      />
    </>
  );
};

export default React.memo(BannerTable);
