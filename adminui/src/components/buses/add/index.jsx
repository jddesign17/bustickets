import React from "react";
import Input from "../../../widgets/input";
import Heading from "../../../widgets/heading";
import Button from "../../../widgets/button";
import { useForm } from "react-hook-form";
import { useGetOperators } from "../../../api/operators";
import { createBuses } from "../../../api/buses";

const Index = () => {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      registration_number: "",
      seat_count: "",
      image1:null,
      operatorId: "",
      image2:null,
      amenities:""
    },
  });

  const operators = useGetOperators();

  const Onsubmit = async (data) => {
    try {
      const formData = new FormData();
      console.log(data.image1[0])

      formData.append("registration_number", data.registration_number);
      formData.append("seatCount", data.seat_count);
      formData.append("operatorid", data.operatorId);
      formData.append("image1", data.image1[0] || "");
      formData.append("image2", data.image2[0] || "");
      formData.append("bustype",data.bustype)
      formData.append("amenities",data.amenities)
    
      await createBuses(formData);
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white mt-2 border border-gray-400/50 rounded-xl py-5 px-7">
      <div>
        <Heading text="Add New Bus" />
      </div>
      <form onSubmit={handleSubmit(Onsubmit)}>
        <div className="grid grid-cols-2 w-[100%] gap-5">
          <Input
            placeholder="Enter Registration Number"
            type="text"
            label="Registration Number"
            {...register("registration_number")}
          />
          <Input
            placeholder="Enter Seat Count"
            type="number"
            label="Seat Count"
            {...register("seat_count")}
          />
          <Input
            placeholder="Choose Bus Image1"
            type="file"
            label="Choose Bus Image"
            {...register("image1")}
          />
          <Input
            placeholder="Choose Bus Image2"
            type="file"
            label="Choose Bus Image"
            {...register("image2")}
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 ">
              Select Operator
            </label>
            <select
              {...register("operatorId")}
              className="border rounded px-3 py-3 mt-3 text-sm w-full capitalize"
            >
              <option value="" className=" py-10" disabled>
                Select an Operator
              </option>
              {operators.map((operator) => (
                <option
                  key={operator.id}
                  value={operator._id}
                  className="py-10 capitalize"
                >
                  {operator.name} {" -"}({operator.contact})
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 ">
              Select Bus Type
            </label>
            <select
              {...register("bustype")}
              className="border rounded px-3 py-3 mt-3 text-sm w-full capitalize"
            >
              <option value="" className=" py-10" disabled selected>
                {" "}
                Select Bus Type
              </option>
              <option value="Ac" className="py-10">
                Ac
              </option>
              <option value="Non Ac" className="py-10">
                Non Ac
              </option>
            </select>
          </div>

          <Input
            placeholder="amenities"
            type="text"
            label="Enter amenities"
            {...register("amenities")}
          />
        </div>

        <Button text="Submit" />
      </form>
    </div>
  );
};

export default Index;
