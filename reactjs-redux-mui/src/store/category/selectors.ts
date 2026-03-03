import { useAppDispatch, useAppSelector } from "../hooks";
import { useCallback, useMemo } from "react";
import {
  AdminCategoryState,
  CategoryDataInterface,
  onChangeCategoryPagination,
  onSetEditingCategory,
  onToggleCategoryFormPopup,
} from "./reducers";
import {
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useGetAdminCategoriesQuery,
  useGetCategoriesQuery,
  useUpdateCategoryMutation,
  CreateCategoryDto,
  UpdateCategoryDto,
} from "./categoryApiSlice";
import { shallowEqual } from "react-redux";
import { PaginationInterface } from "../../constant/type";

// ==========================================
// Admin Category Hook
// ==========================================
export const useAdminCategory = () => {
  const { isOpenFormPopup, editingCategory, pagination } =
    useAppSelector<AdminCategoryState>((state) => state.category, shallowEqual);

  const dispatch = useAppDispatch();

  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory, { isLoading: deleteLoading }] =
    useDeleteCategoryMutation();
  const {
    data: categoryResPagination,
    isLoading,
    refetch,
  } = useGetAdminCategoriesQuery(pagination);

  // Also fetch all categories for parent dropdown
  const { data: allCategoriesRes } = useGetAdminCategoriesQuery({
    pageNum: 1,
    pageSize: 100,
  });

  const onCreateCategory = useCallback(
    async (data: CreateCategoryDto) => {
      try {
        await createCategory(data).unwrap();
        dispatch(onToggleCategoryFormPopup(false));
        refetch();
      } catch (e) {}
    },
    [dispatch, refetch, createCategory],
  );

  const onUpdateCategory = useCallback(
    async (id: number, data: UpdateCategoryDto) => {
      try {
        await updateCategory({ id, ...data }).unwrap();
        dispatch(onToggleCategoryFormPopup(false));
        refetch();
      } catch (e) {}
    },
    [dispatch, refetch, updateCategory],
  );

  const onToggleFormPopup = useCallback(
    (state: boolean) => {
      dispatch(onToggleCategoryFormPopup(state));
    },
    [dispatch],
  );

  const onEditCategory = useCallback(
    (category: CategoryDataInterface) => {
      dispatch(onSetEditingCategory(category));
    },
    [dispatch],
  );

  const onChangePagination = useCallback(
    (pagination: PaginationInterface) => {
      dispatch(onChangeCategoryPagination(pagination));
    },
    [dispatch],
  );

  const onDeleteCategory = useCallback(
    async (id: number) => {
      try {
        await deleteCategory(id).unwrap();
        refetch();
      } catch (e) {}
    },
    [deleteCategory, refetch],
  );

  return {
    isOpenFormPopup,
    editingCategory,
    categoryResPagination,
    allCategories: allCategoriesRes?.data || [],
    isLoading,
    onCreateCategory,
    onUpdateCategory,
    onToggleFormPopup,
    onEditCategory,
    onChangePagination,
    onDeleteCategory,
  };
};

// ==========================================
// Navbar Categories Hook (Client)
// ==========================================

interface NavItem {
  title: string;
  url: string;
  subtitle?: { title: string; url: string }[];
}

const DEFAULT_NAV_ITEMS: NavItem[] = [
  {
    title: "Chăn Ga Gối đệm",
    url: "/chan-ga-goi-dem",
    subtitle: [
      { title: "Chăn", url: "/chan-ga-goi-dem/chan" },
      { title: "Ga", url: "/chan-ga-goi-dem/ga" },
      { title: "Gối", url: "/chan-ga-goi-dem/goi" },
      { title: "Đệm", url: "/chan-ga-goi-dem/dem" },
    ],
  },
  {
    title: "Thực phẩm chay",
    url: "/thuc-pham-chay",
    subtitle: [
      { title: "Nấm", url: "/thuc-pham-chay/nam" },
      { title: "Giò chay", url: "/thuc-pham-chay/gio-chay" },
      { title: "Chả ngộ chay", url: "/thuc-pham-chay/cha-ngo-chay" },
      { title: "Miến", url: "/thuc-pham-chay/mien" },
    ],
  },
  {
    title: "Đồ nhựa, đồ gia dụng",
    url: "/do-nhua-do-gia-dung",
    subtitle: [
      { title: "Chậu", url: "/do-nhua-do-gia-dung/chau" },
      { title: "Thau", url: "/do-nhua-do-gia-dung/thau" },
      { title: "Gáo", url: "/do-nhua-do-gia-dung/gao" },
    ],
  },
  {
    title: "Đồ thủy tinh",
    url: "/do-thuy-tinh",
    subtitle: [
      { title: "Ấm chén", url: "/do-thuy-tinh/am-chen" },
      { title: "Bình", url: "/do-thuy-tinh/binh" },
    ],
  },
  { title: "Thông Khuyển mãi", url: "/thong-tin-khuyen-mai" },
  { title: "Bài viết chia sẻ", url: "/bai-viet" },
];

/**
 * Transforms flat category list from API into NavItem tree.
 * Parent categories become top-level items, children become subtitle items.
 */
const transformCategoriesToNavItems = (
  categories: CategoryDataInterface[],
): NavItem[] => {
  if (!categories || categories.length === 0) return [];

  // Separate parents (no parentId) and children
  const parents = categories.filter((c) => !c.parentId && c.isActive);
  const children = categories.filter((c) => !!c.parentId && c.isActive);

  return parents.map((parent) => {
    const childItems = children.filter((c) => c.parentId === parent.id);
    const navItem: NavItem = {
      title: parent.title,
      url: parent.url || `/${parent.id}`,
    };
    if (childItems.length > 0) {
      navItem.subtitle = childItems.map((child) => ({
        title: child.title,
        url: child.url || `/${parent.id}/${child.id}`,
      }));
    }
    return navItem;
  });
};

export const useNavbarCategories = () => {
  const { data, isLoading, isError } = useGetCategoriesQuery({
    pageNum: 1,
    pageSize: 100,
  });

  const navItems = useMemo(() => {
    if (isError || !data?.data || data.data.length === 0) {
      return DEFAULT_NAV_ITEMS;
    }
    const transformed = transformCategoriesToNavItems(data.data);
    return transformed.length > 0 ? transformed : DEFAULT_NAV_ITEMS;
  }, [data, isError]);

  return { navItems, isLoading };
};
