import { useState } from "react";
import { updateUserInfo } from "../../../../api/authAPI";
import { useMutation, useQueryClient } from "react-query";
import { AnimatePresence, motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const UpdateUserInfo = ({ data, theme, isEditImgOpen }) => {
  const queryClient = useQueryClient();
  const updateUserInfoMutation = useMutation(updateUserInfo);
  const [initialState, setInitialState] = useState(false);
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
    firstName: yup.string().required("First Name is required"),
    lastName: yup.string().required("Last Name is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: data.firstName,
      lastName: data.lastName,
      username: data.username,
      email: data.email,
    },
  });

  const handleUpdateUserInfo = async (userInfo) => {
    try {
      const updatedUserInfo = await updateUserInfoMutation.mutateAsync(
        userInfo
      );

      queryClient.invalidateQueries("userData");
      queryClient.invalidateQueries("getAllChat");
      queryClient.invalidateQueries("getConversation");
      setMessage(updatedUserInfo.message);

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
    <AnimatePresence>
      <div>
        {!isEditImgOpen && (
          <motion.div
            initial={{ x: !isEditImgOpen && initialState ? -300 : 0 }}
            animate={{ x: !isEditImgOpen ? 0 : -300 }}
            onAnimationComplete={() => setInitialState(true)}
          >
            <div>
              <h3 className="mt-4 m-2 font-semibold">personal information</h3>
              <form
                className="p-2 pb-0 flex flex-col gap-6 w-full"
                onSubmit={handleSubmit(handleUpdateUserInfo)}
              >
                <div className="flex gap-4 justify-between">
                  <div className="flex flex-col w-full gap-1 relative">
                    <label>First Name</label>
                    <input
                      className={`${
                        errors.firstName
                          ? "dark:outline-red-500/80 outline-red-500"
                          : "dark:outline-neutral-700 outline-neutral-300"
                      } ${
                        theme === "light"
                          ? "bg-neutral-100 outline-neutral-300 focus:outline-blue-500"
                          : "bg-neutral-800/70 outline-neutral-800/70"
                      } w-full outline outline-1 rounded block p-2  `}
                      type="text"
                      {...register("firstName")}
                    />
                    <p className="absolute bottom-[-1.15rem] text-xs text-red-500">
                      {errors.firstName?.message}
                    </p>
                  </div>
                  <div className="flex flex-col w-full gap-1 relative">
                    <label>Last Name</label>
                    <input
                      className={`${
                        errors.lastName
                          ? "dark:outline-red-500/80 outline-red-500"
                          : "dark:outline-neutral-700 outline-neutral-300"
                      } ${
                        theme === "light"
                          ? "bg-neutral-100 outline-neutral-300 focus:outline-blue-500"
                          : "bg-neutral-800/70 outline-neutral-800/70"
                      }  w-full outline outline-1 rounded block p-2`}
                      type="text"
                      {...register("lastName")}
                    />
                    <p className="absolute bottom-[-1.15rem] text-xs text-red-500">
                      {errors.lastName?.message}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-1 relative">
                  <label>Username </label>
                  <input
                    className={`${
                      errors.username
                        ? "dark:outline-red-500/80 outline-red-500"
                        : "dark:outline-neutral-700 outline-neutral-300"
                    } ${
                      theme === "light"
                        ? "bg-neutral-100 outline-neutral-300 focus:outline-blue-500"
                        : "bg-neutral-800/70 outline-neutral-800/70"
                    } outline outline-1 rounded block p-2  w-full`}
                    type="text"
                    {...register("username")}
                  />
                  <p className="absolute bottom-[-1.15rem] text-xs text-red-500">
                    {errors.username?.message}
                  </p>
                </div>
                <div className="flex flex-col gap-1 relative">
                  <label>Email</label>
                  <input
                    className={`${
                      errors.email
                        ? "dark:outline-red-500/80 outline-red-500"
                        : "dark:outline-neutral-700 outline-neutral-300"
                    } ${
                      theme === "light"
                        ? "bg-neutral-100 outline-neutral-300 focus:outline-blue-500"
                        : "bg-neutral-800/70 outline-neutral-800/70"
                    } outline outline-1 rounded block p-2 w-full`}
                    type="text"
                    {...register("email")}
                  />
                  <p className="absolute bottom-[-1.15rem] text-xs text-red-500">
                    {errors.email?.message}
                  </p>
                </div>
                <div className="relative  mt-[-1.5rem] py-3">
                  <p className="absolute text-center w-full text-base text-green-500">
                    {message}
                  </p>
                  <p className="absolute text-center w-full text-base text-red-500">
                    {errorMessage}
                  </p>
                </div>
                <div className="w-[100%]">
                  <input
                    className="block bg-blue-500 text-blue-50 rounded p-2 hover:bg-blue-600 mx-auto shadow-md capitalize w-[80vw] max-w-[80%] cursor-pointer"
                    type="submit"
                    value="Update profile"
                  />
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </div>
    </AnimatePresence>
  );
};
export default UpdateUserInfo;
