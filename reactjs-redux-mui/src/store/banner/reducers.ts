import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { bannerApiSlice } from "./bannerApiSlice";
import { IResponsePagination, PaginationInterface } from "../../constant/type";

export interface BannerDataInterface {
  id: number;
  createdAt: string;
  updatedAt: string;
  fileName: string;
  url: string;
}

export interface AdminBannerState {
  isOpenAddingPopup: boolean;
  bannerResPagination?: IResponsePagination<BannerDataInterface>;
  pagination: PaginationInterface;
}

const initialState: AdminBannerState = {
  isOpenAddingPopup: false,
  pagination: {
    pageNum: 1,
    pageSize: 10,
  },
};

const bannerSlice = createSlice({
  name: "banner",
  initialState,
  reducers: {
    onToggleAddingBannerPopup: (
      state: AdminBannerState,
      action: PayloadAction<boolean>,
    ) => {
      state.isOpenAddingPopup = action.payload;
    },

    onChangePaginationState: (
      state: AdminBannerState,
      action: PayloadAction<PaginationInterface>,
    ) => {
      state.pagination = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder.addMatcher(
      bannerApiSlice.endpoints.getListBannerPagination.matchFulfilled,
      (state, action) => {
        state.bannerResPagination = action.payload;
      },
    ),
});

export const { onToggleAddingBannerPopup, onChangePaginationState } =
  bannerSlice.actions;

export default bannerSlice.reducer;
