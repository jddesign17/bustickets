import { useEffect, useState } from "react";
import { routedata } from "../../../api/routes";
import Heading from "../../../widgets/heading";
import { useForm } from "react-hook-form";
import { getBuses } from "../../../api/buses";
import Input from "../../../widgets/input";
import Button from "../../../widgets/button";
import { createSchedule } from "../../../api/schedule";

const Index = () => {
  const [routeData, setRouteData] = useState([]);
  const [busData, setBusData] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await routedata();
        setRouteData(data);
        const busdata = await getBuses();
        setBusData(busdata);
      } catch (error) {
        console.error("Error fetching route data:", error);
        setRouteData([]);
        setBusData([]);
      }
    };
    fetchData();

    return () => {
      setRouteData([]);
      setBusData([]);
    };
  }, []);

  const onSubmit = async (data) => {
    try {
      await createSchedule(data);
      alert("Schedule created successfully!");
      reset();
    } catch (error) {
      console.error("Error creating schedule:", error);
    }
  };

  return (
    <div className="bg-white mt-2 border border-gray-400/50 rounded-xl py-5 px-7">
      <Heading text="Add Schedule" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Routes
            </label>
            <select
              {...register("route_id", { required: "Please select a route" })}
              className="border rounded px-3 py-3 mt-3 text-sm w-full capitalize"
            >
              <option value="" disabled>
                Select a Route
              </option>
              {routeData.map((route) => (
                <option key={route._id} value={route._id}>
                  {route.source} - {route.destination} ({route.distance}km)
                </option>
              ))}
            </select>
            {errors.route_id && (
              <p className="text-red-600 text-xs">{errors.route_id.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Buses
            </label>
            <select
              {...register("bus_id", { required: "Please select a bus" })}
              className="border rounded px-3 py-3 mt-3 text-sm w-full capitalize"
            >
              <option value="" disabled>
                Select a Bus
              </option>
              {busData.map((bus) => (
                <option key={bus._id} value={bus._id}>
                  Register Number - {bus.registration_number}
                </option>
              ))}
            </select>
            {errors.bus_id && (
              <p className="text-red-600 text-xs">{errors.bus_id.message}</p>
            )}
          </div>
          <Input
            label="Date"
            type="date"
            placeholder="Enter Date"
            {...register("date", { required: "Please select a date" })}
          />
          <Input
            label="Departure Time"
            type="time"
            placeholder="Enter Departure Time"
            {...register("departure_time", {
              required: "Please enter a departure time",
            })}
          />
          <Input
            label="Fare Amount"
            type="number"
            placeholder="Enter Fare Amount"
            {...register("fare", { required: "Please enter a fare amount" })}
          />
        </div>
        <Button text="Submit" />
      </form>
    </div>
  );
};

export default Index;
