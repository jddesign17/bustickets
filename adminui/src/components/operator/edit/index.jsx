import React, { useState } from "react";
import { DeleteOperator, useGetOperators } from "../../../api/operators";
import Heading from "../../../widgets/heading";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import Popup from "../popup/index";
const index = () => {
  const data = useGetOperators();

  const [open, setOpen] = useState(false);
  const [item, setItem] = useState({});

  const handleEdit = (item) => {
    setItem(item);
    setOpen(true);
  };

  return (
    <div className="bg-white mt-2 border border-gray-400/50 rounded-xl py-5 px-7">
      <div>
        <Heading text="operator details" />
        <div>
          {data.map((item) => (
            <div
              className="grid grid-cols-4 w-[100%] gap-5   border-b border-gray-500/10 items-center"
              key={item._id}
            >
              <div className=" flex  items-center space-x-2 py-2">
                <img
                  src={`http://localhost:3000/uploads/${item.image}`}
                  className=" w-12 h-12 object-cover rounded-full"
                />
                <p className=" text-sm capitalize">{item.name}</p>
              </div>
              <div>
                <p className=" text-sm">{item.contact}</p>
              </div>
              <button
                onClick={() => handleEdit(item)}
                className=" flex  items-center space-x-1 text-xs   hover:bg-green-300 cursor-pointer  rounded-full bg-green-400 w-fit px-7  py-2 text-white"
              >
                <MdEdit />
                <span className=" capitalize">edit</span>
              </button>
              <button
                onClick={() => DeleteOperator(item._id)}
                className=" flex  items-center space-x-1 text-xs   rounded-full  hover:bg-red-500 cursor-pointer bg-red-600 w-fit px-7  py-2 text-white"
              >
                <MdDelete />
                <span className=" capitalize">delete</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {open && <Popup setOpen={setOpen} item={item} />}
    </div>
  );
};

export default index;
