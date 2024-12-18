import React from "react";
import back from "../../assets/hero.jpg";

const Hero = () => {
  return (
    <div className="relative">
      <img
        src={back}
        className="w-full h-[90vh] object-cover rounded-2xl opacity-90  absolute top-0 left-0 z-10"
        alt="Hero Background"
      />
      <div className=" bg-black h-[90vh] w-full absolute top-0 left-0 z-20  opacity-70 rounded-2xl "></div>

      <div className="absolute top-0 left-0 z-30 h-[90vh] w-full flex flex-col justify-center items-center text-white px-4">
        <h1 className="text-4xl md:text-6xl font-bold text-center">
          ''Book Your Bus <span className=" text-green-500">Tickets ''</span>
        </h1>
        <p className="text-lg md:text-xl mt-4 text-center max-w-2xl">
          Discover seamless travel planning with our easy-to-use bus booking
          platform. Choose from a wide range of routes, compare prices, and book
          your seat instantly—all in one place!
        </p>
        <button className="mt-6 px-6 py-2  bg-green-600 text-white rounded-lg hover:bg-green-500">
          Book Now
        </button>
      </div>
    </div>
  );
};

export default Hero;
