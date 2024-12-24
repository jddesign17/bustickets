import React, { useEffect, useState } from "react";
import Heading from "../../../widgets/heading";
import Input from "../../../widgets/input";
import { useForm } from "react-hook-form";
import Button from "../../../widgets/button";
import { addStops, createRoutes, getdata } from "../../../api/routes";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

const index = () => {
  const { register, handleSubmit, reset ,formState:{errors}} = useForm({
    defaultValues: {
      source: "",
      destination: "",
      distance: "",
      estimatedtime: null,
    },
  });

  
 
  const [open, setOpen] = useState(false);
  const [data, setdata] = useState("");
  const [stops, setStops] = useState("");


  const onSubmit = async (data) => {
    console.log(data);
    const routedata = await createRoutes(data);
    setdata(routedata);
    setOpen(true);
  };

  const handleStops = async (e) => {
    try {
      e.preventDefault();
      await addStops({ name: stops }, data._id);
      const userdata = await getdata(data._id);
      setdata(userdata);
      setStops("")
    } catch (error) {}
  };


  const handleRefresh = async () => {
    window.location.reload()
    setOpen(false);
  };

  return (
    <div className="bg-white mt-2 border border-gray-400/50 rounded-xl py-5 px-7">
      <Heading text="Adding Routes" />
      <form>
        <div className="grid grid-cols-2 w-[100%] gap-5">
          <Input
            placeholder="Enter source"
            type="text"
            label="source"
            {...register("source",{required:true})}
            errors={errors.source && <p>Source is required*</p>}
          />
          
          <Input
            placeholder="Enter destination"
            type="text"
            label="destination"
            {...register("destination",{required:true})}
            errors={errors.destination && <p>Destination is required*</p>}
          />
          <Input
            placeholder="Enter distance"
            type="number"
            label="distance"
            {...register("distance",{required:{
              value:true,
              message:"Distance is required*"
            },maxLength:{
              value:4,
              message:"Max distance is 5"
            }})}
            errors={errors.distance && <p>{errors.distance.message}</p>}
          />
          <Input
            placeholder="Enter estimatedtime"
            type="time"
            label="estimatedtime"
            {...register("estimatedtime",{
              required:{
                value:true,
                message:"Estimated time is required*"
              }
            })}
            errors={errors.estimatedtime && <p>{errors.estimatedtime.message}</p>}
          />
        </div>

        {open === true ? (
          <></>
        ) : (
          <div onClick={handleSubmit(onSubmit)}>
            <Button text="Submit" />
          </div>
        )}

        {open && (
          <div className=" mt-5">
            <Heading text="add stops" />
            <div className=" grid  grid-cols-12 items-center gap-5 ">
              <div className=" col-span-10">
                <input
                  type="text"
                  onChange={(e) => setStops(e.target.value)}
                  className="border rounded px-3 py-3 mt-6   text-sm w-full"
                  placeholder="Enter stop"
                  value={stops}
                />
              </div>
              <button className="col-span-2 " onClick={(e) => handleStops(e)}>
                <Button text="Add" />
              </button>
            </div>

            {data?.stops?.length > 0 ? (
              <div>
                {data.stops.map((item) => (
                  <div
                    className="border border-gray-200 flex justify-between items-center px-10 py-3 mt-3"
                    key={item._id}
                  >
                    <p className="   rounded-md text-sm font-medium">
                      {item.name}
                    </p>
                    <div className=" flex items-center space-x-4">
                      <MdEdit className=" cursor-pointer  text-green-500" />
                      <MdDelete className=" cursor-pointer text-red-600" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <></>
            )}

            <div onClick={handleRefresh}>
              <Button text="Save" />
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default index;
