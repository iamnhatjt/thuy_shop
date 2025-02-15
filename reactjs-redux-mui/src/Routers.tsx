import {
  createBrowserRouter,
  RouteObject,
  RouterProvider,
} from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Signin from "./features/client/Signin";
import Home from "./features/client/home";
import AdminLayout from "./layouts/AdminLayout";
import {
  ADMIN_BANNER_PATH,
  ADMIN_PATH,
  HOME_PATH,
  SIGNIN_PATH,
} from "./constant/paths";

const listRouterPaths: RouteObject[] = [
  // with no wrapper
  {
    path: SIGNIN_PATH,
    element: <Signin />,
  },
  //With wrapper
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
  //With admin wrapper
  {
    path: ADMIN_PATH,
    element: <AdminLayout />,
    children: [
      {
        path: ADMIN_BANNER_PATH,
        element: <>12</>,
      },
    ],
  },
];

const createRouter = createBrowserRouter(listRouterPaths);

const Routers = () => {
  return <RouterProvider router={createRouter} />;
};

export default Routers;
