import { createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../../api/client";
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
      const response = await client.post(Endpoint.REFRESH_TOKEN, data);
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
    const response = await client.get(Endpoint.GET_PROFILE);
    if (response?.status === HttpStatusCode.Ok) {
      return response;
    }

    throw AN_ERROR_TRY_RELOAD_PAGE;
  } catch (err) {
    throw err;
  }
});
