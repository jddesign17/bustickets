import React from "react";
import Navbar from "../../components/navbar";
import { useLocation } from "react-router-dom";
import Slider from "react-slick";
import { FaCircleChevronRight, FaCircleChevronLeft } from "react-icons/fa6";
import { generatedate } from "../../../utils";
import seatimage from "../../assets/seat.png";
import icon from "../../assets/icons.png";
import Button from "../../widgets/button";
import { useState } from "react";
import Seatselection from "../../components/seatselection";
const Booking = () => {
  const location = useLocation();
  const busData = location?.state;
  const [seats,showseats] = useState(false)

  const NextArrow = ({ onClick }) => {
    return (
      <div
        className="absolute top-1/2 right-2 transform -translate-y-1/2 cursor-pointer z-10"
        onClick={onClick}
      >
        <FaCircleChevronRight className="text-4xl   text-green-500 bg-white p-2 rounded-full" />
      </div>
    );
  };

  const PrevArrow = ({ onClick }) => {
    return (
      <div
        className="absolute top-1/2 left-2 transform -translate-y-1/2 cursor-pointer z-10"
        onClick={onClick}
      >
        <FaCircleChevronLeft className="text-4xl text-green-500 bg-white p-2 rounded-full" />
      </div>
    );
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

 

  busData.bus_id.images.map((item)=>{
    console.log(item.name)
  })

  return (
    <div className="px-10">
      <Navbar />
      <div className=" grid grid-cols-2 gap-10 pt-4">
        <div className="h-[100vh]">
          <h2>{}</h2>
          <Slider {...settings}>
            {busData.bus_id.images.map((item, index) => (
              <img
                key={index}
                src={`http://localhost:3000/uploads/${item.name} `}
                alt={`Slide ${index + 1}`}
                className="h-[450px] object-cover w-full rounded-t-lg"
              />
            ))}
          </Slider>
          <div className=" mt-5">
            <h2 className=" text-2xl font-semibold  text-black/80">Operator</h2>
            <div className=" flex items-center space-x-2 mt-5    w-[300px] text-white bg-green-500 rounded-full ">
              <img
                src={`http://localhost:3000/uploads/${busData.bus_id.operatorid?.image}`}
                className=" w-16 h-16 object-cover rounded-full aspect-square"
              />
              <div>
                <p className=" text-xl font-semibold">{busData.bus_id.operatorid?.name}</p>
                <p className=" text-white">+91 {' '}{busData.bus_id.operatorid?.contact}</p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div>
            <h2 className=" text-3xl font-semibold  uppercase">
              registration number :# {busData.bus_id.registration_number}
            </h2>
            <div className=" flex space-x-3">
              <p className=" bg-gray-400/30 w-fit px-8 text-sm  rounded-2xl mt-4 py-1 uppercase">
                Bus type : {busData.bus_id.bustype}
              </p>
              <div  className=" flex flex-row space-x-4">
               {

                busData.bus_id.amenities.map((item)=>(
                  <p className=" bg-green-500 text-white w-fit px-8 text-sm  rounded-2xl mt-4 py-1 uppercase">amenities : {item.name}</p>
                ))
                   
               }
              </div>
            </div>
            <div className=" flex items-center space-x-2 mt-10">
              <p>{busData.route_id.source}</p>
              <img src={icon} className="w-5" />
              <p>{busData.route_id.destination}</p>
              <p className=" font-semibold text-black/60">
                ({busData.route_id.distance}km)
              </p>
            </div>
            <div className=" mt-10">
              <div>
                <div className=" flex items-center space-x-2 mt-5 border-b border-gray-500/15 pb-2">
                  <p>Total Seats : </p>
                  <img src={seatimage} className="w-4" />
                  <p className=" font-medium ">
                    {busData.bus_id.seatCount.length}(seats)
                  </p>
                </div>
              </div>
              <div className=" flex items-center space-x-2 mt-5 border-b border-gray-500/15 pb-2">
                <p>
                  Departure date : {"  "}
                  <span className=" text-green-600 font-semibold">
                    {generatedate(busData.date)}
                  </span>
                </p>
              </div>

              <p className=" flex items-center space-x-2 mt-5 border-b border-gray-500/15 pb-2">
                Duration : {busData.departure_time}--to--{busData.arrival_time}
              </p>

              <div className=" mt-5 border-b border-gray-500/15 pb-5">
                <p className=" capitalize">Stops</p>
                <div className=" grid-cols-3 grid   gap-x-2">
                  {busData.route_id.stops?.map((item) => (
                    <p className=" bg-gray-500/10 px-5 text-sm py-1 rounded-full mt-2 text-center">
                      {item.name}
                    </p>
                  ))}
                </div>
              </div>
              <div className=" flex items-center space-x-2 mt-5 border-b border-gray-500/15 pb-2 capitalize text-4xl">
                <p>₹{busData.fare}</p>
              </div>

                
                {
                  seats && (
                    <Seatselection seats={busData.bus_id.seatCount}/>
                  )
                }

             {
                seats !== true ? (
                  <button onClick={()=>showseats(true)} className=" w-full">
                  <Button text="Select Seats"/>
                  </button>
                ):(
                  <></>
                )
             }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
