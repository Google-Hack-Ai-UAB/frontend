import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";
import { CLIENT_ID, DOMAIN } from "./lib/Constants";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "./components/Common/Homepage";
import ProtectedRoute from "./components/Common/ProtectedRoute";
import Profile from "./components/Applicant/Profile/Profile";
import "./App.css";
import Layout from "./components/Common/Layout";

const ProfilePage = () => {
  return (
    <Layout>
      <Profile></Profile>
    </Layout>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute component={ProfilePage} />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Auth0Provider
      domain={DOMAIN}
      clientId={CLIENT_ID}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <RouterProvider router={router}></RouterProvider>
    </Auth0Provider>
  </React.StrictMode>,
);
