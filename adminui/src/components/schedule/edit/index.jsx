import React, { useEffect, useState } from "react";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { getSchedule } from "../../../api/schedule";
import Popupschedule from "../../operator/popup/schedule";

const index = () => {
  const [data, setData] = React.useState([]);
  const [open, setOpen] = useState(false);
  const [item, setItem] = useState({});

  const handleEdit = (item) => {
    setItem(item);
    setOpen(true);
  };

  useEffect(async () => {
    
    fetchdata()

    return () => {
      setData([]);
      setOpen(false);
      setItem({});
    }
  }, []);


  const fetchdata = async () => {
    try {
      const response = await getSchedule();
      setData(response);
    } catch (error) {
      console.log(error);
    }

    return () => {
      setData([]);
    };
  }
  return (
    <div className="bg-white mt-2 border border-gray-400/50 rounded-xl py-5 px-7">
      {data &&
        data?.map((item) => (
          <div className=" grid grid-cols-7 mt-5" key={item._id}>
            <p>{item.bus_id.registration_number}</p>
            <p>
              {item.route_id.source} to {item.route_id.destination}
            </p>
            <p>{item.departure_time}</p>
            <p>{item.arrival_time}</p>
            <p>{item.fare}</p>

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

      {open && <Popupschedule setOpen={setOpen} item={item} />}
    </div>
  );
};

export default index;
