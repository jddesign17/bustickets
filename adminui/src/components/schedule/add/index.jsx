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
  const { register, handleSubmit,resetField } = useForm({
    bus_id: "",
    route_id: "",
    departure_time: "",
    fare: 0,
    date: null,
  });

  useEffect(() => {
    const fetchRouteData = async () => {
      try {
        const data = await routedata();
        setRouteData(data);
        const busdata = await getBuses();
        setBusData(busdata);
      } catch (error) {
        console.error("Error fetching route data:", error);
      }
    };
    fetchRouteData();
  }, []);

  const onSubmit = async (data) => {
    try {
      console.log(data)
      createSchedule(data);
      window.location.reload()
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white mt-2 border border-gray-400/50 rounded-xl py-5 px-7">
      <Heading text="Add Schedule" />
      <div className=" grid grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select Routes
          </label>
          <select
            {...register("route_id")}
            className="border rounded px-3 py-3 mt-3 text-sm w-full capitalize"
          >
            <option value="" className="py-10" disabled selected>
              select a Routes
            </option>
            {routeData.length > 0 ? (
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
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select Routes
          </label>
          <select
            {...register("bus_id")}
            className="border rounded px-3 py-3 mt-3 text-sm w-full capitalize"
          >
            <option value="" className="py-10" disabled selected>
              select a Routes
            </option>
            {busData.length > 0 ? (
              busData.map((operator) => (
                <option
                  key={operator._id}
                  value={operator._id}
                  className="py-10 capitalize"
                >
                  Register Number - {operator.registration_number}
                </option>
              ))
            ) : (
              <option disabled>Loading...</option>
            )}
          </select>
        </div>
        <Input
          placeholder="Enter date"
          type="date"
          label="Date"
          {...register("date")}
        />
        <Input
          placeholder="Enter Departure time"
          type="time"
          label="Departure time"
          {...register("departure_time")}
        />
        <Input
          placeholder="Enter Fare Amount"
          type="number"
          label="fare Amount"
          {...register("fare")}
        />
      </div>

      <button onClick={handleSubmit(onSubmit)} className=" w-full">
        <Button text="submit" />
      </button>
    </div>
  );
};

export default Index;
