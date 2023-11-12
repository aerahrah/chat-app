import { updateUserPassword } from "../../../../services/authAPI";
import { useMutation } from "react-query";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import useThemeStore from "../../../../components/state/useThemeStore";
import DialogComponent from "../../../../components/globalComponents/dialogComponent";

const UpdateUserPassword = ({ changePassword, toggleChangePassword }) => {
  const updatePasswordMutation = useMutation(updateUserPassword);
  const theme = useThemeStore((state) => state.theme);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const schema = yup.object().shape({
    currentPassword: yup
      .string()
      .required("Current password is required")
      .min(8, "Password must be at least 8 characters"),
    newPassword: yup
      .string()
      .required("New password is required")
      .min(8, "Password must be at least 8 characters"),
    confirmPassword: yup
      .string()
      .required("Confirm password is required")
      .oneOf(
        [yup.ref("newPassword")],
        "New password and confirm password must match"
      ),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleUpdatePassword = async (userInfo) => {
    try {
      const response = await updatePasswordMutation.mutateAsync(userInfo);

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
    <DialogComponent
      openModal={changePassword}
      closeModal={toggleChangePassword}
      title="change password"
    >
      <div>
        <form
          className="p-2 pb-0 flex flex-col gap-6 w-full"
          onSubmit={handleSubmit(handleUpdatePassword)}
        >
          <div className="flex flex-col w-full gap-1 relative">
            <label className="capitalize">current password</label>
            <input
              className={`${
                errors.currentPassword
                  ? "outline-red-500/80"
                  : "outline-neutral-700 outline-neutral-300"
              } ${
                theme === "light"
                  ? "bg-neutral-100 outline-neutral-300 focus:outline-blue-500"
                  : "bg-neutral-800/70 outline-neutral-800/70"
              } w-full outline outline-1 rounded block p-2  `}
              type="password"
              {...register("currentPassword")}
            />
            <p className="absolute bottom-[-1.15rem] text-xs text-red-500">
              {errors.currentPassword?.message}
            </p>
          </div>
          <div className="flex flex-col w-full gap-1 relative">
            <label className="capitalize">new password</label>
            <input
              className={`${
                errors.newPassword
                  ? "outline-red-500/80 "
                  : "outline-neutral-700 outline-neutral-300"
              } ${
                theme === "light"
                  ? "bg-neutral-100 outline-neutral-300 focus:outline-blue-500"
                  : "bg-neutral-800/70 outline-neutral-800/70"
              }  w-full outline outline-1 rounded block p-2`}
              type="password"
              {...register("newPassword")}
            />
            <p className="absolute bottom-[-1.15rem] text-xs text-red-500">
              {errors.newPassword?.message}
            </p>
          </div>

          <div className="flex flex-col gap-1 relative">
            <label className="capitalize">confirm password </label>
            <input
              className={`${
                errors.confirmPassword
                  ? "outline-red-500/80"
                  : "outline-neutral-700 outline-neutral-300"
              } ${
                theme === "light"
                  ? "bg-neutral-100 outline-neutral-300 focus:outline-blue-500"
                  : "bg-neutral-800/70 outline-neutral-800/70"
              } outline outline-1 rounded block p-2  w-full`}
              type="password"
              {...register("confirmPassword")}
            />
            <p className="absolute bottom-[-1.15rem] text-xs text-red-500">
              {errors.confirmPassword?.message}
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
              value="change password"
            />
          </div>
        </form>
      </div>
    </DialogComponent>
  );
};

export default UpdateUserPassword;
