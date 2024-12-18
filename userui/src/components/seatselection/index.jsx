import React from "react";
import { MdChair } from "react-icons/md";
import Button from "../../widgets/button";

const Seatselection = ({ seats }) => {
  return (
    <div className=" mb-20">
        <div className=" grid grid-cols-5  justify-items-center py-7 bg-green-50">
      {seats &&
        seats.map((item) => (
          <div>
            <MdChair size={35} className=" hover:text-green-400 cursor-pointer" />
            <p className=" text-center text-sm mb-4">{item.seat}</p>
          </div>
        ))}

        
    </div>
    <button className=" w-full">
    <Button text="Book Now"/>
    </button>
    </div>
  );
};

export default Seatselection;
