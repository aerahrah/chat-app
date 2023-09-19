import { useMutation, useQueryClient } from "react-query";
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
      queryClient.invalidateQueries("getAllChat");
      localStorage.setItem("token", data.token);

      navigate("/chat");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="bg-blue-50 min-h-screen min-w-screen">
      <div className="flex justify-between items-center min-h-screen mx-auto max-w-[940px]">
        <h1 className="text-7xl font-black text-blue-950">ChatMe</h1>
        <div className="flex flex-col gap-4 bg-white shadow-lg p-6 rounded-md text-lg">
          <input
            className="outline outline-1 outline-gray-400 rounded-sm focus:outline-blue-500 block p-2 w-[100vw] max-w-[400px]"
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
            className="outline outline-1 outline-gray-400 rounded-sm focus:outline-blue-500 block p-2 w-[100vw] max-w-[400px]"
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
          <hr className="h-[2px]  bg-gray-300" />
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
