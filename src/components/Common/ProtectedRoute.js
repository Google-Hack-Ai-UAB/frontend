import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      loginWithRedirect().catch((err) => {
        console.error("Error with login popup:", err);
      });
    }
  }, [isLoading, isAuthenticated, loginWithRedirect]); // Dependency array ensures this only runs on changes to isLoading or isAuthenticated

  console.log(`isAuthenticated: ${isAuthenticated}`);
  console.log(`isLoading: ${isLoading}`);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    // Display a message or return null while waiting for authentication
    return <div>Authenticating...</div>;
  }

  return <Component {...rest} />;
};

export default ProtectedRoute;
