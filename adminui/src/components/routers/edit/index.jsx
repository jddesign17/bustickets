import React, { useEffect,useState } from "react";
import { routedata } from "../../../api/routes";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import RoutePopup from "../../operator/popup/routes";

const index = () => {
  const [data, setData] = React.useState([]);
  
    const [open, setOpen] = useState(false);
    const [item, setItem] = useState({});
  
    const handleEdit = (item) => {
      setItem(item);
      setOpen(true);
    };

  useEffect(async () => {
    const response = await routedata();
    setData(response);
    
    return () => {
      setData([]);
    }
  }, []);

  return (
    <div className="bg-white mt-2 border border-gray-400/50 rounded-xl py-5 px-7">
      {data &&
        data?.map((item) => (
          <div className=" grid grid-cols-6 mt-5">
            <p>{item.source}</p>
            <p>{item.destination}</p>
            <p>{item.distance}km</p>  
            <p>{item.estimatedtime}</p>

            <button
              onClick={() => handleEdit(item)}
              className=" flex  items-center space-x-1 text-xs   hover:bg-green-300 cursor-pointer  rounded-full bg-green-400 w-fit px-7  py-2 text-white"
            >
              <MdEdit />
              <span className=" capitalize">edit</span>
            </button>
            <button
              // onClick={() => DeleteOperator(item._id)}
              className=" flex  items-center space-x-1 text-xs   rounded-full  hover:bg-red-500 cursor-pointer bg-red-600 w-fit px-7  py-2 text-white"
            >
              <MdDelete />
              <span className=" capitalize">delete</span>
            </button>
          </div>
        ))}

        {
           open && <RoutePopup setOpen={setOpen} item={item}/>
        }
    </div>

  );
};

export default index;
