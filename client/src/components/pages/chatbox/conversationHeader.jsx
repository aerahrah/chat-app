import { getChatName, getChatImg } from "../sidebar/getAllChats/getChatInfo";
import useChatCreationStore from "../../state/chat/useChatCreationStore";
import { BiDotsHorizontalRounded } from "react-icons/bi";

const ConversationHeader = ({ chatData }) => {
  const toggleOpenChatMenu = useChatCreationStore(
    (state) => state.toggleOpenChatMenu
  );

  return (
    <header className="p-4 border-neutral-300 border-b-[1px] shadow-sm dark:border-neutral-700 transition duration-[300ms] ">
      <div className="flex justify-between text-neutral-700 dark:text-neutral-300 ">
        <div className="flex items-center gap-2">
          <img
            src={getChatImg(chatData.chat, chatData.userId)}
            alt="avatar"
            className="h-10 w-10 rounded-full"
          />
          <h1>{getChatName(chatData.chat, chatData.userId)}</h1>
        </div>
        <button
          className="bg-neutral-200/40 hover:bg-neutral-200 rounded-full dark:bg-neutral-700/10 dark:hover:bg-neutral-700/40 p-1 transition duration-[300ms] outline-0"
          onClick={toggleOpenChatMenu}
        >
          <BiDotsHorizontalRounded className="h-8 w-8" />
        </button>
      </div>
    </header>
  );
};

export default ConversationHeader;
