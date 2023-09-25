import { useMutation, useQueryClient, useQuery } from "react-query";
import { useState } from "react";
import { signIn } from "../api/authAPI.js";
import { Link, useNavigate } from "react-router-dom";

const SignIn = () => {
  const [userInfo, setUserInfo] = useState({ identifier: "", password: "" });
  const queryClient = useQueryClient();
  const signInMutation = useMutation(signIn);
  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      const data = await signInMutation.mutateAsync(userInfo);
      queryClient.clear();
      queryClient.invalidateQueries("getAllChat");
      localStorage.setItem("token", data.token);

      navigate("/chat");
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
        <div className="flex flex-col gap-4 bg-white shadow-lg p-6 rounded-md text-lg dark:bg-neutral-800">
          <input
            className="outline outline-1 text-neutral-700 bg-neutral-50 outline-neutral-300 rounded focus:outline-blue-500 block p-2  w-[100vw] max-w-[400px] dark:text-neutral-300 dark:bg-neutral-800 dark:outline-neutral-700 "
            type="text"
            value={userInfo.identifier}
            placeholder="Email or username"
            onChange={(e) =>
              setUserInfo((prevVal) => ({
                ...prevVal,
                identifier: e.target.value,
              }))
            }
          />

          <input
            className="outline outline-1 text-neutral-700 bg-neutral-50 outline-neutral-300 rounded focus:outline-blue-500 block p-2  w-[100vw] max-w-[400px]   dark:text-neutral-300 dark:bg-neutral-800 dark:outline-neutral-700 "
            type="password"
            value={userInfo.password}
            placeholder="Password"
            onChange={(e) =>
              setUserInfo((prevVal) => ({
                ...prevVal,
                password: e.target.value,
              }))
            }
          />
          <button className="text-blue-500 text-base">
            <Link to="/">Sign up</Link>
          </button>
          <hr className="h-[1px]  bg-gray-300" />
          <div className="flex flex-col ">
            <button
              className="p-2 mt-4 text-green-50 transition duration-100  bg-blue-500 hover:bg-blue-600 min-w-48 w-[60%] mx-auto rounded-md"
              onClick={handleSignIn}
            >
              Sign in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
