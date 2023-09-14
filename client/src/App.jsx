import "./App.css";
import { Routes, Route } from "react-router-dom";
import SignUp from "./components/auth/signup";
import SignIn from "./components/auth/signin";
import CreateChat from "./components/pages/menu/createChat.jsx";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/chat" element={<CreateChat />} />
      </Routes>
    </>
  );
}
export default App;
