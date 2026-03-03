import { createApi } from "@reduxjs/toolkit/query/react";
import { Endpoint } from "constant/endpoint";
import customFetchBase from "store/customFetchBase";

export interface CreateCategoryDto {
  title: string;
  isActive?: boolean;
  parentId?: number | null;
}

export interface UpdateCategoryDto {
  title?: string;
  isActive?: boolean;
  parentId?: number | null;
}

export const categoryApiSlice = createApi({
  reducerPath: "categoryApi",
  baseQuery: customFetchBase,
  tagTypes: ["Categories", "AdminCategories"],
  endpoints: (builder) => ({
    // Public endpoints
    getCategories: builder.query({
      query: (params) => ({
        url: Endpoint.CATEGORY,
        params,
      }),
      providesTags: ["Categories"],
    }),
    getCategoryById: builder.query({
      query: (id: number) => ({
        url: `${Endpoint.CATEGORY}/${id}`,
      }),
    }),

    // Admin endpoints
    getAdminCategories: builder.query({
      query: (params) => ({
        url: Endpoint.ADMIN_CATEGORY,
        params,
      }),
      providesTags: ["AdminCategories"],
    }),
    getAdminCategory: builder.query({
      query: (id: number) => ({
        url: `${Endpoint.ADMIN_CATEGORY}/${id}`,
      }),
    }),
    createCategory: builder.mutation({
      query: (data: CreateCategoryDto) => ({
        url: Endpoint.ADMIN_CATEGORY,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["AdminCategories", "Categories"],
    }),
    updateCategory: builder.mutation({
      query: ({ id, ...data }: UpdateCategoryDto & { id: number }) => ({
        url: `${Endpoint.ADMIN_CATEGORY}/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["AdminCategories", "Categories"],
    }),
    deleteCategory: builder.mutation({
      query: (id: number) => ({
        url: `${Endpoint.ADMIN_CATEGORY}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["AdminCategories", "Categories"],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetCategoryByIdQuery,
  useGetAdminCategoriesQuery,
  useGetAdminCategoryQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApiSlice;
