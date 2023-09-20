import { useMutation } from "react-query";
import { useState } from "react";
import { signUp } from "../api/authAPI.js";
import { Link } from "react-router-dom";

const SignUp = () => {
  const signUpMutation = useMutation(signUp);
  const [userInfo, setUserInfo] = useState({
    email: "",
    username: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  const handleSignUp = async () => {
    try {
      const data = await signUpMutation.mutateAsync(userInfo);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="bg-blue-50 min-h-screen min-w-screen">
      <div className="flex justify-between items-center min-h-screen mx-auto max-w-[940px]">
        <h1 className="text-7xl font-black text-blue-950">ChatMe</h1>
        <div className="flex flex-col gap-4 bg-white shadow-lg p-6 rounded-md text-lg">
          <div className="flex gap-4 justify-between ">
            <input
              className="outline outline-1 outline-gray-400 rounded-sm focus:outline-blue-500 block w-full p-2"
              type="text"
              value={userInfo.firstName}
              placeholder="First Name"
              required
              onChange={(e) =>
                setUserInfo((prevVal) => ({
                  ...prevVal,
                  firstName: e.target.value,
                }))
              }
            />

            <input
              className="outline outline-1 outline-gray-400 rounded-sm focus:outline-blue-500 block w-full p-2"
              type="text"
              value={userInfo.lastName}
              placeholder="Last Name"
              required
              onChange={(e) =>
                setUserInfo((prevVal) => ({
                  ...prevVal,
                  lastName: e.target.value,
                }))
              }
            />
          </div>
          <div className="flex flex-col gap-4">
            <input
              className="outline outline-1 outline-gray-400 rounded-sm focus:outline-blue-500 block w-full p-2"
              type="text"
              value={userInfo.username}
              placeholder="Username"
              required
              onChange={(e) =>
                setUserInfo((prevVal) => ({
                  ...prevVal,
                  username: e.target.value,
                }))
              }
            />
            <input
              className="outline outline-1 outline-gray-400 rounded-sm focus:outline-blue-500 block w-full p-2"
              type="text"
              value={userInfo.email}
              placeholder="Email"
              required
              onChange={(e) =>
                setUserInfo((prevVal) => ({
                  ...prevVal,
                  email: e.target.value,
                }))
              }
            />
            <input
              className="outline outline-1 outline-gray-400 rounded-sm focus:outline-blue-500 block w-full p-2"
              type="password"
              value={userInfo.password}
              placeholder="Password"
              required
              onChange={(e) =>
                setUserInfo((prevVal) => ({
                  ...prevVal,
                  password: e.target.value,
                }))
              }
            />
            <button className="text-base text-blue-500">
              <Link to="/signin">Go to login</Link>
            </button>
          </div>
          <hr className="h-[2px]  bg-gray-300" />
          <div className="flex flex-col ">
            <button
              className="p-2 mt-4 text-green-50 transition duration-100  bg-green-500 hover:bg-green-600 min-w-48 w-[60%] mx-auto rounded-md"
              onClick={handleSignUp}
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
