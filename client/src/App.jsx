import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import SignUp from "./pages/auth/signup";
import SignIn from "./pages/auth/signin";
import ChatLayout from "./pages/chatLayout";
import MainChatBox from "./pages/chatbox/mainChatBox";
import socket from "./socket/socket";

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
