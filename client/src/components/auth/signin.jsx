import { useMutation } from "react-query";
import { useState } from "react";
import { signIn } from "../api/authAPI.js";

const SignIn = () => {
  const [userInfo, setUserInfo] = useState({ username: "", password: "" });
  const signInMutation = useMutation(signIn);

  const handleSignIn = async () => {
    try {
      const data = await signInMutation.mutateAsync(userInfo);
      const { token } = data;
      localStorage.setItem("token", token);
      const tokenLocal = localStorage.getItem("token");
      console.log(tokenLocal);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div>
        <label htmlFor="">username</label>
        <input
          type="text"
          value={userInfo.username}
          placeholder="username"
          onChange={(e) =>
            setUserInfo((prevVal) => ({ ...prevVal, username: e.target.value }))
          }
        />
      </div>
      <div>
        <label htmlFor="">password</label>
        <input
          type="password"
          value={userInfo.password}
          placeholder="password"
          onChange={(e) =>
            setUserInfo((prevVal) => ({ ...prevVal, password: e.target.value }))
          }
        />
      </div>
      <button onClick={handleSignIn}>Signin</button>
    </div>
  );
};

export default SignIn;
