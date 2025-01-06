import React from "react";
import Input from "../../widgets/input";
import { useForm } from "react-hook-form";
import Button from "../../widgets/button";
import imagebtn from "../../assets/logo.png";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom"
import toast from "react-hot-toast";

const Login = () => {
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
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        data
      );
      const token = response.data.token
      toast.success("Login Success", {
        duration: 4000,
        position: "top-right",
      })

      await localStorage.setItem("token",token)

      navigate("/")
      
    } catch (error) {
      toast.error(error.response.data.message, {
        duration: 4000,
        position: "top-right",
      })
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
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
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
            })}
            errors={errors.password && <p>{errors.password.message}</p>}
          />
         
          <div onClick={handleSubmit(onSubmit)}>
            <Button text="Login" />
          </div>
          <p className="  text-center text-sm">Don't have an account ? <span className=" font-bold text-green-600"><Link to="/signup">Signup</Link></span></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
