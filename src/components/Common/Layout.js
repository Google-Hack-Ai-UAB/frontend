import React from "react";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <div className="container min-h-screen min-w-[100vw]">
      <main>
        <Navbar></Navbar>
        {children}
      </main>
    </div>
  );
};

export default Layout;
