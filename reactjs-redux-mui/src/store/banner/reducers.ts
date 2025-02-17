import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AdminBannerState {
  isOpenAddingPopup: boolean;
}

const initialState: AdminBannerState = {
  isOpenAddingPopup: false,
};

const bannerSlice = createSlice({
  name: "banner",
  initialState,
  reducers: {
    onToggleAddingBannerPopup: (state, action: PayloadAction<boolean>) => {
      state.isOpenAddingPopup = action.payload;
    },
  },
  extraReducers: (builder) => builder,
});

export const { onToggleAddingBannerPopup } = bannerSlice.actions;

export default bannerSlice.reducer;
