import { useMutation } from "react-query";
import { useState } from "react";
import { signUp } from "../api/authAPI.js";

const Signup = () => {
  const signUpMutation = useMutation(signUp);
  const [userInfo, setUserInfo] = useState({ username: "", password: "" });

  const handleSingUp = async () => {
    try {
      const data = await signUpMutation.mutateAsync(userInfo);
      console.log(data);
    } catch (error) {}
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
      <button onClick={handleSingUp}>sign up</button>
    </div>
  );
};

export default Signup;
