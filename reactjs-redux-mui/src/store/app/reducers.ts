import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { clientStorage } from "../../utils/storage";
import {
  ACCESS_TOKEN_STORAGE_KEY,
  REFRESH_TOKEN_STORAGE_KEY,
} from "../../constant";
import { getProfile, signin } from "./action";

export interface UserInfo {
  //add type here
}

export interface AppState {
  appReady: boolean;
  token?: string;
  tokenRegister?: string;
  isExpandedSlideBar: boolean;
  userData?: UserInfo;
}

const initialState: AppState = {
  appReady: false,
  isExpandedSlideBar: true,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    onExpandedSlideBar: (state, action: PayloadAction<boolean | undefined>) => {
      state.isExpandedSlideBar = action?.payload ?? !state.isExpandedSlideBar;
    },
    toggleAppReady: (state, action: PayloadAction<boolean | undefined>) => {
      state.appReady = action?.payload ?? !state.appReady;
    },
    updateAuth: (
      state,
      action: PayloadAction<{
        accessToken?: string | null;
      }>,
    ) => {
      state.token = action.payload.accessToken || undefined;
    },
    clearAuth: (state) => {
      state.token = undefined;

      clientStorage.remove(ACCESS_TOKEN_STORAGE_KEY);
      clientStorage.remove(REFRESH_TOKEN_STORAGE_KEY);
    },
    reset: () => ({ ...initialState, appReady: true }),
  },
  extraReducers: (builder) =>
    builder
      .addCase(
        signin.fulfilled,
        (
          state,
          action: PayloadAction<{ accessToken: string; refreshToken: string }>,
        ) => {
          const { accessToken, refreshToken } = action.payload;

          clientStorage.set(ACCESS_TOKEN_STORAGE_KEY, accessToken);
          clientStorage.set(REFRESH_TOKEN_STORAGE_KEY, refreshToken);

          state.token = accessToken;
        },
      )
      .addCase(
        getProfile.fulfilled,
        (state, action: PayloadAction<UserInfo>) => {
          state.userData = Object.assign(state?.userData ?? {}, action.payload);
        },
      ),
});

export const {
  onExpandedSlideBar,
  toggleAppReady,
  updateAuth,
  clearAuth,
  reset,
} = appSlice.actions;

export default appSlice.reducer;
