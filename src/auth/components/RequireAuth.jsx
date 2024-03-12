import React from "react";
import useAuth from "../hooks/useAuth";
import { useLocation, Outlet, Navigate } from "react-router-dom";

function RequireAuth({ admin }) {
  const { auth } = useAuth();
  const location = useLocation();
  return !auth?.accessToken ? (
    <Navigate to="/login" state={{ from: location }} replace />
  ) : admin ? (
    auth.isAdmin ? (
      <Outlet />
    ) : (
      <Navigate to="/forbidden" />
    )
  ) : (
    <Outlet />
  );
}

export default RequireAuth;
