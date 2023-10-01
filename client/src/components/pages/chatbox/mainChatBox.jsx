import { useQuery } from "react-query";
import { getChatConversation } from "../../api/chatAPI";
import useChatBoxStore from "../../state/chat/useChatBoxStore";
import { getChatName, getChatImg } from "../sidebar/getAllChats/getChatInfo";
import { BiSolidHappyAlt, BiSolidSend } from "react-icons/bi";
import EmojiPicker from "emoji-picker-react";
import { Popover, Transition } from "@headlessui/react";

const MainChatBox = () => {
  const chatId = useChatBoxStore((state) => state.chatId);

  const chatQuery = ["getConversation", chatId];
  const {
    data: userData,
    isLoading,
    isError,
    error,
  } = useQuery(chatQuery, () => (chatId ? getChatConversation(chatId) : null));
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <div className=" w-full max-w-[100%] relative text-neutral-700">
      {userData && (
        <div className="max-w[100%]">
          <header className="p-4 border-b-[1px] flex items-center gap-2">
            <img
              src={getChatImg(userData.chat, userData.userId)}
              alt="avatar"
              className="h-10 w-10 rounded-full"
            />
            <h1>{getChatName(userData.chat, userData.userId)}</h1>
          </header>
          <div></div>
          <div className="absolute border-t-[1px] bottom-0 w-full max-w-[100%] flex gap-2 p-2">
            <Popover className="relative">
              <Popover.Button className="bg-neutral-200/40 hover:bg-neutral-200 rounded-full dark:bg-neutral-700/10 dark:hover:bg-neutral-700/40 p-2 transition duration-[300ms] outline-0">
                <BiSolidHappyAlt className="h-6 w-6" />
              </Popover.Button>

              <Popover.Panel>
                <div className="absolute bottom-10 z-30">
                  <EmojiPicker height={370} width={300} />
                </div>
              </Popover.Panel>
            </Popover>

            <input
              type="text"
              placeholder="Aa"
              className="bg-neutral-200/70 py-2 px-4 w-full outline-0 rounded-full"
            />
            <button className="p-2 hover:bg-neutral-200 rounded-full">
              <BiSolidSend className="h-6 w-6" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainChatBox;
