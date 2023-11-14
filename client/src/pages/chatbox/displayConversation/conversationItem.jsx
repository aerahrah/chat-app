import {
  getBgColorTheme,
  getTextColorTheme,
} from "../../../utils/getColorTheme";
import { getConversationName } from "../../../utils/getChatInfo";
import { useState } from "react";
import { BiSolidPin } from "react-icons/bi";
import useChatCreationStore from "../../../components/state/useChatCreationStore";
import PinMessage from "./pinMessage";

const ConversationItem = ({ message, chatData, userId }) => {
  const colorTheme = useChatCreationStore((state) => state.colorTheme);
  const [pinMessageBtn, setPinMessageBtn] = useState(false);
  let findPinnedMessageId = null;
  const togglePinMessageOption = () => {
    return setPinMessageBtn(!pinMessageBtn);
  };

  const isMessagePinned = chatData.chat.pinMessages.some(
    (data) => data.pinMessage === message._id
  );

  if (isMessagePinned) {
    findPinnedMessageId = chatData.chat.pinMessages.find(
      (data) => data.pinMessage === message._id
    );
    console.log("hello", findPinnedMessageId);
  }
  return (
    <div
      className={`flex  ${
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
            messageId={isMessagePinned ? findPinnedMessageId._id : message._id}
            chatId={chatData.chat._id}
            isMessagePinned={isMessagePinned}
            alignment="user"
          />
          {isMessagePinned && (
            <i className="absolute right-[-.5rem] top-[-.5rem] transform rotate-45">
              <BiSolidPin className="h-5 w-5 text-neutral-700" />
            </i>
          )}

          <p
            style={{
              color: getTextColorTheme(colorTheme),
              backgroundColor: getBgColorTheme(colorTheme),
            }}
            className="inline-block  py-2 px-3 rounded-[1rem] w-full break-words"
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
            {isMessagePinned && (
              <i className="absolute left-[-.5rem] top-[-.5rem] transform rotate-[315deg]">
                <BiSolidPin className="h-5 w-5 text-neutral-700" />
              </i>
            )}
            <PinMessage
              pinMessageBtn={pinMessageBtn}
              messageId={
                isMessagePinned ? findPinnedMessageId._id : message._id
              }
              isMessagePinned={isMessagePinned}
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
