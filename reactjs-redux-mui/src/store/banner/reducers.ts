import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { bannerApiSlice } from "./bannerApiSlice";
import { IResponsePagination } from "../../common/response.interface";

interface BannerDataInterface {
  id: number;
  createdAt: string;
  updatedAt: string;
  fileName: string;
  url: string;
}

export interface AdminBannerState {
  isOpenAddingPopup: boolean;
  bannerResPagination?: IResponsePagination<BannerDataInterface>;
}

const initialState: AdminBannerState = {
  isOpenAddingPopup: false,
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
  },
  extraReducers: (builder) =>
    builder.addMatcher(
      bannerApiSlice.endpoints.getListBannerPagination.matchFulfilled,
      (state, action) => {
        state.bannerResPagination = action.payload;
      },
    ),
});

export const { onToggleAddingBannerPopup } = bannerSlice.actions;

export default bannerSlice.reducer;
