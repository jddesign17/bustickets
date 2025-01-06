import React, { useState } from "react";
import Input from "../../../widgets/input";
import Heading from "../../../widgets/heading";
import Button from "../../../widgets/button";
import { useFieldArray, useForm } from "react-hook-form";
import { useGetOperators } from "../../../api/operators";
import { createBuses } from "../../../api/buses";
import { MdDelete } from "react-icons/md";
import Addbutton from "../../../widgets/addbutton";

const Index = () => {
  const operators = useGetOperators() || [];

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      bustype: "",
      registration_number: "",
      images: null,
      operatorid: "",
      amenities: [
        {
          name: "",
        },
      ],
      seatdetails: [
        {
          seattype: "",
          seatCount: "",
        },
      ],
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
    fields: seatfields,
    append: seatappend,
    remove: seatremove,
  } = useFieldArray({
    control,
    name: "seatdetails",
  });

  const Onsubmit = async (data) => {
    try {
      console.log("Form Data:", data);
      const formdata = new FormData();

      if (data.images && data.images.length > 0) {
        Array.from(data.images).forEach((file) => {
          formdata.append("images", file);
        });
      }

      if (Array.isArray(data.amenities)) {
        data.amenities.forEach((amenity) => {
          formdata.append("amenities", JSON.stringify(amenity));
        });
      }

      if (Array.isArray(data.seatdetails)) {
        data.seatdetails.forEach((seat) => {
          formdata.append("seatdetails", JSON.stringify(seat));
        });
      }

      formdata.append("operatorid", data.operatorid);
      formdata.append("registration_number", data.registration_number);
      formdata.append("bustype", data.bustype);

      await createBuses(formdata);
    } catch (error) {
      console.error("Error submitting the form:", error.message);
      alert(error.message);
    }
  };

  return (
    <div className=" pb-20">
      <div className="bg-white mt-2 border border-gray-400/50 rounded-xl py-5 px-7 ">
        <Heading text="Add New Bus" />

        <div className="grid grid-cols-2 w-[100%] gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Operator
            </label>
            <select
              {...register("operatorid", { required: "Operator is required" })}
              className="border rounded px-3 py-3 mt-3 text-sm w-full capitalize"
            >
              <option value="" disabled>
                Select an Operator
              </option>
              {operators.map((operator) => (
                <option
                  key={operator.id}
                  value={operator._id}
                  className="capitalize"
                >
                  {operator.name} - ({operator.contact})
                </option>
              ))}
            </select>
            {errors.operatorid && (
              <p className="text-red-500 text-sm">
                {errors.operatorid.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Bus Type
            </label>
            <select
              {...register("bustype", { required: "Bus type is required" })}
              className="border rounded px-3 py-3 mt-3 text-sm w-full capitalize"
            >
              <option value="" disabled>
                Select Bus Type
              </option>
              <option value="Ac">Ac</option>
              <option value="Non Ac">Non Ac</option>
            </select>
            {errors.bustype && (
              <p className="text-red-500 text-sm">{errors.bustype.message}</p>
            )}
          </div>
          <Input
            placeholder="Choose Images"
            type="file"
            label="Choose Images"
            {...register("images", {
              required: "Please select bus images",
            })}
            errors={
              errors.images && (
                <p className="text-red-500">{errors.images.message}</p>
              )
            }
          />
          <Input
            placeholder="Enter Registration Number"
            type="text"
            label="Registration Number"
            {...register("registration_number", {
              required: "Registration number is required",
            })}
            errors={
              errors.registration_number && (
                <p className="text-red-500">
                  {errors.registration_number.message}
                </p>
              )
            }
          />
        </div>
      </div>

      <div className="bg-white mt-2 border border-gray-400/50 rounded-xl py-5 px-7">
        <div className=" flex  justify-between items-center">
          <Heading text="Amenities" />
          <button onClick={() => amenitiesappend({ name: "" })}>
            <Addbutton text="Add Amenities" />
          </button>
        </div>
        {amenitiesfileds.map((field, index) => (
          <div key={field.id} className="flex items-center mt-5 space-x-4">
            <div className=" w-full">
              <Input
                placeholder="Enter Amenities"
                type="text"
                label="Amenities"
                {...register(`amenities.${index}.name`, {
                  required: "Amenity name is required",
                })}
                errors={
                  errors.amenities?.[index]?.name && (
                    <p className="text-red-500 text-sm">
                      {errors.amenities[index].name.message}
                    </p>
                  )
                }
              />
            </div>
            {amenitiesfileds.length > 1 && (
              <button
                type="button"
                className="bg-red-600 text-white px-2 aspect-square flex items-center justify-center rounded-full cursor-pointer hover:opacity-85"
                onClick={() => amenitiesremove(index)}
              >
                <MdDelete size={20} />
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="bg-white mt-2 border border-gray-400/50 rounded-xl py-5 px-7">
        <div className=" flex  justify-between items-center">
          <Heading text="Seats" />
          <button onClick={() => seatappend({ seattype: "", seatCount: "" })}>
            <Addbutton text="Add Seats" />
          </button>
        </div>

        {seatfields.map((field, index) => (
          <div key={field.id} className="flex items-center mt-5 space-x-4">
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Seat Type
              </label>
              <select
                {...register(`seatdetails.${index}.seattype`, {
                  required: "Seat type is required",
                })}
                className="border rounded px-3 py-3 mt-3 text-sm w-full capitalize"
              >
                <option value="" disabled>
                  Select Seat Type
                </option>
                <option value="Sleeper">Sleeper</option>
                <option value="Seater">Seater</option>
              </select>
              {errors.seatdetails?.[index]?.seattype && (
                <p className="text-red-500 text-sm">
                  {errors.seatdetails[index].seattype.message}
                </p>
              )}
            </div>
            <Input
              placeholder="Enter Seat Count"
              type="number"
              label="Seat Count"
              {...register(`seatdetails.${index}.seatCount`, {
                required: "Seat count is required",
              })}
              errors={
                errors.seatdetails?.[index]?.seatCount && (
                  <p className="text-red-500 text-sm">
                    {errors.seatdetails[index].seatCount.message}
                  </p>
                )
              }
            />
            {seatfields.length > 1 && (
              <button
                type="button"
                className="bg-red-600 text-white px-2 aspect-square flex items-center justify-center rounded-full cursor-pointer hover:opacity-85"
                onClick={() => seatremove(index)}
              >
                <MdDelete size={20} />
              </button>
            )}
          </div>
        ))}

        <button onClick={handleSubmit(Onsubmit)} className=" w-full mt-7">
          <Button text="Submit" type="submit" className="mt-6" />
        </button>
      </div>
    </div>
  );
};

export default Index;
