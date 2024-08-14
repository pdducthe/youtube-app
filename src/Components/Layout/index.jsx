import React from "react";
import { Outlet } from "react-router-dom";
import "./index.scss";
import LeftSidebar from "../Sidebar";
import { useAuth } from "../../Context/AuthContext";

export default function Layout() {
  const user = useAuth();

  return (
    <div className="main-layout">
      <div className="sidebar">{user.isAuthenticated && <LeftSidebar />}</div>
      <div className="main-content">
        <Outlet />
      </div>
      <div className="sidebar"></div>
    </div>
  );
}
