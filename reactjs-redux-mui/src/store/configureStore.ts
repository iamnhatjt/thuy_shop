import { configureStore } from "@reduxjs/toolkit";
import appReducer, { AppState } from "./app/reducers";

export interface State {
  app: AppState;
}

export const store = configureStore({
  reducer: {
    app: appReducer,
  },
});

// Infer the 'rootState ' and 'appDispatch' type from the store itself

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
