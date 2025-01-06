import React from "react";
import { RouterProvider } from "react-router-dom";
import router from "./router/index";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {Toaster} from "react-hot-toast";

const App = () => {
  return (
    <>
    <RouterProvider router={router} />
    <Toaster  position=" top-right" />
    </>
  );
};

export default App;
