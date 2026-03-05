import { createAsyncThunk } from "@reduxjs/toolkit";
import { Endpoint } from "../../constant/endpoint";
import { API_URL } from "../../constant";

export type SigninData = {
  email: string;
  password: string;
};

export const signin = createAsyncThunk(
  "app/signin",
  async (data: SigninData, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}${Endpoint.AUTH_LOGIN}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        return rejectWithValue(result?.message || "Login failed");
      }

      return result.data as { accessToken: string; refreshToken: string };
    } catch (e) {
      return rejectWithValue("Network error. Please try again.");
    }
  },
);

export const getProfile = createAsyncThunk("app/getProfile", async () => {
  try {
    const response: any = {};
    return response;
  } catch (err) {
    throw err;
  }
});
