import "./App.css";
import { Routes, Route } from "react-router-dom";
import SignUp from "./components/auth/signup";
import SignIn from "./components/auth/signin";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </>
  );
}
export default App;
