import { getConversationName } from "../sidebar/getAllChats/getChatInfo";

const ConversationView = ({ chatData, userId }) => {
  console.log(chatData);
  return (
    <div className="flex flex-col w-full h-screen max-h-[100%] overflow-y-auto p-4 gap-2">
      {chatData.chat.messages.map((message) => (
        <div
          className={`flex ${
            message.sender === userId ? "justify-end" : "justify-start"
          }`}
          key={message._id}
        >
          {message.sender === userId ? (
            <p className="py-2 px-3 bg-blue-500 text-blue-50 rounded-full">
              {message.content}
            </p>
          ) : (
            <div>
              <p className="px-3 text-sm">
                {getConversationName(chatData, userId)}
              </p>
              <p className="inline-block py-2 px-3 bg-neutral-300 text-neutral-700 rounded-full">
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
