import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { ACCESS_TOKEN_STORAGE_KEY, API_URL } from "constant";
import { clientStorage } from "utils/storage";

const customFetchBase = fetchBaseQuery({
  baseUrl: API_URL,
  prepareHeaders: (headers, { getState }) => {
    const accessToken = clientStorage.get(ACCESS_TOKEN_STORAGE_KEY);
    if (accessToken) {
      headers.set("Authorization", `Bearer ${accessToken}`);
    }
    return headers;
  },
});

export default customFetchBase;
