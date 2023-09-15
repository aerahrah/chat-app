import "./App.css";
import { Routes, Route } from "react-router-dom";
import SignUp from "./components/auth/signup";
import SignIn from "./components/auth/signin";
import ChatLayout from "./components/chatLayout";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/chat" element={<ChatLayout />} />
      </Routes>
    </>
  );
}
export default App;
