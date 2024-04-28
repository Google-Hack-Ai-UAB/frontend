import React from "react";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <div className="container h-full min-w-[100vw]">
      <main className="h-full bg-gray-100">
        <Navbar></Navbar>
        {children}
      </main>
    </div>
  );
};

export default Layout;
