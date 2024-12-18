import React, { useEffect } from "react";
import Heading from "../../../widgets/heading";
import { useState } from "react";
import axios from "axios";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
const index = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchBusesData();
  }, []);

  async function fetchBusesData() {
    try {
      const respose = await axios.get("http://localhost:3000/api/buses/data");
      await setData(respose.data);
      console.log(respose.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="bg-white mt-2 border border-gray-400/50 rounded-xl py-5 px-7">
      <Heading text="Buses Details" />
      <div>
        <div>
          <div className=" grid grid-cols-7 items-center  justify-items-start  capitalize text-sm mb-5 text-black/80  font-semibold">
            <p>Register Number</p>
            <p>Type</p>
            <p>Seat count</p>
            <p>Operator</p>
            <p>amenities</p>
            <p>edit</p>
            <p>delete</p>
          </div>
        </div>
        {data.length > 0 ? (
          <div>
            {data.map((item) => (
              <div
                className="grid grid-cols-7 w-[100%]  border-b border-gray-500/10  items-center  "
                key={item._id}
              >
                <div className=" flex  items-center space-x-2 py-2">
                  <img
                    src={`http://localhost:3000/uploads/${item.images[0]}`}
                    className=" w-12 h-12 object-cover rounded-full"
                  />
                  <p className=" text-sm capitalize">
                    {item.registration_number}
                  </p>
                </div>
                <div>
                  <p className=" text-sm">{item.bustype}</p>
                </div>
                <div>
                  <p className=" text-sm">{item.seatCount.length}</p>
                </div>
                <div className=" flex space-x-2 items-center">
                  <img
                    src={` http://localhost:3000/uploads/${item.operatorid.image}`}
                    className=" w-12 rounded-full object-cover aspect-square"
                  />
                  <p className=" text-sm capitalize">{item.operatorid.name}</p>
                </div>
                <div>
                  <p className=" text-sm">{item.amenities}</p>
                </div>
                <button
                  // onClick={() => handleEdit(item)}
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
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default index;
