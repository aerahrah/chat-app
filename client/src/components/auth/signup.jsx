import { useMutation } from "react-query";
import { useState } from "react";
import { signUp } from "../api/authAPI.js";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const SignUp = () => {
  const signUpMutation = useMutation(signUp);
  const schema = yup.object().shape({
    email: yup
      .string()
      .required("Email is required")
      .email("Invalid email format"),
    username: yup.string().required("Username is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters"),
    firstName: yup.string().required("First Name is required"),
    lastName: yup.string().required("Last Name is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleSignUp = async (data) => {
    try {
      console.log(data);
      const response = await signUpMutation.mutateAsync(data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="bg-blue-50 min-h-screen min-w-screen dark:bg-neutral-900">
      <div className="flex justify-between items-center min-h-screen mx-auto max-w-[940px]">
        <h1 className="text-7xl font-black text-blue-950 dark:text-blue-500">
          ChatMe
        </h1>
        <form
          className="flex flex-col gap-4 bg-white shadow-lg p-6 rounded-md text-lg dark:bg-neutral-800"
          onSubmit={handleSubmit(handleSignUp)}
        >
          <div className="flex gap-4 justify-between ">
            <input
              className="outline outline-1 outline-neutral-300 text-neutral-700 bg-neutral-50 rounded focus:outline-blue-500 block w-full p-2 dark:bg-neutral-800 dark:outline-neutral-700 dark:text-neutral-300"
              placeholder="First Name"
              {...register("firstName")}
            />
            <p>{errors.firstName?.message}</p>
            <input
              className="outline outline-1 outline-neutral-300 text-neutral-700 bg-neutral-50 rounded focus:outline-blue-500 block w-full p-2 dark:bg-neutral-800 dark:outline-neutral-700 dark:text-neutral-300"
              placeholder="Last Name"
              {...register("lastName")}
            />
          </div>
          <div className="flex flex-col gap-4">
            <input
              className="outline outline-1 outline-neutral-300 text-neutral-700 bg-neutral-50 rounded focus:outline-blue-500 block w-full p-2 dark:bg-neutral-800 dark:outline-neutral-700 dark:text-neutral-300"
              placeholder="Username"
              {...register("username")}
            />
            <input
              className="outline outline-1 outline-neutral-300 text-neutral-700 bg-neutral-50 rounded focus:outline-blue-500 block w-full p-2 dark:bg-neutral-800 dark:outline-neutral-700 dark:text-neutral-300"
              placeholder="Email"
              type="email"
              {...register("email")}
            />
            <input
              className="outline outline-1 outline-neutral-300 text-neutral-700 bg-neutral-50 rounded focus:outline-blue-500 block w-full p-2 dark:bg-neutral-800 dark:outline-neutral-700 dark:text-neutral-300"
              placeholder="Password"
              type="password"
              {...register("password")}
            />
            <button className="text-base text-blue-500">
              <Link to="/signin">Go to login</Link>
            </button>
          </div>
          <hr className="h-[1px] bg-neutral-300 dark:bg-neutral-800" />
          <div className="flex flex-col ">
            <input
              className="p-2 mt-4 text-green-50 transition duration-100  bg-green-500 hover:bg-green-600 min-w-48 w-[60%] mx-auto rounded-md"
              type="submit"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
