import React from "react";
import { MdChair } from "react-icons/md";
import Button from "../../widgets/button";
import { FaBed } from "react-icons/fa6";
import { FaMattressPillow } from "react-icons/fa6";
import {useNavigate} from "react-router-dom"
const Seatselection = ({ seats }) => {

  const navigate = useNavigate()

  const handleBooking = async()=>{
      try {

        const token = await localStorage.getItem("token")
        if(token === undefined || token === ""|| !token)
        {
          navigate("/signup")
        }

        
      } catch (error) {
        
      }
  }

  return (
    <div className="mb-20">
      <div className="grid grid-cols-10 justify-items-center py-7 bg-green-50">
        {seats &&
          seats.map((item, index) => {
            if (item.name === "Sleeper") {
              return (
                <div key={index} className=" text-gray-300 mt-5">
                  <FaMattressPillow
                    size={35}
                    className="hover:text-green-400 cursor-pointer"
                  />
                  
                </div>
              );
            }

            if (item.name === "Seater") {
              return (
                <div key={index} className=" text-gray-300 mt-5">
                  <MdChair
                    size={35}
                    className="hover:text-green-400 cursor-pointer"
                  />
                  
                </div>
              );
            }

            return null; 
          })}
      </div>
      <button className="w-full" onClick={handleBooking}>
        <Button text="Book Now" />
      </button>
    </div>
  );
};

export default Seatselection;
