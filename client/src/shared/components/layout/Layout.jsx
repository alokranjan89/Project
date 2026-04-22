import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">

      <Navbar />

      {/* Main content grows */}
      <main className="flex-grow bg-gray-50">
        <Outlet />
      </main>

      <Footer />

    </div>
  );
};

export default Layout;
