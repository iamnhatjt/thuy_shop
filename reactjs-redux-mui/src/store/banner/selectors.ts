import { useAppDispatch, useAppSelector } from "../hooks";
import { useCallback, useEffect } from "react";
import { AdminBannerState, onToggleAddingBannerPopup } from "./reducers";
import {
  useAddBannerMutation,
  useGetListBannerPaginationQuery,
} from "./bannerApiSlice";

export const useAdminBanner = () => {
  const [addBanner] = useAddBannerMutation();
  const {
    data: bannerResPagination,
    isLoading,
    refetch,
  } = useGetListBannerPaginationQuery({
    pageNum: 4,
    pageSize: 10,
  });

  useEffect(() => {
    refetch();
  }, []);

  const dispath = useAppDispatch();

  const { isOpenAddingPopup } = useAppSelector<AdminBannerState>(
    (state) => state.banner,
  );

  const onAddingBanner = useCallback(
    async (file: any) => {
      try {
        await addBanner(file);
        dispath(onToggleAddingBannerPopup(false));
        refetch();
      } catch (e) {}
    },
    [dispath],
  );

  const onToggleOpenBanner = useCallback(
    (state: boolean) => {
      dispath(onToggleAddingBannerPopup(state));
    },
    [dispath],
  );

  return {
    isOpenAddingPopup,
    onAddingBanner,
    onToggleOpenBanner,
    bannerResPagination,
    isLoading,
  };
};
