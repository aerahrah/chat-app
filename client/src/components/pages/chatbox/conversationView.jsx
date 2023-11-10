import { useEffect, useState, useRef } from "react";
import ConversationItem from "./conversationItem";

import socket from "../../socket/socket";

const ConversationView = ({ chatData, chatId, userId }) => {
  const [messages, setMessages] = useState(chatData.chat.messages);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    socket.emit("join chat", chatId);
    socket.on("receive message", receiveMessageHandler);
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    return () => {
      socket.off("receive message", receiveMessageHandler);
      socket.emit("leave chat", chatId);
    };
  }, [chatId, userId]);

  const receiveMessageHandler = (userId, message) => {
    try {
      const messageObject = { sender: userId, content: message };
      setMessages((prevMessages) => [...prevMessages, messageObject]);
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    } catch (error) {
      console.error("Error handling received message:", error);
    }
  };

  return (
    <div
      className="flex flex-col w-full h-screen max-h-[100%] overflow-y-auto p-4 gap-2"
      ref={chatContainerRef}
    >
      {messages.map((message, index) => (
        <ConversationItem
          message={message}
          userId={userId}
          chatData={chatData}
          key={index}
        />
      ))}
    </div>
  );
};

export default ConversationView;
