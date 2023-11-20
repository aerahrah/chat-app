import { useMutation, useQueryClient } from "react-query";
import { useState } from "react";
import { signIn } from "../../services/authAPI";
import { useMediaQuery } from "react-responsive";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Footer from "../../components/globalComponents/footer";
import useChatCreationStore from "../../components/state/useChatCreationStore";

const SignIn = () => {
  const { setSearchTermChat } = useChatCreationStore();
  const [errorMessage, setErrorMessage] = useState("");
  const mdHeight = useMediaQuery({ maxWidth: 480, maxHeight: 620 });
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const signInMutation = useMutation(signIn);

  const schema = yup.object().shape({
    identifier: yup.string().required("Email or username is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleSignIn = async (userInfo) => {
    try {
      const response = await signInMutation.mutateAsync(userInfo);
      queryClient.clear();
      queryClient.invalidateQueries("getAllChat");
      localStorage.setItem("token", response.token);
      setSearchTermChat("");
      navigate("/chat");
    } catch (error) {
      setErrorMessage(error);
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    }
  };
  return (
    <div
      className={`${
        mdHeight ? "py-6" : ""
      } relative bg-blue-50 min-h-screen min-w-screen dark:bg-neutral-900`}
    >
      <div className="grid grid-cols-1 md:grid-cols-2   justify-items-center place-items-center min-h-screen mx-auto md:max-w-[986px] px-4 gap-10">
        <div className="self-end md:self-center text-center md:text-start max-w-lg">
          <div className=" flex flex-col md:gap-8">
            <h1 className="text-6xl md:text-7xl font-black text-blue-950 dark:text-blue-500 ">
              ChatLink
            </h1>
            <p className="text-lg text-neutral-700 dark:text-blue-100 ">
              Where Conversations Come to Life. Join now to connect effortlessly
              with loved ones and colleagues.
            </p>
          </div>
        </div>

        <form
          className="flex flex-col gap-6 bg-white shadow-lg p-4 md:p-6 rounded-md text-lg dark:bg-neutral-800 w-full max-w-[460px]  self-start md:self-center"
          onSubmit={handleSubmit(handleSignIn)}
        >
          <div className="w-full relative">
            <input
              className={`w-full outline outline-1 outline-neutral-300 text-neutral-700 bg-neutral-50 rounded focus:outline-blue-500 block  p-2 dark:bg-neutral-800 dark:outline-neutral-700 dark:text-neutral-300 w-full md:w-[40vw] max-w-full ${
                errors.identifier
                  ? "dark:outline-red-500/80 outline-red-500"
                  : "dark:outline-neutral-700 outline-neutral-300"
              }`}
              type="text"
              placeholder="Email or username"
              {...register("identifier")}
            />
            <p className="absolute text-xs text-red-500">
              {errors.identifier?.message}
            </p>
          </div>
          <div className="w-full relative">
            <input
              className={` outline outline-1 outline-neutral-300 text-neutral-700 bg-neutral-50 rounded focus:outline-blue-500 block  p-2 dark:bg-neutral-800 dark:outline-neutral-700 dark:text-neutral-300  w-full md:w-[40vw] max-w-full ${
                errors.password
                  ? "dark:outline-red-500/80 outline-red-500"
                  : "dark:outline-neutral-700 outline-neutral-300"
              }`}
              type="password"
              placeholder="Password"
              {...register("password")}
            />
            <p className="absolute text-xs text-red-500">
              {errors.password?.message}
            </p>
          </div>
          <Link to="/" className="w-36 mx-auto inline-block text-center">
            <button className="text-blue-500 text-base ">Sign up</button>
          </Link>

          <div className="relative">
            <hr className="h-[1px] md:mb-2 bg-gray-300" />
            <p className="absolute text-center w-full text-base text-red-500">
              {errorMessage}
            </p>
          </div>

          <div className="flex flex-col">
            <input
              className="p-2 mt-4 text-green-50 transition duration-100  bg-green-500 hover:bg-green-600 min-w-48 w-[60%] mx-auto rounded-md cursor-pointer"
              type="submit"
              value="Sign in"
            />
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default SignIn;
