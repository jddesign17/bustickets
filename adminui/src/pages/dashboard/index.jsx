import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/sidebar";
import Headers from "../../components/header";
const Dashboard = () => {
  return (
    <div className=" grid grid-cols-12 h-[100vh] overflow-hidden">
      <div className=" col-span-2 ">
        <Sidebar />
      </div>
      <div className=" col-span-10 min-h-[100vh] overflow-y-scroll w-full">
        <Headers />
        <div className=" bg-primary w-full  min-h-[100vh]">
        <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
