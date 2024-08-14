import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
// @ts-ignore
import ActivityIcon from "../../assets/profile.svg";
// @ts-ignore
import CommentIcon from "../../assets/service.svg";
// @ts-ignore
import LogoutIcon from "../../assets/logout.svg";
import { useAuth } from "../../Context/AuthContext";
import "./index.scss";

export default function LeftSidebar() {
  const [activeTab, setActiveTab] = useState("");
  const location = useLocation();
  const {logOut} = useAuth();
  useEffect(()=>{
    location.pathname === "/activity" && setActiveTab("tab-0")
  },[location]);
  const handleClick = (event) => {
    if(event.target.id === "tab-2"){
      // @ts-ignore
      logOut && logOut();
    }
    setActiveTab(event.target.id);
  };
  const tabList = [
    {
      id: "tab-0",
      name: "activity",
      img: ActivityIcon,
      label: "Activity Reports",
      active: true,
    },
    {
      id: "tab-1",
      name: "comment",
      img: CommentIcon,
      label: "Comments",
      active: false,
    },
    {
      id: "tab-2",
      name: "",
      img: LogoutIcon,
      label: "Log out",
      active: false,
    },
  ];
  return (
    <div className="left-sidebar">
      <div className="tab-btn">
        {tabList.map((item, idx) => (
          <button
            key={idx}
            className={item.id === activeTab ? "active" : "inactive"}
            onClick={handleClick}
          >
            <img src={item.img} alt={item.name} className="icon" />
            <Link id={item.id} to={`${item.name}`}>
              {item.label}
            </Link>
          </button>
        ))}
      </div>
    </div>
  );
}
