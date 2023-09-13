import { useMutation } from "react-query";
import { useState } from "react";
import { signUp } from "../api/authAPI.js";

const SignUp = () => {
  const signUpMutation = useMutation(signUp);
  const [userInfo, setUserInfo] = useState({ username: "", password: "" });

  const handleSignUp = async () => {
    try {
      const data = await signUpMutation.mutateAsync(userInfo);
      console.log(data);
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
          placeholder="Username"
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
      <button onClick={handleSignUp}>sign up</button>
    </div>
  );
};

export default SignUp;