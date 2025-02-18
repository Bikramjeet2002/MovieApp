import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PublicaRoute = () => {
  const isAuthenticated = localStorage.getItem("users"); // Check if the user is logged in
  return isAuthenticated ? <Navigate to="/home" /> :<Outlet /> ;
};

export default PublicaRoute;
