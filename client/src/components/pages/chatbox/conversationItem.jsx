import { getBgColorTheme, getTextColorTheme } from "../../utils/getColorTheme";
import { getConversationName } from "../sidebar/getAllChats/getChatInfo";
import { useState } from "react";
import useChatCreationStore from "../../state/chat/useChatCreationStore";
import PinMessage from "./pinMessage";
const ConversationItem = ({ message, chatData, userId }) => {
  const colorTheme = useChatCreationStore((state) => state.colorTheme);
  const [pinMessageBtn, setPinMessageBtn] = useState(false);

  const togglePinMessageOption = () => {
    return setPinMessageBtn(!pinMessageBtn);
  };

  return (
    <div
      className={`flex ${
        message.sender === userId ? "justify-end" : "justify-start"
      }`}
    >
      {message.sender === userId ? (
        <div
          className="max-w-[30vw] relative"
          onMouseEnter={togglePinMessageOption}
          onMouseLeave={togglePinMessageOption}
        >
          <PinMessage
            pinMessageBtn={pinMessageBtn}
            message={message.content}
            chatId={chatData.chat._id}
            alignment="user"
          />
          <p
            style={{
              color: getTextColorTheme(colorTheme),
              backgroundColor: getBgColorTheme(colorTheme),
            }}
            className="inline-block py-2 px-3 rounded-[1rem] w-full break-words"
          >
            {message.content}
          </p>
        </div>
      ) : (
        <div
          className="max-w-[30vw] relative"
          onMouseEnter={togglePinMessageOption}
          onMouseLeave={togglePinMessageOption}
        >
          <div className="pl-3 w- text-sm absolute  w-[30vw] top-[-.35rem]">
            <p className="w-full">
              {getConversationName(chatData, message.sender)}
            </p>
          </div>
          <div className="relative w-full  mt-4">
            <p className="inline-block py-2 px-3 bg-neutral-300 text-neutral-700 dark:bg-neutral-700 dark:text-neutral-300 rounded-[1rem] transition duration-[300ms] w-[100%] break-words">
              {message.content}
            </p>
            <PinMessage
              pinMessageBtn={pinMessageBtn}
              message={message.content}
              chatId={chatData.chat._id}
              alignment="member"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ConversationItem;
