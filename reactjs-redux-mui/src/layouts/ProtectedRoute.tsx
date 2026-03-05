import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../store/app/selectors";
import { ADMIN_LOGIN_PATH } from "../constant/paths";
import { clientStorage } from "../utils/storage";
import { ACCESS_TOKEN_STORAGE_KEY } from "../constant";

const ProtectedRoute: React.FC = () => {
  const { isLoggedIn } = useAuth();

  // Also check localStorage directly to handle the race condition
  // where AppProvider.useEffect hasn't dispatched the token yet
  const hasStoredToken = !!clientStorage.get(ACCESS_TOKEN_STORAGE_KEY);

  if (!isLoggedIn && !hasStoredToken) {
    return <Navigate to={ADMIN_LOGIN_PATH} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
