import React from "react";
import logo from "../../assets/logo.png";
import Paragraph from "../../widgets/paragraph";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="py-5 px-6 border-r border-gray-400/30 h-screen flex flex-col  bg-white">
      <div className=" flex items-center space-x-2">
        <img src={logo} className=" w-12 h-12" />
        <h1 className=" font-bold text-2xl">FareFinder</h1>
      </div>

      <div className=" mt-6">
        <Paragraph text="manin menu" />
        <ul>
          <li className=" mt-2 ">
            {" "}
            <Link to="/admin" className=" text-sm ml-5">
              Dashboard
            </Link>
          </li>
        </ul>
      </div>
      <div>
        <Paragraph text="operator" />
        <ul>
          <li className=" mt-2 ">
            {" "}
            <Link to="/admin/operator/add" className=" text-sm ml-5">
              Add
            </Link>
          </li>
          <li className=" mt-2 ">
            {" "}
            <Link to="/admin/operator/edit" className=" text-sm ml-5">
              Edit
            </Link>
          </li>
        </ul>
      </div>
      <div>
        <Paragraph text="buses" />
        <ul>
          <li className=" mt-2 ">
            {" "}
            <Link to="/admin/buses/add" className=" text-sm ml-5">
              Add
            </Link>
          </li>
          <li className=" mt-2 ">
            {" "}
            <Link to="/admin/buses/edit" className=" text-sm ml-5">
              Edit
            </Link>
          </li>
        </ul>
      </div>
      <div>
        <Paragraph text="routes" />
        <ul>
          <li className=" mt-2 ">
            {" "}
            <Link to="/admin/routes/add" className=" text-sm ml-5">
              Add
            </Link>
          </li>
          <li className=" mt-2 ">
            {" "}
            <Link to="/admin/routes/edit" className=" text-sm ml-5">
              Edit
            </Link>
          </li>
        </ul>
      </div>
      <div>
        <Paragraph text="schedule" />
        <ul>
          <li className=" mt-2 ">
            {" "}
            <Link to="/admin/schedule/add" className=" text-sm ml-5">
              Add
            </Link>
          </li>
          <li className=" mt-2 ">
            {" "}
            <Link to="/admin/schedule/edit" className=" text-sm ml-5">
              Edit
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
