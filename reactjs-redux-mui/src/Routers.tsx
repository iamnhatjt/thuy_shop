import {
  createBrowserRouter,
  RouteObject,
  RouterProvider,
} from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./features/client/home";
import AdminLayout from "./layouts/AdminLayout";
import ProtectedRoute from "./layouts/ProtectedRoute";
import AdminLogin from "./features/admin/login/AdminLogin";
import {
  ADMIN_BANNER_PATH,
  ADMIN_CATEGORY_PATH,
  ADMIN_LOGIN_PATH,
  ADMIN_PATH,
  HOME_PATH,
  SIGNIN_PATH,
} from "./constant/paths";
import AdminBanner from "./features/admin/banner";
import AdminCategory from "./features/admin/category";
import Signin from "./features/client/Signin";

const listRouterPaths: RouteObject[] = [
  // Client signin
  {
    path: SIGNIN_PATH,
    element: <Signin />,
  },
  // Admin login (public)
  {
    path: ADMIN_LOGIN_PATH,
    element: <AdminLogin />,
  },
  // Client layout
  {
    path: HOME_PATH,
    element: <MainLayout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
    ],
  },
  // Admin layout (protected)
  {
    path: ADMIN_PATH,
    element: <ProtectedRoute />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          {
            path: ADMIN_BANNER_PATH,
            element: <AdminBanner />,
          },
          {
            path: ADMIN_CATEGORY_PATH,
            element: <AdminCategory />,
          },
        ],
      },
    ],
  },
];

const createRouter = createBrowserRouter(listRouterPaths);

const Routers = () => {
  return <RouterProvider router={createRouter} />;
};

export default Routers;
