import { getChatName, getChatImg } from "../../utils/getChatInfo";
import { BiDotsHorizontalRounded, BiArrowBack } from "react-icons/bi";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";
import useChatCreationStore from "../../components/state/useChatCreationStore";

const ConversationHeader = ({ chatData }) => {
  const toggleOpenChatMenu = useChatCreationStore(
    (state) => state.toggleOpenChatMenu
  );

  const isMobileScreen = useMediaQuery({ maxWidth: 548 });
  return (
    <header className="py-[1.15rem] px-4 border-neutral-300 border-b-[1px] shadow-sm dark:border-neutral-700 transition duration-[300ms] ">
      <div className="flex justify-between text-neutral-700 dark:text-neutral-300 ">
        {isMobileScreen && (
          <Link
            to="/chat"
            className=" bg-neutral-200/40 hover:bg-neutral-200 rounded-full dark:bg-neutral-700/10 dark:hover:bg-neutral-700/40 p-2 transition duration-[300ms] outline-0 mr-4"
          >
            <BiArrowBack className="h-6 w-6" />
          </Link>
        )}
        <div className="flex items-center gap-2 w-full">
          <img
            src={getChatImg(chatData.chat, chatData.userId)}
            alt="avatar"
            className="h-10 w-10 rounded-full"
          />
          <h1 className="truncate w-full w-[24vw] max-w-[600px]">
            {getChatName(chatData.chat, chatData.userId)}
          </h1>
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
