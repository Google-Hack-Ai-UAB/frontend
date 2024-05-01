import React from "react";
import ReactDOM from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";
import { CLIENT_ID, DOMAIN } from "./lib/Constants";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "./components/Common/Homepage";
import ProtectedRoute from "./components/Common/ProtectedRoute";
import Profile from "./components/Applicant/Profile/Profile";
import "./App.css";
import Layout from "./components/Common/Layout";
import RecruiterView from "./components/Recruiter/RecruiterView";
import ChatView from "./components/Recruiter/ChatView";
import Jobs from "./components/Applicant/Jobs";

const ProfilePage = () => {
  return (
    <Layout>
      <Profile></Profile>
    </Layout>
  );
};

const RecruiterPage = () => {
  return (
    <Layout>
      <RecruiterView></RecruiterView>
    </Layout>
  );
};

const ChatPage = () => {
  return (
    <Layout>
      <ChatView></ChatView>
    </Layout>
  );
};

const JobPage = () => {
  return (
    <Layout>
      <Jobs></Jobs>
    </Layout>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute component={Homepage} />,
  },
  {
    path: "/applicant",
    element: <ProtectedRoute component={ProfilePage} />,
  },
  {
    path: "/jobs",
    element: <ProtectedRoute component={JobPage} />,
  },
  {
    path: "/recruiter",
    element: <ProtectedRoute component={RecruiterPage} />,
  },
  {
    path: "/chat",
    element: <ProtectedRoute component={ChatPage} />,
  },
  {
    path: "/chat/:jobId",
    element: <ProtectedRoute component={ChatPage} />,
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
      cacheLocation="localstorage"
      useRefreshTokens={true}
    >
      <RouterProvider router={router}></RouterProvider>
    </Auth0Provider>
  </React.StrictMode>,
);
