import React from "react";
import { Route, Redirect, redirect } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated && !isLoading) {
    loginWithRedirect();
    return <div>Loading...</div>;
  }

  return isAuthenticated ? <Component /> : redirect("/");
};

export default ProtectedRoute;
