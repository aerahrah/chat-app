import { useMutation } from "react-query";
import { signUp } from "../api/authAPI.js";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import * as yup from "yup";

const SignUp = () => {
  const signUpMutation = useMutation(signUp);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const schema = yup.object().shape({
    email: yup
      .string()
      .required("Email is required")
      .email("Invalid email format"),
    username: yup
      .string()
      .required("Username is required")
      .min(4, "Username must be at least 4 characters"),
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

  const handleSignUp = async (userInfo) => {
    try {
      const response = await signUpMutation.mutateAsync(userInfo);
      setMessage(response.message);
      setTimeout(() => {
        setMessage("");
      }, 3000);
    } catch (error) {
      setErrorMessage(error);
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    }
  };
  return (
    <div className="bg-blue-50 min-h-screen min-w-screen dark:bg-neutral-900">
      <div className="grid grid-cols-1 md:grid-cols-2   justify-items-center place-items-center min-h-screen mx-auto md:max-w-[940px] px-4 gap-10">
        <h1 className="text-6xl md:text-7xl font-black text-blue-950 dark:text-blue-500 self-end md:self-center">
          ChatMe
        </h1>
        <form
          className="flex flex-col gap-6 bg-white shadow-lg p-4 md:p-6 rounded-md text-lg dark:bg-neutral-800 w-full self-start md:self-center max-w-[460px]"
          onSubmit={handleSubmit(handleSignUp)}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-4 justify-between  transform transition w-full">
            <div className="w-full relative">
              <input
                className={`w-full outline outline-1 outline-neutral-300 text-neutral-700 bg-neutral-50 rounded focus:outline-blue-500 block  p-2 dark:bg-neutral-800 dark:outline-neutral-700 dark:text-neutral-300 ${
                  errors.firstName
                    ? "dark:outline-red-500/80 outline-red-500"
                    : "dark:outline-neutral-700 outline-neutral-300"
                }`}
                placeholder="First Name"
                {...register("firstName")}
              />

              <p className="absolute text-xs text-red-500">
                {errors.firstName?.message}
              </p>
            </div>

            <div className="w-full relative">
              <input
                className={`w-full outline outline-1 outline-neutral-300 text-neutral-700 bg-neutral-50 rounded focus:outline-blue-500 block  p-2 dark:bg-neutral-800 dark:outline-neutral-700 dark:text-neutral-300 ${
                  errors.lastName
                    ? "dark:outline-red-500/80 outline-red-500"
                    : "dark:outline-neutral-700 outline-neutral-300"
                }`}
                placeholder="Last Name"
                {...register("lastName")}
              />
              <p className="absolute text-xs text-red-500">
                {errors.lastName?.message}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-6 w-full">
            <div className="w-full relative">
              <input
                className={`outline outline-1 outline-neutral-300 text-neutral-700 bg-neutral-50 rounded focus:outline-blue-500 block w-full p-2 dark:bg-neutral-800 dark:outline-neutral-700 dark:text-neutral-300 ${
                  errors.username
                    ? "dark:outline-red-500/80 outline-red-500"
                    : "dark:outline-neutral-700 outline-neutral-300"
                }`}
                placeholder="Username"
                {...register("username")}
              />
              <p className="absolute text-xs text-red-500">
                {errors.username?.message}
              </p>
            </div>
            <div className="w-full relative">
              <input
                className={`outline outline-1 outline-neutral-300 text-neutral-700 bg-neutral-50 rounded focus:outline-blue-500 block w-full p-2 dark:bg-neutral-800 dark:outline-neutral-700 dark:text-neutral-300 ${
                  errors.email
                    ? "dark:outline-red-500/80 outline-red-500"
                    : "dark:outline-neutral-700 outline-neutral-300"
                }`}
                placeholder="Email"
                {...register("email")}
              />
              <p className="absolute text-xs text-red-500">
                {errors.email?.message}
              </p>
            </div>
            <div className="w-full relative">
              <input
                className={`outline outline-1 outline-neutral-300 text-neutral-700 bg-neutral-50 rounded focus:outline-blue-500 block w-full p-2 dark:bg-neutral-800 dark:outline-neutral-700 dark:text-neutral-300 ${
                  errors.password
                    ? "dark:outline-red-500/80 outline-red-500"
                    : "dark:outline-neutral-700 outline-neutral-300"
                }`}
                placeholder="Password"
                type="password"
                {...register("password")}
              />
              <p className="absolute text-xs text-red-500">
                {errors.password?.message}
              </p>
            </div>
            <Link
              to="/signin"
              className="w-36 mx-auto inline-block text-center"
            >
              <button className="text-blue-500 text-base ">Go to login</button>
            </Link>
          </div>
          <div className="relative">
            <hr className="h-[1px] mb-3 bg-gray-300" />
            <p className="absolute text-center w-full text-base text-green-500">
              {message}
            </p>
            <p className="absolute text-center w-full text-base text-red-500">
              {errorMessage}
            </p>
          </div>
          <div className="flex flex-col ">
            <input
              className="p-2 mt-4 text-green-50 transition duration-100  bg-green-500 hover:bg-green-600 min-w-48 w-[60%] mx-auto rounded-md cursor-pointer"
              type="submit"
              value="Sign up"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
