---
name: best-practice-reactjs
description: Best practices, conventions, and patterns for this React + TypeScript + Redux Toolkit + MUI project
---

# React + TypeScript + MUI Best Practices

> This SKILL defines the rules, conventions, and patterns the AI must follow when working on this project.

---

## 1. Technology Stack

| Layer          | Technology                                                    |
| -------------- | ------------------------------------------------------------- |
| **Framework**  | React 18 (CRA - Create React App)                             |
| **Language**   | TypeScript (strict mode, `baseUrl: "src"`)                    |
| **State**      | Redux Toolkit (`createSlice`, `createAsyncThunk`, RTK Query)  |
| **UI Library** | MUI v5 (`@mui/material`, `@emotion/react`, `@emotion/styled`) |
| **Theming**    | MUI `CssVarsProvider` + `extendTheme` (light/dark)            |
| **Routing**    | React Router v6 (`createBrowserRouter`, `RouterProvider`)     |
| **Forms**      | Formik + Yup                                                  |
| **HTTP**       | RTK Query (`fetchBaseQuery`) + Axios (async thunks)           |
| **i18n**       | i18next + react-i18next (en / vi)                             |
| **Date**       | Day.js                                                        |
| **Icons**      | `@iconify/react` + `@mui/icons-material`                      |
| **Formatting** | Prettier                                                      |

---

## 2. Project Structure

```
src/
├── index.tsx                 # App entry point
├── index.css                 # Global styles
├── Routers.tsx               # All route definitions
├── constant/                 # App-wide constants
│   ├── index.ts              # Exported constants (API_URL, token keys, etc.)
│   ├── endpoint.ts           # API endpoint paths
│   ├── paths.ts              # Route path constants
│   ├── enums.ts              # Shared enums (ThemeMode, HttpStatusCode)
│   ├── type.ts               # Shared TypeScript interfaces/types
│   └── regex.ts              # Reusable regex patterns
├── contexts/                 # React context providers
│   ├── AppProvider.tsx        # Root provider (Redux + Theme + i18n)
│   └── ThemeProvider.tsx      # MUI CssVarsProvider setup
├── store/                    # Redux store
│   ├── configureStore.ts      # Store config + RootState + AppDispatch exports
│   ├── customFetchBase.ts     # RTK Query base query with auth headers
│   ├── hooks.ts              # Typed useAppDispatch / useAppSelector
│   ├── app/                  # App-global slice (auth, sidebar, profile)
│   │   ├── reducers.ts
│   │   ├── action.ts
│   │   └── selectors.ts
│   └── <domain>/             # Feature-specific slices
│       ├── reducers.ts
│       ├── <domain>ApiSlice.ts
│       └── selectors.ts
├── features/                 # Feature pages/screens
│   ├── admin/                # Admin-side features
│   └── client/               # Client-side features
├── layouts/                  # Layout components
│   ├── MainLayout.tsx         # Client layout (Header + Outlet)
│   ├── AdminLayout.tsx        # Admin layout (Drawer + Outlet)
│   ├── Header/               # Header components
│   └── sharedComponents/     # Reusable UI components
├── hooks/                    # Custom React hooks
├── utils/                    # Utility functions
│   ├── index.ts              # General helpers (debounce, sleep, formatDate, getTheme)
│   ├── storage.ts            # localStorage / sessionStorage wrappers
│   ├── colorSchemes.ts       # MUI color scheme definitions
│   └── i18n.ts               # i18next initialization
├── dictionaries/             # Translation files
│   ├── en/
│   ├── vi/
│   └── types/
└── icons/                    # Custom icon components
```

### Rules

- **Absolute imports only** — The `tsconfig.json` sets `baseUrl: "src"`, so always import from the `src` root. Use `import { API_URL } from "constant"` not `"../../constant"`.
- **Feature-based organization** — Each domain gets its own folder under `features/` and `store/`.
- **No business logic in components** — Components only render UI. Business logic lives in `store/` slices, actions, and selector hooks.

---

## 3. Redux Store Patterns

### 3.1 Store Configuration

The store is configured in `store/configureStore.ts`. All API slices are registered via a dynamic `listApiSlices` array:

```typescript
import { configureStore, Middleware } from "@reduxjs/toolkit";
import { bannerApiSlice } from "./banner/bannerApiSlice";

const listApiSlices = [bannerApiSlice]; // ADD new API slices here

const apiReducer = listApiSlices.reduce(
  (acc, slice) => ({
    ...acc,
    [slice.reducerPath]: slice.reducer,
  }),
  {},
);

const apiMiddleware = listApiSlices.reduce<Middleware[]>((acc, slice) => {
  return [...acc, slice.middleware];
}, []);

export const store = configureStore({
  reducer: {
    app: appReducer,
    banner: bannerSlice,
    ...apiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(...apiMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

### 3.2 Typed Hooks

Always use the typed hooks from `store/hooks.ts`:

```typescript
import { useAppDispatch, useAppSelector } from "store/hooks";
```

**NEVER** use raw `useDispatch` or `useSelector` from react-redux directly.

### 3.3 Slice Pattern (per domain)

Each domain folder under `store/` contains three files:

#### `reducers.ts` — State shape + slice

```typescript
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface BannerDataInterface {
  id: number;
  createdAt: string;
  updatedAt: string;
  fileName: string;
  url: string;
}

export interface AdminBannerState {
  isOpenAddingPopup: boolean;
  bannerResPagination?: IResponsePagination<BannerDataInterface>;
  pagination: PaginationInterface;
}

const initialState: AdminBannerState = {
  isOpenAddingPopup: false,
  pagination: { pageNum: 1, pageSize: 10 },
};

const bannerSlice = createSlice({
  name: "banner",
  initialState,
  reducers: {
    onToggleAddingBannerPopup: (state, action: PayloadAction<boolean>) => {
      state.isOpenAddingPopup = action.payload;
    },
    onChangePaginationState: (
      state,
      action: PayloadAction<PaginationInterface>,
    ) => {
      state.pagination = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder.addMatcher(
      bannerApiSlice.endpoints.getListBannerPagination.matchFulfilled,
      (state, action) => {
        state.bannerResPagination = action.payload;
      },
    ),
});
```

#### `<domain>ApiSlice.ts` — RTK Query API

```typescript
import { createApi } from "@reduxjs/toolkit/query/react";
import customFetchBase from "store/customFetchBase";

export const bannerApiSlice = createApi({
  reducerPath: "bannerApi",
  baseQuery: customFetchBase,
  tagTypes: ["Banners"],
  endpoints: (builder) => ({
    getListBanners: builder.query({
      query: () => ({
        url: Endpoint.BANNER,
        params: { pageNum: 1, pageSize: 10 },
      }),
      providesTags: ["Banners"],
    }),
    addBanner: builder.mutation({
      query: (banner) => ({
        url: Endpoint.BANNER,
        method: "POST",
        body: banner,
      }),
    }),
  }),
});

export const { useGetListBannersQuery, useAddBannerMutation } = bannerApiSlice;
```

**Rules:**

- Always use `customFetchBase` as the `baseQuery` — it injects the Bearer token automatically.
- Use `tagTypes` and `providesTags` / `invalidatesTags` for cache management.
- Export auto-generated hooks.

#### `selectors.ts` — Domain-specific custom hooks

This is the **selector hook pattern** — the primary way components access store data:

```typescript
export const useAdminBanner = () => {
  const { isOpenAddingPopup, pagination } = useAppSelector<AdminBannerState>(
    (state) => state.banner,
    shallowEqual,
  );
  const dispatch = useAppDispatch();
  const [addBanner] = useAddBannerMutation();

  const onAddingBanner = useCallback(async (file: any) => {
    try {
      await addBanner(file);
      dispatch(onToggleAddingBannerPopup(false));
      refetch();
    } catch (e) {}
  }, [dispatch, refetch, addBanner]);

  return { isOpenAddingPopup, onAddingBanner, ... };
};
```

**Rules:**

- **Always use `shallowEqual`** when selecting objects from the store to prevent unnecessary re-renders.
- **Wrap action dispatchers in `useCallback`** and return them from the hook.
- **Components should only consume these hooks**, never dispatch actions directly.
- This pattern keeps components thin and testable.

### 3.4 Async Thunks

For complex async logic beyond simple CRUD (auth, multi-step processes), use `createAsyncThunk`:

```typescript
export const signin = createAsyncThunk(
  "app/signin",
  async (data: SigninData) => {
    const response = await api.post(Endpoint.SIGNIN, data);
    if (response?.status === HttpStatusCode.Ok) {
      return response.data;
    }
    throw AN_ERROR_TRY_RELOAD_PAGE;
  },
);
```

Handle thunk results in `extraReducers`:

```typescript
extraReducers: (builder) =>
  builder.addCase(signin.fulfilled, (state, action) => {
    state.token = action.payload.accessToken;
  });
```

---

## 4. Component Patterns

### 4.1 Naming

| Item               | Convention                                             |
| ------------------ | ------------------------------------------------------ |
| Components         | PascalCase, `.tsx` extension                           |
| Hooks              | `use` prefix, camelCase, `.ts` or `.tsx` extension     |
| Constants          | UPPER_SNAKE_CASE                                       |
| Types / Interfaces | PascalCase, `Interface` or `Props` suffix              |
| Enums              | PascalCase name, UPPER_SNAKE_CASE or PascalCase values |
| Slices             | camelCase, file named `reducers.ts`                    |
| Selectors          | `use` prefix hooks, file named `selectors.ts`          |

### 4.2 Component Structure

```typescript
import { memo } from "react";
import { Stack, Typography } from "@mui/material";
import { useAdminBanner } from "store/banner/selectors";

interface MyComponentProps {
  title: string;
}

const MyComponent = ({ title }: MyComponentProps) => {
  const { isOpenAddingPopup, onToggleOpenBanner } = useAdminBanner();

  return (
    <Stack>
      <Typography variant="h6">{title}</Typography>
    </Stack>
  );
};

export default memo(MyComponent);
```

**Rules:**

- **Use functional components** exclusively — no class components.
- **Use `memo`** on layout and list-item components to prevent unnecessary re-renders.
- **Destructure props** in the function signature.
- **Keep components focused** — one component, one responsibility.
- **Co-locate sub-components** in the same feature directory.

### 4.3 Shared/Reusable Components

Place reusable UI components in `src/layouts/sharedComponents/`:

| Component     | Purpose                           |
| ------------- | --------------------------------- |
| `InputCustom` | Styled MUI TextField wrapper      |
| `TableCustom` | Table with pagination             |
| `DropZone`    | File upload area (react-dropzone) |
| `Iconify`     | Icon wrapper (@iconify/react)     |
| `Loading`     | Loading spinner                   |
| `Logo`        | App logo                          |
| `Menu`        | Navigation menu                   |
| `SideBar`     | Sidebar navigation                |
| `Wrapper`     | Page content wrapper              |

---

## 5. Routing

Use React Router v6 with `createBrowserRouter`:

```typescript
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const listRouterPaths: RouteObject[] = [
  // Public routes (no layout)
  { path: SIGNIN_PATH, element: <Signin /> },

  // Client routes (MainLayout)
  {
    path: HOME_PATH,
    element: <MainLayout />,
    children: [{ path: "", element: <Home /> }],
  },

  // Admin routes (AdminLayout)
  {
    path: ADMIN_PATH,
    element: <AdminLayout />,
    children: [{ path: ADMIN_BANNER_PATH, element: <AdminBanner /> }],
  },
];
```

**Rules:**

- **Define all path constants** in `constant/paths.ts`.
- **Group routes by layout** — public, client (MainLayout), admin (AdminLayout).
- **Layouts use `<Outlet />`** for nested route rendering.

---

## 6. Theming

### 6.1 Color Scheme

Color schemes are defined in `utils/colorSchemes.ts` with full light/dark mode support. The theme is created via `extendTheme` and applied with `CssVarsProvider`:

```typescript
const theme = extendTheme({ colorSchemes });

<CssVarsProvider theme={theme} defaultMode={DEFAULT_MODE}>
  <CssBaseline />
  {children}
</CssVarsProvider>
```

**Rules:**

- **Never hardcode colors** — always use `theme.palette.*` or MUI's `sx` prop with palette references.
- **Use `sx` prop** for component-level styling instead of creating separate CSS/styled components.
- **Extend the theme** for custom palette keys (e.g., `customColor`, `positive`, `purple`).

### 6.2 Dark Mode

- Theme mode is persisted in localStorage under key `app_mode`.
- System preference detection is handled via `getThemeSystem()`.
- Toggle via `useColorScheme()` from MUI.

---

## 7. Forms & Validation

Use **Formik** for form state management and **Yup** for schema validation:

```typescript
import { useFormik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object({
  email: yup.string().email("Invalid email").required("Required"),
  password: yup.string().min(6).required("Required"),
});

const formik = useFormik({
  initialValues: { email: "", password: "" },
  validationSchema,
  onSubmit: (values) => {
    /* handle */
  },
});
```

**Rules:**

- Use `InputCustom` component from shared components for consistent form field styling.
- Use regex patterns from `constant/regex.ts` for custom validations.

---

## 8. Internationalization (i18n)

### Setup

Configured in `utils/i18n.ts` with dictionaries under `dictionaries/{en,vi}/`:

```typescript
i18n.use(initReactI18next).init({
  resources,
  lng: clientStorage.get(LANGUAGE_STORAGE_KEY) || "en",
  interpolation: { escapeValue: false },
});
```

### Usage

```typescript
import { useTranslation } from "react-i18next";

const { t } = useTranslation();
<Typography>{t("common.welcome")}</Typography>
```

**Rules:**

- **Never hardcode user-facing strings** — always use translation keys.
- **Language preference** is stored in localStorage under key `language`.
- **Add translations in both** `en/` and `vi/` directories.
- **Type-safe keys** are defined in `dictionaries/types/`.

---

## 9. API Communication

### 9.1 Custom Fetch Base (RTK Query)

`store/customFetchBase.ts` automatically injects Bearer tokens:

```typescript
const customFetchBase = fetchBaseQuery({
  baseUrl: API_URL,
  prepareHeaders: (headers) => {
    const accessToken = clientStorage.get(ACCESS_TOKEN_STORAGE_KEY);
    if (accessToken) {
      headers.set("Authorization", `Bearer ${accessToken}`);
    }
    return headers;
  },
});
```

### 9.2 API Endpoints

All endpoint paths are centralized in `constant/endpoint.ts`:

```typescript
export const Endpoint = {
  REFRESH_TOKEN: "",
  GET_PROFILE: "/GET_PROFILE",
  BANNER: "/banner",
};
```

**Rules:**

- **All API endpoints** must be added to `constant/endpoint.ts`.
- **Use RTK Query** (`createApi`) for standard CRUD operations.
- **Use `createAsyncThunk`** only for complex flows (auth, multi-step operations).
- **Environment variables** prefixed with `REACT_APP_` for API URLs.

---

## 10. Storage

Use the storage wrappers from `utils/storage.ts`:

```typescript
import { clientStorage, sessionStorage } from "utils/storage";

// localStorage
clientStorage.set("key", value);
clientStorage.get("key");
clientStorage.remove("key");

// sessionStorage
sessionStorage.set("key", value);
sessionStorage.get("key");
```

**Rules:**

- **Never access `localStorage` or `sessionStorage` directly**.
- Always use `clientStorage` or `sessionStorage` wrappers.
- Values are automatically JSON serialized/deserialized.

---

## 11. Custom Hooks

Place reusable hooks in `src/hooks/`:

| Hook            | Purpose                         |
| --------------- | ------------------------------- |
| `useBreakpoint` | Responsive breakpoint detection |
| `useTheme`      | Theme mode access               |
| `useToggle`     | Boolean toggle state            |
| `useTranslate`  | Translation shorthand           |
| `useWindowSize` | Window dimensions tracking      |

**Rules:**

- **Prefix with `use`** — always follow the React hooks convention.
- Keep hooks **pure and focused** — one concern per hook.
- Place **domain-specific hooks** in `store/<domain>/selectors.ts`, not in `hooks/`.
- Place **generic, reusable hooks** in `src/hooks/`.

---

## 12. Type Safety

### Shared Types (`constant/type.ts`)

```typescript
export interface IResponse<T> {
  data: T[];
  code: string;
}

export interface IResponsePagination<T> extends IResponse<T> {
  pagination: IPagination;
}

export interface PaginationInterface {
  pageNum: number;
  pageSize: number;
}
```

**Rules:**

- **Define shared interfaces** in `constant/type.ts`.
- **Define domain interfaces** in the corresponding `store/<domain>/reducers.ts`.
- **Always type** function params, return types, and state shapes.
- Use `RootState` and `AppDispatch` types from `store/configureStore.ts`.
- **Prefer interfaces** over type aliases for object shapes.
- **Use enums** from `constant/enums.ts` for fixed value sets.

---

## 13. Layout System

### Client Layout (`MainLayout`)

```
┌──────────────────────────────┐
│           Header             │
├──────────────────────────────┤
│                              │
│     <Outlet /> (content)     │
│                              │
└──────────────────────────────┘
```

### Admin Layout (`AdminLayout`)

```
┌─────────┬────────────────────┐
│         │                    │
│ Drawer  │  <Outlet />        │
│ (240px) │  (content)         │
│         │                    │
└─────────┴────────────────────┘
```

**Rules:**

- Use MUI `Stack` for layout composition.
- Layouts always render `<Outlet />` for nested routes.
- **Memoize layout components** with `memo()`.

---

## 14. Error Handling

```typescript
// Use the constant for generic errors
import { AN_ERROR_TRY_RELOAD_PAGE } from "constant";

// In async thunks
try {
  const response = await api.get(url);
  if (response?.status === HttpStatusCode.Ok) return response.data;
  throw AN_ERROR_TRY_RELOAD_PAGE;
} catch (e) {
  throw e;
}
```

**Rules:**

- **Use try/catch** in all async operations.
- **Use the `AN_ERROR_TRY_RELOAD_PAGE` constant** as the generic error message key.
- **Use i18n keys** for user-facing error messages.
- **Never swallow errors silently** — at minimum, log them.

---

## 15. Adding a New Feature Checklist

When adding a new feature (e.g., "Product"), follow this checklist:

1. **Constants**

   - [ ] Add API endpoint to `constant/endpoint.ts`
   - [ ] Add route path to `constant/paths.ts`
   - [ ] Add any new enums to `constant/enums.ts`
   - [ ] Add shared types to `constant/type.ts`

2. **Store**

   - [ ] Create `store/product/reducers.ts` — state interface + slice
   - [ ] Create `store/product/productApiSlice.ts` — RTK Query API
   - [ ] Create `store/product/selectors.ts` — selector hooks
   - [ ] Register API slice in `store/configureStore.ts` (`listApiSlices` array)
   - [ ] Register reducer in `store/configureStore.ts` (`reducer` object)

3. **Feature UI**

   - [ ] Create page component in `features/client/product/` or `features/admin/product/`
   - [ ] Use selector hooks from `selectors.ts` for state access
   - [ ] Use shared components from `layouts/sharedComponents/`

4. **Routing**

   - [ ] Add route to `Routers.tsx` under the appropriate layout

5. **i18n**
   - [ ] Add translation keys to both `dictionaries/en/` and `dictionaries/vi/`

---

## 16. Environment Variables

All env vars are prefixed with `REACT_APP_`:

```env
REACT_APP_API_URL=https://api.example.com
REACT_APP_HOT_LINE=1900xxxx
```

**Rules:**

- Define env vars in `.env` (gitignored) and `.env.example` (committed).
- Access via `process.env.REACT_APP_*`.
- Cast to `string` when assigning to constants.

---

## 17. Code Style

- **Prettier** is configured (`.prettierrc`) — run before committing.
- **ESLint** extends `react-app` and `react-app/jest`.
- **No implicit any** is disabled (`noImplicitAny: false`) but strive for full typing.
- **Strict mode** is enabled in TypeScript.
- Use **arrow functions** for components and callbacks.
- Use **`const`** by default; `let` only when mutation is needed.

---

## 18. Testing

- Use **React Testing Library** (`@testing-library/react`, `@testing-library/jest-dom`).
- Test files co-located with components: `ComponentName.test.tsx`.
- Focus on **user behavior**, not implementation details.
- Mock Redux store using `@reduxjs/toolkit` test utilities.

---

## 19. Performance Optimization

- **`memo()`** on layout components and list items.
- **`useCallback`** for event handlers passed as props.
- **`useMemo`** for expensive computations.
- **`shallowEqual`** in `useAppSelector` when selecting objects.
- **Code-split** routes with `React.lazy` + `Suspense` for large feature modules.
- **RTK Query caching** — leverage `providesTags` / `invalidatesTags`.

---

## 20. Common Anti-Patterns to AVOID

| ❌ Don't                                  | ✅ Do                                       |
| ----------------------------------------- | ------------------------------------------- |
| Use raw `useDispatch` / `useSelector`     | Use `useAppDispatch` / `useAppSelector`     |
| Access `localStorage` directly            | Use `clientStorage` from `utils/storage.ts` |
| Hardcode strings in UI                    | Use `t("key")` from i18next                 |
| Hardcode API URLs                         | Use `Endpoint` from `constant/endpoint.ts`  |
| Hardcode route paths                      | Use path constants from `constant/paths.ts` |
| Hardcode colors                           | Use MUI theme palette                       |
| Put business logic in components          | Put it in store slices / selector hooks     |
| Use relative imports like `../../`        | Use absolute imports from `src` root        |
| Dispatch actions directly in components   | Use selector hooks from `selectors.ts`      |
| Create standalone CSS files per component | Use MUI `sx` prop                           |
