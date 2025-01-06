import { RouterProvider } from "react-router-dom";
import router from "./routers/index";

const App = () => {
  return <div className=" bg-primary"><RouterProvider router={router} /></div>;
};

export default App;
