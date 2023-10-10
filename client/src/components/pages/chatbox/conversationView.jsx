import { getConversationName } from "../sidebar/getAllChats/getChatInfo";
import { useEffect, useState } from "react";
import socket from "../../socket/socket";

const ConversationView = ({ chatData, chatId, userId }) => {
  const [messages, setMessages] = useState(chatData.chat.messages);
  console.log(chatId);

  useEffect(() => {
    socket.emit("join chat", chatId);

    socket.on("receive message", (message) => {
      try {
        setMessages((prevMessages) => [...prevMessages, message]);
        console.log("Received message:", message);
      } catch (error) {
        console.error("Error handling received message:", error);
      }
    });

    return () => {
      socket.emit("leave chat", chatId);
      socket.disconnect();
    };
  }, [chatId]);

  return (
    <div className="flex flex-col w-full h-screen max-h-[100%] overflow-y-auto p-4 gap-2">
      {messages.map((message) => (
        <div
          className={`flex ${
            message.sender === userId ? "justify-end" : "justify-start"
          }`}
          key={message._id}
        >
          {message.sender === userId ? (
            <div className="max-w-[30vw]">
              <p className="inline-block py-2 px-3 bg-blue-500 text-blue-50 rounded-[1rem] w-[100%] break-words">
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
