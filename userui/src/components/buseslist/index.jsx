import React from "react";
import icon from "../../assets/icons.png";
import seatimage from "../../assets/seat.png";

import { useNavigate } from "react-router-dom";
import { generatedate } from "../../../utils";

const Buslist = ({buses}) => {
 

  const navigate = useNavigate()

  function handleNavigate(item, id) {
    navigate(`/booking/${id}`,{state:item});
  }


  return (
    <div className=" mt-5 pb-20">
      {buses.length > 0 ? (
        <>
          <div className=" grid grid-cols-4 gap-5">
            {buses.map((item) => (
              <div
                className="mt-5 cursor-pointer hover:opacity-60 border-b border-gray-600/20 pb-5"
                onClick={() => handleNavigate(item, item._id)}
              >
                <img
                  src={`http://localhost:3000/uploads/${item.bus_id?.images[0]?.name} `}
                  className=" w-[350px] h-[300px] object-cover rounded-t-lg"
                />
                <div className=" mt-5 px-2">
                  <p className=" text-md font-medium text-black/50">
                    Registration Number :{item.bus_id.registration_number}
                  </p>
                  <div className=" flex items-center space-x-2">
                    <p>{item.route_id.source}</p>
                    <img src={icon} className="w-5" />
                    <p>{item.route_id.destination}</p>
                    <p className=" font-semibold text-black/60">
                      ({item.route_id.distance}km)
                    </p>
                  </div>
                  <div className=" flex  justify-between items-center">
                    <div>
                      <div className=" mt-2 flex items-center space-x-2">
                        <img src={seatimage} className="w-4" />
                        <p className=" font-medium">
                          {item.bus_id.seatCount.length}
                        </p>
                      </div>
                      <div className=" bg-green-500 text-white  w-fit px-3 py-1 rounded-full text-sm font-semibold mt-2">
                        <p>₹{item.fare}</p>
                      </div>
                    </div>
                    <div className=" text-right">
                      <p className=" text-sm capitalize">
                        date : {"  "}
                        {generatedate(item.date)}
                      </p>
                      <p className=" text-xs mt-2 font-semibold text-black/50 capitalize">
                        {item.departure_time}--to--{item.arrival_time}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Buslist;
