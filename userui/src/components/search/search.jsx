import React from "react";
import Input from "../../widgets/input";
import { useForm } from "react-hook-form";
import Button from "../../widgets/button";

const Search = () => {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      source: "",
      departure_time: null,
      date: null,
      destination: "",
    },
  });

  const onSubmit = async(data)=>{
    console.log(data)
  }

  return (
    <div>
      <div className=" grid grid-cols-5 items-center gap-2  mt-5 px-5   bg-primary py-10 rounded-2xl  border border-gray-500/50">
        <Input
          placeholder="Enter Source Name"
          type="text"
          label="source"
          {...register("source")}
        />
        <Input
          placeholder="Enter destination  Name"
          type="text"
          label="Destination"
          {...register("destination")}
        />
        <Input
          placeholder="Enter Date"
          type="date"
          label="Select Date"
          {...register("date")}
        />
        <Input
          placeholder="Enter Date"
          type="Time"
          label="Select Time"
          {...register("departure_time")}
        />
        <button onClick={handleSubmit(onSubmit)}>
          <Button text="Submit" />
        </button>
      </div>
    </div>
  );
};

export default Search;
