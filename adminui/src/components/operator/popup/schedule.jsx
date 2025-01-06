import React, { useState, useEffect } from "react";
import Heading from "../../../widgets/heading";
import Input from "../../../widgets/input";
import Button from "../../../widgets/button";
import { IoIosCloseCircle } from "react-icons/io";
import {  useForm } from "react-hook-form";
import { routedata } from "../../../api/routes";
import { getBuses } from "../../../api/buses";
import { updateSchedule } from "../../../api/schedule";

const RoutePopup = ({ setOpen, item }) => {
  const [routeData, setRouteData] = useState([]);
  const [busData, setBusData] = useState([]);

  useEffect(async () => {
    try {
      const data = await routedata();
      setRouteData(data);
      const busdata = await getBuses();
      setBusData(busdata);
    } catch (error) {
      setBusData([]);
      setRouteData([]);
      console.error("Error fetching route data:", error);
    }

    return () => {
      setRouteData([]);
      setBusData([]);
    };
  }, []);

  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm({
    defaultValues: {
      _id: item._id,
      route_id: item.route_id._id,
      bus_id: item.bus_id._id,
      fare: item.fare,
      departure_time: item.departure_time,
      date: item.date,
    },
  });

  const onSubmit = async (data) => {
    try {
      console.log(data);
      await updateSchedule(data)
      setOpen(false);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-screen flex justify-center items-center bg-white/90">
      <div className="bg-white min-w-[600px] h-[600px] overflow-y-scroll px-7 py-10 border border-gray-500 rounded-lg">
        <div className="flex justify-between items-center">
          <Heading text="Edit Operator" />
          <IoIosCloseCircle
            size={30}
            className="hover:text-red-600 cursor-pointer"
            onClick={() => setOpen(false)}
          />
        </div>

        <div className="flex flex-col space-y-3">
          <div className=" flex justify-between">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Routes
            </label>
            {errors.route_id && (
              <p className="text-red-600 text-xs">{errors.route_id?.message}</p>
            )}
          </div>
          <select
            {...register("route_id", {
              required: {
                value: true,
                message: "Please select a route",
              },
            })}
            className="border rounded px-3 py-3 mt-3 text-sm w-full capitalize"
            defaultValue={item.route_id?._id}
          >
            <option value="" className="py-10" disabled selected>
              select a Routes
            </option>
            {routeData && routeData.length > 0 ? (
              routeData.map((operator) => (
                <option
                  key={operator._id}
                  value={operator._id}
                  className="py-10 capitalize"
                >
                  {operator.source} -to- {operator.destination} (
                  {operator.distance}km)
                </option>
              ))
            ) : (
              <option disabled>Loading...</option>
            )}
          </select>

          <div className=" flex justify-between">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Buses
            </label>
            {errors.bus_id && (
              <p className="text-red-600 text-xs">{errors.bus_id.message}</p>
            )}
          </div>
          <select
            {...register("bus_id", {
              required: {
                value: true,
                message: "Please select a bus",
              },
            })}
            className="border rounded px-3 py-3 mt-3 text-sm w-full capitalize"
            defaultValue={item.bus_id?._id}
          >
            <option value="" className="py-10" disabled selected>
              select a Buses
            </option>
            {busData && busData.length > 0 ? (
              busData.map((operator) => (
                <option
                  key={operator?._id}
                  value={operator?._id}
                  className="py-10 capitalize"
                >
                  Register Number - {operator?.registration_number}
                </option>
              ))
            ) : (
              <option disabled>Loading...</option>
            )}
          </select>

          <Input
            type="number"
            label="fare amount"
            placeholder="Enter Fare Amount"
            {...register("fare", {
              required: {
                value: true,
                message: "Distance is required",
              },
            })}

            errors={errors.fare && <p>{errors.fare.message}</p>}
          />
          <Input
            type="time"
            label="Estimated Time"
            placeholder="Enter estimated time"
            {...register("departure_time", {
              required: {
                value: true,
                message: "Estimated Time is required",
              },
            })}
            errors={
              errors.departure_time && <p>{errors.departure_time.message}</p>
            } 

            
          />
          <Input
            type="date"
            label="date"
            placeholder="Enter estimated time"
            {...register("date", {
              required: {
                value: true,
                message: "date is required",
              },
            })}
            errors={
              errors.date && <p>{errors.date.message}</p>
            }
          />
        </div>

        <button onClick={handleSubmit(onSubmit)} className=" w-full ">
          <Button text="Update" />
        </button>
      </div>
    </div>
  );
};

export default RoutePopup;
