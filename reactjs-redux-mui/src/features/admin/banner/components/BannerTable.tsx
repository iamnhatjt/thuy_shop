import React from "react";
import { useGetListBannerPaginationQuery } from "../../../../store/banner/bannerApiSlice";
import Loading from "../../../../layouts/sharedComponents/Loading";
import TableCustom from "../../../../layouts/sharedComponents/TableCustom";

const BannerTable: React.FC = () => {
  const { data, isLoading, error } = useGetListBannerPaginationQuery({});

  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <TableCustom columns={[]} rows={data} />
    </>
  );
};

export default React.memo(BannerTable);
