import { useAppDispatch, useAppSelector } from "../hooks";
import { useCallback } from "react";
import {
  AdminBannerState,
  onChangePaginationState,
  onToggleAddingBannerPopup,
} from "./reducers";
import {
  useAddBannerMutation,
  useGetListBannerPaginationQuery,
} from "./bannerApiSlice";
import { shallowEqual } from "react-redux";
import { PaginationInterface } from "../../constant/type";

export const useAdminBanner = () => {
  const { isOpenAddingPopup, pagination } = useAppSelector<AdminBannerState>(
    (state) => state.banner,
    shallowEqual,
  );

  const dispath = useAppDispatch();

  const [addBanner] = useAddBannerMutation();
  const {
    data: bannerResPagination,
    isLoading,
    refetch,
  } = useGetListBannerPaginationQuery(pagination);

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

  const onChangePagination = useCallback(
    (pagination: PaginationInterface) => {
      dispath(onChangePaginationState(pagination));
    },
    [dispath],
  );

  return {
    isOpenAddingPopup,
    onAddingBanner,
    onToggleOpenBanner,
    bannerResPagination,
    isLoading,
    onChangePagination,
  };
};
