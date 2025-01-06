
import Heading from "../../../widgets/heading";
import Input from "../../../widgets/input";
import { useForm, useFieldArray } from "react-hook-form";
import Button from "../../../widgets/button";
import { createRoutes } from "../../../api/routes";
import { MdDelete } from "react-icons/md";

const index = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      source: "",
      destination: "",
      distance: "",
      estimatedtime: null,
      stops: [
        {
          name: "",
        },
      ],
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
       await createRoutes(data);
    } catch (error) {
      console.log(error);
    }
  };



  return (
    <div className="bg-white mt-2 border border-gray-400/50 rounded-xl py-5 px-7">
      <Heading text="Adding Routes" />

      <div className="grid grid-cols-2 w-[100%] gap-5">
        <Input
          placeholder="Enter source"
          type="text"
          label="source"
          {...register("source", { required: true })}
          errors={errors.source && <p>Source is required*</p>}
        />

        <Input
          placeholder="Enter destination"
          type="text"
          label="destination"
          {...register("destination", { required: true })}
          errors={errors.destination && <p>Destination is required*</p>}
        />
        <Input
          placeholder="Enter distance"
          type="number"
          label="distance"
          {...register("distance", {
            required: {
              value: true,
              message: "Distance is required*",
            },
            maxLength: {
              value: 4,
              message: "Max distance is 5",
            },
          })}
          errors={errors.distance && <p>{errors.distance.message}</p>}
        />
        <Input
          placeholder="Enter estimatedtime"
          type="time"
          label="estimatedtime"
          {...register("estimatedtime", {
            required: {
              value: true,
              message: "Estimated time is required*",
            },
          })}
          errors={errors.estimatedtime && <p>{errors.estimatedtime.message}</p>}
        />
      </div>

      {stopsfields.map((field, index) => (
        <div className=" mt-5 flex h-full items-center   space-x-6 flex-row justify-between">
          <div className=" w-full space-x-1">
            <Input
              placeholder="Enter Stops"
              type="text"
              label="Stops"
              {...register(`stops.${index}.name`, {
                required: {
                  value: true,
                  message: "stops is requrired *",
                },
              })}
              errors={
                errors.stops?.[index]?.name && (
                  <p>{errors.stops?.[index]?.name.message}</p>
                )
              }
            />
          </div>
          {stopsfields.length > 1 && ( 
            <div
              className="bg-red-600 text-white px-2 aspect-square flex items-center justify-center rounded-full cursor-pointer hover:opacity-85"
              onClick={() => stopsremove(index)}
            >
              <MdDelete />
            </div>
          )}
        </div>
      ))}

      <button className=" w-fit " onClick={() => stopsappend({ name: "" })}>
        <Button text="Add stops" />
      </button>

      <div onClick={handleSubmit(onSubmit)}>
        <Button text="Submit" />
      </div>
    </div>
  );
};

export default index;
