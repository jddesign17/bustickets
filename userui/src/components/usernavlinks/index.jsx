import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineLogout } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const UserNavLinks = () => {

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <div className=" bg-white flex flex-col min-w-[200px] px-5 py-5">
      <ul className=" list-none flex flex-col space-y-2">
        <li
          className=" flex  items-center space-x-2 pb-2 border-b border-gray-400 text-sm w-full"
          onClick={handleLogout}
        >
          <AiOutlineLogout size={20} />
          <Link>Log out</Link>
        </li>
        {/* <li >
          <Link className=" pb-2 border-b border-gray-400 text-sm w-full">Log out</Link>
        </li>
        <li >
          <Link className=" pb-2 border-b border-gray-400 text-sm w-full">Log out</Link>
        </li> */}
      </ul>
    </div>
  );
};

export default UserNavLinks;
