import React from "react";
import Input from "../../../widgets/input";
import Heading from "../../../widgets/heading";
import Button from "../../../widgets/button";
import { useForm } from "react-hook-form";

import { createOperator } from "../../../api/operators";

const Index = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      contact: "",
      image: "",
    },
  });

  const Onsubmit = async (data) => {
    const formdata = new FormData();
    formdata.append("name", data.name);
    formdata.append("contact", data.contact);
    formdata.append("image", data.image[0]);
    try {
      await createOperator(formdata);
      reset();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-white mt-2 border border-gray-400/50 rounded-xl py-5 px-7">
      <div>
        <Heading text="Add new operator" />
      </div>
      <form onSubmit={handleSubmit(Onsubmit)}>
        <div className="grid grid-cols-2 w-[100%] gap-5">
          <Input
            placeholder="Enter Operator Name"
            type="text"
            label="Operator Name"
            {...register("name", { required: true})}
            errors={errors.name && <p>Please check the Operator Name*</p>}
          />

          <Input
            placeholder="Enter Contact Number"
            type="number"
            label="Contact Number"
            {...register("contact", {
              required: true,
              pattern: {
                value: /^[0-9]{10}$/,
                
              },
            })}
            errors={
              errors.contact && <p>Contact number must be exactly 10 digits*</p>
            }
          />
          <Input
            placeholder="Enter Operator Image"
            type="file"
            label="Operator Image"
            {...register("image",{required: true})}
            errors={errors.image && <p>Please check the Operator Image*</p>}
          />
        </div>

        <Button text="Submit" />
      </form>
    </div>
  );
};

export default Index;
