import { getChatImg, getChatName } from "../../sidebar/getAllChats/getChatInfo";
import { AnimatePresence, motion } from "framer-motion";
import useChatCreationStore from "../../../state/chat/useChatCreationStore";
const ChatMenuLayout = ({ chatData, toggleEditNickname }) => {
  const openChatMenu = useChatCreationStore((state) => state.openChatMenu);

  return (
    <AnimatePresence>
      {openChatMenu && (
        <div className="w-[100%] max-w-[360px] border-l-[1px] border-neutral-300 dark:border-neutral-700 p-4 text-neutral-700 dark:text-neutral-300 font-semibold">
          <div className="flex flex-col items-center w-full mt-4 mb-8">
            <img
              src={getChatImg(chatData.chat, chatData.userId)}
              alt="avatar"
              className="h-16 w-16 rounded-full"
            />
            <h1 className="text-lg">
              {getChatName(chatData.chat, chatData.userId)}
            </h1>
          </div>
          <div className="flex flex-col items-start gap-3 w-full">
            <p className="w-full hover:bg-neutral-200/40 hover:dark:bg-neutral-700/30 rounded-md p-2 cursor-pointer">
              Change Theme
            </p>
            <p className="w-full hover:bg-neutral-200/40  hover:dark:bg-neutral-700/30 rounded-md p-2 cursor-pointer">
              Change Emoji
            </p>
            <button
              className="w-full hover:bg-neutral-200/40 hover:dark:bg-neutral-700/30 rounded-md cursor-pointer text-start flex p-2"
              onClick={toggleEditNickname}
            >
              <p className="p-1 px-2 bg-neutral-200/80 dark:bg-neutral-700/30 rounded-full">
                Aa
              </p>
              <p className="p-1">Edit nickname</p>
            </button>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ChatMenuLayout;
