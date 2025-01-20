import { configureStore, Middleware } from "@reduxjs/toolkit";
import appReducer, { AppState } from "./app/reducers";
import { bannerApiSlice } from "./banner/bannerApiSlice";

export interface State {
  app: AppState;
}

const listApiSlices = [bannerApiSlice];

const apiReducer = listApiSlices.reduce((acc, slice) => {
  return {
    ...acc,
    [slice.reducerPath]: slice.reducer,
  };
}, {});

const apiMiddleware = listApiSlices.reduce<Middleware[]>((acc, slice) => {
  return [...acc, slice.middleware];
}, []);

export const store = configureStore({
  reducer: {
    app: appReducer,
    ...apiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(...apiMiddleware),
});

// Infer the 'rootState ' and 'appDispatch' type from the store itself

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
