import React from "react";
import useAuth from "../hooks/useAuth";
import { useLocation, Outlet, Navigate } from "react-router-dom";

function RequireAuth() {
  const { auth } = useAuth();
  const location = useLocation();
  return !auth?.accessToken ? (
    <Navigate to="/login" state={{ from: location }} replace />
  ) : (
    <Outlet />
  );
}

export default RequireAuth;
