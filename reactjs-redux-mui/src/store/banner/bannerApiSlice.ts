import { createApi } from "@reduxjs/toolkit/query/react";
import { Endpoint } from "constant/endpoint";
import customFetchBase from "store/customFetchBase";

export interface ISlide {
  fileName: string;
  url: string;
}

export const bannerApiSlice = createApi({
  reducerPath: "bannerApi",
  baseQuery: customFetchBase,
  tagTypes: ["Banners"],
  endpoints: (builder) => ({
    getListBanners: builder.query({
      query: () => ({
        url: Endpoint.BANNER,
        params: {
          pageNum: 1,
          pageSize: 10,
        },
      }),
      providesTags: ["Banners"],
    }),
    getListBannerPagination: builder.query({
      query: (params) => ({
        url: Endpoint.BANNER,
        params,
      }),
    }),
    addBanner: builder.mutation({
      query: (banner) => ({
        url: Endpoint.BANNER,
        method: "POST",
        body: banner,
      }),
    }),
    deleteBanner: builder.mutation({
      query: (id) => ({
        url: `${Endpoint.BANNER}/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetListBannersQuery,
  useGetListBannerPaginationQuery,
  useAddBannerMutation,
  useDeleteBannerMutation,
} = bannerApiSlice;
