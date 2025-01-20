import { createAsyncThunk } from "@reduxjs/toolkit";
import { Endpoint } from "../../api/endpoint";
import { HttpStatusCode } from "axios";
import { AN_ERROR_TRY_RELOAD_PAGE } from "../../constant";

export type SigninData = {
  email: string;
  password: string;
};

export const signin = createAsyncThunk(
  "app/signin",
  async (data: SigninData) => {
    try {
      const response: any = {};
      if (response?.status === HttpStatusCode.Ok) {
        return response.data;
      }
      throw AN_ERROR_TRY_RELOAD_PAGE;
    } catch (e) {
      throw e;
    }
  },
);

export const getProfile = createAsyncThunk("app/getProfile", async () => {
  try {
    const response: any = {};

    if (response?.status === HttpStatusCode.Ok) {
      return response;
    }

    throw AN_ERROR_TRY_RELOAD_PAGE;
  } catch (err) {
    throw err;
  }
});
