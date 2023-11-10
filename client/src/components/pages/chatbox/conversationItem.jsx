import { getBgColorTheme, getTextColorTheme } from "../../utils/getColorTheme";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { getConversationName } from "../sidebar/getAllChats/getChatInfo";
import { useState } from "react";
import useChatCreationStore from "../../state/chat/useChatCreationStore";
const ConversationItem = ({ message, chatData, userId }) => {
  const [pinMessageBtn, setPinMessageBtn] = useState(false);
  const colorTheme = useChatCreationStore((state) => state.colorTheme);

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
          {pinMessageBtn && (
            <div className="absolute left-[-2rem] inset-y-0 inset-x-0 flex items-center">
              <button className="p-1 bg-neutral-200 hover:bg-neutral-300 dark:bg-neutral-900/40 dark:hover:bg-neutral-900/70 rounded-full">
                <BiDotsVerticalRounded className="h-5 w-5 text-neutral-700 dark:text-neutral-400" />
              </button>
            </div>
          )}
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
            <p className="w-full">{getConversationName(chatData, userId)}</p>
          </div>
          <div className="relative w-full  mt-4">
            <p className="inline-block py-2 px-3 bg-neutral-300 text-neutral-700 dark:bg-neutral-700 dark:text-neutral-300 rounded-[1rem] transition duration-[300ms] w-[100%] break-words">
              {message.content}
            </p>
            {pinMessageBtn && (
              <div className="absolute right-[-3rem] px-4 inset-y-0  flex items-center">
                <button className="p-1 bg-neutral-200 hover:bg-neutral-300 dark:bg-neutral-900/40 dark:hover:bg-neutral-900/70 rounded-full">
                  <BiDotsVerticalRounded className="h-5 w-5 text-neutral-700 dark:text-neutral-400" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
export default ConversationItem;
