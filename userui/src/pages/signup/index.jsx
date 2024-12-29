import React, { useEffect } from "react";
import Input from "../../widgets/input";
import { useForm } from "react-hook-form";
import Button from "../../widgets/button";
import imagebtn from "../../assets/logo.png";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom"
import toast from "react-hot-toast";

const Signup = () => {



  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
    },
  });

  const navigate = useNavigate()

 
  const onSubmit = async (data) => {
    try {
      const response = await axios.post("http://localhost:3000/api/auth/signup", data);
      

      if (response.status === 200) {
        const token = response.data.token;
        await localStorage.setItem("token", token);
        toast.success("Signup Success", {
          style: {
            borderRadius: "10px",
            border: "1px solid #333",
          },
        })
        navigate("/");
      }
    } catch (error) {

      if (error.response && error.response.status === 400) {
       
        toast.error(error.response.data.message,{
          style:{
            borderRadius:"10px",
            border:"1px solid #333",
          }
        });
        
      }
    }
  };

  return (
    <div className=" w-full h-screen flex justify-center items-center flex-col bg-white/90">
      <div className="  w-[400px] border border-gray-500/20 flex flex-col justify-center items-center px-6 py-10 rounded-lg ">
        <div className=" flex  items-center space-x-3 mb-10 bg-gray-400/10 px-5 py-2 rounded-full cursor-pointer hover:opacity-80">
          <img src={imagebtn} className=" w-10" />
          <h2 className=" text-xl font-semibold capitalize">fare Finder</h2>
        </div>

        <div className="flex flex-col space-y-5 w-full ">
          <Input
            placeholder="Enter Name"
            type="text"
            {...register("name")}
            label="Name"
            {...register("name", {
              required: {
                value: true,
                message: "Name is required",
              },
              
            })}
            errors={errors.name && <p>{errors.name.message}</p>}
          />
          <Input
            placeholder="Enter Email"
            type="email"
            {...register("email")}
            label="Email"
            {...register("email", {
              required: {
                value: true,
                message: "Email is required",
              },
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Please enter a valid email address",
              },
            })}
            errors={errors.email && <p>{errors.email.message}</p>}
          />

          <Input
            placeholder="Enter Password"
            type="password"
            {...register("password")}
            label="Password"
            {...register("password", {
              required: {
                value: true,
                message: "Password is required",
              },
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            errors={errors.password && <p>{errors.password.message}</p>}
          />
          <Input
            placeholder="Enter PhoneNumber"
            type="number"
            {...register("phone")}
            label="PhoneNumber"
            {...register("phone", {
              required: {
                value: true,
                message: "PhoneNumber is required",
              },
              maxLength:{
                value:10,
                message:"PhoneNumber must be 10 digits"
              }
            })}
            errors={errors.phone && <p>{errors.phone.message}</p>}
          />
          <div onClick={handleSubmit(onSubmit)}>
            <Button text="Signup" />
          </div>
          <p className="  text-center text-sm">Already have an account? <span className=" font-bold text-green-600"><Link to="/login">Login</Link></span></p>

        </div>
      </div>
    </div>
  );
};

export default Signup;
