import React from "react";
import Input from "../../../widgets/input";
import Heading from "../../../widgets/heading";
import Button from "../../../widgets/button";
import { IoIosCloseCircle } from "react-icons/io";
import { useFieldArray, useForm } from "react-hook-form";
import { MdDelete } from "react-icons/md";
const Pupupbuses = ({ setOpen, item }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      registration_number: item.registration_number,
      amenities: item.amenities || [],
      images: item.images || [],
      bustype: item.bustype,
    },
  });

  const {
    fields: amenitiesfileds,
    append: amenitiesappend,
    remove: amenitiesremove,
  } = useFieldArray({
    control,
    name: "amenities",
  });

  const {
    fields: imagesfileds,
    append: imagesappend,
    remove: imagesremove,
  } = useFieldArray({
    control,
    name: "images",
  });

  const Onsubmit = async (data) => {
    console.log(data);
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

        <form
          className="flex flex-col space-y-3"
          onSubmit={handleSubmit(Onsubmit)}
        >
          <div className=" flex justify-between">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Routes
            </label>
            {errors.route_id && (
              <p className="text-red-600 text-xs">{errors.route_id?.message}</p>
            )}
          </div>

          <Input
            type="text"
            label="Registration Number"
            placeholder="Enter Registration Number"
            {...register("registration_number", {
              required: {
                value: true,
                message: "Registration Number is required",
              },
            })}
            errors={
              errors.registration_number && (
                <p>{errors.registration_number.message}</p>
              )
            }
          />
          <Input
            type="text"
            label="Bus Type"
            placeholder="Enter Registration Number"
            {...register("bustype", {
              required: {
                value: true,
                message: "bustype is required",
              },
            })}
            errors={errors.bustype && <p>{errors.bustype.message}</p>}
          />

          {amenitiesfileds.map((amenity, index) => (
            <div
              key={amenity._id}
              className="flex items-center space-x-2 w-full "
            >
              <div className=" w-full">
                <Input
                  type="number"
                  label="Amenities"
                  placeholder="Enter Amenities"
                  {...register(`amenities.${index}.name`, {
                    required: {
                      value: true,
                      message: "Distance is required",
                    },
                  })}
                />
              </div>
              <button
                type="button"
                className=" bg-red-500 text-white text-xl p-2 rounded-full"
                onClick={() => amenitiesremove(index)}
              >
                <MdDelete size={15} />
              </button>
            </div>
          ))}

          {imagesfileds.map((item, index) => (
            <div
              className=" flex items-center w-full  justify-between"
              key={item._id}
            >
              <img
                src={`http://localhost:3000/uploads/${item.name}`}
                className=" w-10 h-10 object-cover rounded-full"
              />
              <Input
                type="file"
                placeholder="Enter Image"
                {...register(`images.${index}.name`)}
              />
              <button
                type="button"
                className=" bg-red-500 text-white text-xl p-2 rounded-full"
                onClick={() => imagesremove(index)}
              >
                <MdDelete size={15} />
              </button>
            </div>
          ))}

          <button type="submit" className=" w-full ">
            <Button text="Update" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Pupupbuses;
