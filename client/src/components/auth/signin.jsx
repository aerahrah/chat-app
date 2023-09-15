import { useMutation } from "react-query";
import { useState } from "react";
import { signIn } from "../api/authAPI.js";
import { Link, useNavigate } from "react-router-dom";

const SignIn = () => {
  const [userInfo, setUserInfo] = useState({ username: "", password: "" });
  const signInMutation = useMutation(signIn);
  const navigate = useNavigate();
  const handleSignIn = async () => {
    try {
      const data = await signInMutation.mutateAsync(userInfo);
      localStorage.setItem("token", data.token);
      navigate("/chat");
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
      <p>
        Click here to
        <Link to="/">Sign up</Link>
      </p>
      <button onClick={handleSignIn}>Signin</button>
    </div>
  );
};

export default SignIn;
