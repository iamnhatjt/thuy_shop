import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IResponsePagination, PaginationInterface } from "../../constant/type";
import { categoryApiSlice } from "./categoryApiSlice";

export interface CategoryDataInterface {
  id: number;
  createdAt: string;
  updatedAt: string;
  title: string;
  url: string;
  isActive: boolean;
  parentId: number | null;
  parent?: CategoryDataInterface;
  children?: CategoryDataInterface[];
}

export interface AdminCategoryState {
  isOpenFormPopup: boolean;
  editingCategory?: CategoryDataInterface;
  categoryResPagination?: IResponsePagination<CategoryDataInterface>;
  pagination: PaginationInterface;
}

const initialState: AdminCategoryState = {
  isOpenFormPopup: false,
  pagination: {
    pageNum: 1,
    pageSize: 10,
  },
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    onToggleCategoryFormPopup: (
      state: AdminCategoryState,
      action: PayloadAction<boolean>,
    ) => {
      state.isOpenFormPopup = action.payload;
      if (!action.payload) {
        state.editingCategory = undefined;
      }
    },
    onSetEditingCategory: (
      state: AdminCategoryState,
      action: PayloadAction<CategoryDataInterface | undefined>,
    ) => {
      state.editingCategory = action.payload;
      state.isOpenFormPopup = !!action.payload;
    },
    onChangeCategoryPagination: (
      state: AdminCategoryState,
      action: PayloadAction<PaginationInterface>,
    ) => {
      state.pagination = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder.addMatcher(
      categoryApiSlice.endpoints.getAdminCategories.matchFulfilled,
      (state, action) => {
        state.categoryResPagination = action.payload;
      },
    ),
});

export const {
  onToggleCategoryFormPopup,
  onSetEditingCategory,
  onChangeCategoryPagination,
} = categorySlice.actions;

export default categorySlice.reducer;
