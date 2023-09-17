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
    <div>
      <div>
        <label htmlFor="">First Name</label>
        <input
          type="text"
          value={userInfo.firstName}
          placeholder="First Name"
          onChange={(e) =>
            setUserInfo((prevVal) => ({
              ...prevVal,
              firstName: e.target.value,
            }))
          }
        />
      </div>
      <div>
        <label htmlFor="">Last Name</label>
        <input
          type="text"
          value={userInfo.lastName}
          placeholder="Last Name"
          onChange={(e) =>
            setUserInfo((prevVal) => ({ ...prevVal, lastName: e.target.value }))
          }
        />
      </div>
      <div>
        <label htmlFor="">Username</label>
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
        <label htmlFor="">Email</label>
        <input
          type="text"
          value={userInfo.email}
          placeholder="Email"
          onChange={(e) =>
            setUserInfo((prevVal) => ({ ...prevVal, email: e.target.value }))
          }
        />
      </div>

      <div>
        <label htmlFor="">Password</label>
        <input
          type="password"
          value={userInfo.password}
          placeholder="Password"
          required
          onChange={(e) =>
            setUserInfo((prevVal) => ({ ...prevVal, password: e.target.value }))
          }
        />
      </div>
      <p>
        Click here to
        <Link to="/signin">Sign in</Link>
      </p>
      <button onClick={handleSignUp}>sign up</button>
    </div>
  );
};

export default SignUp;
