import "./App.css";
import { Routes, Route } from "react-router-dom";
import SignUp from "./components/auth/signup";
import SignIn from "./components/auth/signin";
import ChatLayout from "./components/chatLayout";
import MainChatBox from "./components/pages/chatbox/mainChatBox";
import socket from "./components/socket/socket";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    socket.on("connect", () => {
      console.log("WebSocket connection is open.");
    });

    return () => {
      socket.off("connect");
    };
  }, []);
  return (
    <>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/chat/*" element={<ChatLayout />}>
          <Route path=":chatId" element={<MainChatBox />} />
        </Route>
      </Routes>
    </>
  );
}
export default App;
