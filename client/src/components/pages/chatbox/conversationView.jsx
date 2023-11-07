import { getConversationName } from "../sidebar/getAllChats/getChatInfo";
import { useEffect, useState, useRef } from "react";
import { getBgColorTheme, getTextColorTheme } from "../../utils/getColorTheme";
import socket from "../../socket/socket";

const ConversationView = ({ chatData, chatId, userId }) => {
  const [messages, setMessages] = useState(chatData.chat.messages);
  const [colorTheme, setColorTheme] = useState(chatData.chat.colorTheme);
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
        <div
          className={`flex ${
            message.sender === userId ? "justify-end" : "justify-start"
          }`}
          key={index}
        >
          {message.sender === userId ? (
            <div className="max-w-[30vw]">
              <p
                style={{
                  color: getTextColorTheme(colorTheme),
                  backgroundColor: getBgColorTheme(colorTheme),
                }}
                className="inline-block py-2 px-3 rounded-[1rem] w-[100%] break-words"
              >
                {message.content}
              </p>
            </div>
          ) : (
            <div className="max-w-[30vw]">
              <p className="px-3 text-sm">
                {getConversationName(chatData, userId)}
              </p>
              <p className="inline-block py-2 px-3 bg-neutral-300 text-neutral-700 dark:bg-neutral-700 dark:text-neutral-300 rounded-[1rem] transition duration-[300ms] w-[100%] break-words">
                {message.content}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ConversationView;
