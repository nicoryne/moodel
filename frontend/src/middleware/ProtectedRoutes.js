import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

export default function PrivateRoutes() {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}
