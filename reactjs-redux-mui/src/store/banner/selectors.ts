import { useAppDispatch, useAppSelector } from "../hooks";
import { useCallback } from "react";
import { AdminBannerState, onToggleAddingBannerPopup } from "./reducers";

export const useAdminBanner = () => {
  const dispath = useAppDispatch();

  const { isOpenAddingPopup } = useAppSelector<AdminBannerState>(
    (state) => state.banner,
  );

  const onAddingBanner = useCallback(async () => {
    dispath(onToggleAddingBannerPopup(false));
  }, [dispath]);

  return {
    isOpenAddingPopup,
    onAddingBanner,
  };
};
