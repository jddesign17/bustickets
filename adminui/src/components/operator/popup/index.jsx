import Heading from "../../../widgets/heading";
import Input from "../../../widgets/input";
import Button from "../../../widgets/button";
import { IoIosCloseCircle } from "react-icons/io";
import { useForm } from "react-hook-form";
import { updateOperator } from "../../../api/operators";

const Popup = ({ setOpen, item }) => {
  const { register, reset, handleSubmit } = useForm({
    defaultValues: {
        name: item.name,
        contact: item.contact,
        image:item.image
    }
  });

  const onSubmit = async (data) => {
    const formdata = new FormData();
    formdata.append("name", data.name);
    formdata.append("contact", data.contact);
    if(data.image !== "")
    {
      formdata.append("image", data.image[0]);
    }else
    {
      formdata.append("image", item.image);
    }
    try {
      await updateOperator(formdata, item._id);
      reset();
      setOpen(false);
    } catch (err) {
      console.log(err);
    }

    console.log(data)
  };

  return (
    <div className=" fixed top-0 left-0 w-full h-screen flex justify-center items-center bg-white/90">
      <div className=" bg-white min-w-[600px] px-7 py-10 border border-gray-500 rounded-lg">
        <div className=" flex justify-between items-center">
          <Heading text="Edit Operator" />
          <IoIosCloseCircle
            size={30}
            className=" hover:text-red-600 cursor-pointer"
            onClick={() => setOpen(false)}
          />
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
        <div className=" flex flex-col space-y-3 ">
          <Input
            type="text"
            label="operator name"
            placeholder="Enter Operator Name"
          
            {...register("name")}
          />
          <Input
            type="text"
            label="contact Number"
            placeholder="Enter Operator Contact Number"
           
            {...register("contact")}
          />
          <Input
            type="file"
            label="operator image"
            placeholder="contact"
            {...register("image")}
           
          />
        </div>
        <Button text="update" />
        </form>
      </div>
    </div>
  );
};

export default Popup;
