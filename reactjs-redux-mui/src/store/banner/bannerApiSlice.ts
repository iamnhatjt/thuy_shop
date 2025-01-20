import { createApi } from "@reduxjs/toolkit/query/react";
import { Endpoint } from "api/endpoint";
import customFetchBase from "store/customFetchBase";

export const bannerApiSlice = createApi({
  reducerPath: "bannerApi",
  baseQuery: customFetchBase,
  tagTypes: ["Banners"],
  endpoints: (builder) => ({
    getListBanners: builder.query({
      query: () => Endpoint.BANNER,
    }),
  }),
});

export const { useGetListBannersQuery } = bannerApiSlice;
