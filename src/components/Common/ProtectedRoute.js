import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { ThreeDots } from "react-loader-spinner";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      loginWithRedirect().catch((err) => {
        console.error("Error with login popup:", err);
      });
    }
  }, [isLoading, isAuthenticated, loginWithRedirect]);

  console.log(`isAuthenticated: ${isAuthenticated}`);
  console.log(`isLoading: ${isLoading}`);

  if (isLoading) {
    return (
      <div className="h-full w-full flex justify-center items-center">
        <ThreeDots className="m-auto" color="#1976d2" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="h-full w-full flex justify-center items-center">
        <ThreeDots className="m-auto" color="#1976d2" />
      </div>
    );
  }

  return <Component {...rest} />;
};

export default ProtectedRoute;
