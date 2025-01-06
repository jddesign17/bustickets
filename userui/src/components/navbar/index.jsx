import React, { useEffect, useState } from "react";
import logo from "../../assets/logo.png";
import axios from "axios";
import avatar from "../../assets/avatar.png";
import { Link } from "react-router-dom";
import UserNavLinks from "../usernavlinks";

const Navbar = () => {
  const [user, setUser] = useState([]);
  const [show, setShow] = useState(false);
  const [showNavLinks, setShowNavLinks] = useState(false); 

  useEffect(() => {
    fetchUserData();

    return () => {
      setShow(false);
      setUser([]);
    };
  }, []);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post("http://localhost:3000/api/auth/user", {
        token: token,
      });
      if (response.status === 200) {
        const data = response.data;
        setUser(data);
        setShow(true);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  return (
    <div className="sticky top-0 z-50">
      {show === true ? (
        <div className=" border-b border-primary py-3 sticky top-0 z-50 bg-white flex justify-between">
          <a className="flex space-x-2 items-center" href="/">
            <img src={logo} className="w-12" />
            <p className="text-2xl font-semibold">Fare Finder</p>
          </a>
          <div
            className="relative flex space-x-2 items-center cursor-pointer"
            onClick={() => setShowNavLinks(true)}
            onMouseLeave={() => setShowNavLinks(false)}
          >
            <img src={avatar} className="w-10" />
            <div>
              <p className="text-sm">{user.name}</p>
              <p className="text-sm">{user.email}</p>
            </div>
         
            {showNavLinks && (
              <div className="absolute top-12 right-0 bg-white shadow-lg border border-gray-200 rounded-md z-50">
                <UserNavLinks />
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="border-b border-primary py-3 sticky top-0 z-50 bg-white flex justify-between items-center">
          <a className="flex space-x-2 items-center" href="/">
            <img src={logo} className="w-12" />
            <p className="text-2xl font-semibold">Fare Finder</p>
          </a>
          <div className="flex space-x-4">
            <button className="bg-green-500 text-white px-10 py-2 rounded-full hover:bg-transparent hover:border hover:text-green-500 hover:border-green-500 text-sm">
              <Link to="/login">Login</Link>
            </button>
            <button className="text-green-500 px-10 py-2 rounded-full border border-green-500 text-sm hover:bg-green-500 hover:text-white">
              <Link to="/signup">Signup</Link>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
