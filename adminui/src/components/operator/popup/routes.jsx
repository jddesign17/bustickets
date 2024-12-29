import React from "react";
import Heading from "../../../widgets/heading";
import Input from "../../../widgets/input";
import Button from "../../../widgets/button";
import { IoIosCloseCircle } from "react-icons/io";
import { useFieldArray, useForm } from "react-hook-form";
import { MdDelete } from "react-icons/md";
import { updateRoutedata } from "../../../api/routes";
const RoutePopup = ({ setOpen, item }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm({
    defaultValues: {
      _id: item._id,
      source: item.source,
      destination: item.destination,
      distance: item.distance,
      estimatedtime: item.estimatedtime,
      stops: item.stops || [{ name: "" }],
    },
  });

  const {
    fields: stopsfields,
    append: stopsappend,
    remove: stopsremove,
  } = useFieldArray({
    control,
    name: "stops",
  });

  const onSubmit = async (data) => {
    try {
      await updateRoutedata(data);
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
          <Input
            type="text"
            label="Source"
            placeholder="Enter source"
            {...register("source", {
              required: {
                value: true,
                message: "Source is required",
              },
            })}
            errors={errors.source && <p>{errors.source.message}</p>}
          />
          <Input
            type="text"
            label="Destination"
            placeholder="Enter destination"
            {...register("destination", {
              required: {
                value: true,
                message: "Destination is required",
              },
            })}
            errors={errors.destination && <p>{errors.destination.message}</p>}
          />
          <Input
            type="number"
            label="Distance"
            placeholder="Enter distance in km"
            {...register("distance", {
              required: {
                value: true,
                message: "Distance is required",
              },
            })}
            errors={errors.distance && <p>{errors.distance.message}</p>}
          />
          <Input
            type="time"
            label="Estimated Time"
            placeholder="Enter estimated time"
            {...register("estimatedtime", {
              required: {
                value: true,
                message: "Estimated Time is required",
              },
            })}
            errors={
              errors.estimatedtime && <p>{errors.estimatedtime.message}</p>
            }
          />
        </div>
        <div className=" bg-gray-300/30 rounded-lg  py-5  px-5 mt-10">
          <h2>Stops</h2>
          {stopsfields.map((field, index) => (
            <div
              className="flex flex-row space-x-3 items-center"
              key={field.id}
            >
              <div className=" w-full">
                <Input
                  type="text"
                  placeholder="Enter stop name"
                  {...register(`stops.${index}.name`, {
                    required: {
                      value: true,
                      message: "Stop name is required",
                    },
                  })}
                  errors={
                    errors.stops?.[index]?.name && (
                      <p>{errors.stops?.[index]?.name.message}</p>
                    )
                  }
                />
              </div>

              <button
                type="button"
                className=" bg-red-500 hover:bg-red-600 text-white p-1 aspect-square rounded-full"
                onClick={() => stopsremove(index)}
              >
                <MdDelete size={15} />
              </button>
            </div>
          ))}

          <button onClick={() => stopsappend({ name: "" })}>
            <Button text="Add Stop" />
          </button>
        </div>
        <button onClick={handleSubmit(onSubmit)} className=" w-full ">
          <Button text="Update" />
        </button>
      </div>
    </div>
  );
};

export default RoutePopup;
