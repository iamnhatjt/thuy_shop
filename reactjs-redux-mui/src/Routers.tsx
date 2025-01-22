import {
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Signin from "./features/Signin";
import Home from "features/home";
const listRouterPaths: RouteObject[] = [
  // with no wrapper
  {
    path: "/signin",
    element: <Signin />,
  },
  //With wrapper
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
    ],
  },
];

const createRouter = createBrowserRouter(listRouterPaths);

const Routers = () => {
  return <RouterProvider router={createRouter} />;
};

export default Routers;
