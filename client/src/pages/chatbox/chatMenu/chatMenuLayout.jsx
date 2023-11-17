import { getChatImg, getChatName } from "../../../utils/getChatInfo";
import {
  BiSolidChevronRight,
  BiSolidChevronDown,
  BiArrowBack,
} from "react-icons/bi";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import useChatCreationStore from "../../../components/state/useChatCreationStore";
import EditChatMember from "./chatMember/editChatMember";
import CustomizeChat from "./customizeChat/customizeChat";
import GetAllPinMessageBtn from "./chatInfo/pinMessageBtn";

const ChatMenuLayout = ({ chatData }) => {
  const openChatMenu = useChatCreationStore((state) => state.openChatMenu);
  const toggleOpenChatMenu = useChatCreationStore(
    (state) => state.toggleOpenChatMenu
  );
  const isMediumScreen = useMediaQuery({ minWidth: 768 });
  const [isChatInfoOpen, setChatInfoOpen] = useState(false);
  const [isChatCustomizeOpen, setChatCustomizeOpen] = useState(false);
  const [isChatMembersOpen, setChatMembersOpen] = useState(false);

  const toggleChatInfo = () => {
    return setChatInfoOpen(!isChatInfoOpen);
  };

  const toggleChatCustomize = () => {
    return setChatCustomizeOpen(!isChatCustomizeOpen);
  };

  const toggleChatMembers = () => {
    return setChatMembersOpen(!isChatMembersOpen);
  };

  return (
    <>
      {openChatMenu && (
        <div className="w-full text-sm lg:text-base min-w-[200px] md:max-w-[360px] border-l-[1px] border-neutral-300 dark:border-neutral-700 transition duration-[300ms]">
          <div className="text-neutral-700 dark:text-neutral-300 font-semibold sm:p-1 md:p-2 lg:p-4 overflow-y-auto h-screen relative">
            <div className="flex flex-col items-center w-full mt-4 mb-8">
              <img
                src={getChatImg(chatData.chat, chatData.userId)}
                alt="avatar"
                className="h-16 w-16 rounded-full"
              />
              <h1 className="text-lg text-center break-words w-[45vw]  md:w-[20vw] lg:max-w-[300px]">
                {getChatName(chatData.chat, chatData.userId)}
              </h1>
            </div>
            {!isMediumScreen && (
              <button
                className="absolute left-[.5rem] top-[1.15rem] bg-neutral-200/40 hover:bg-neutral-200 rounded-full dark:bg-neutral-700/10 dark:hover:bg-neutral-700/40 p-2 transition duration-[300ms] outline-0"
                onClick={toggleOpenChatMenu}
              >
                <BiArrowBack className="h-6 w-6" />
              </button>
            )}
            <div className="flex flex-col items-start w-full ">
              <div className="w-full">
                <button
                  className="w-full flex items-center justify-between gap-2 hover:bg-neutral-200/40 hover:dark:bg-neutral-700/30 rounded-md p-2 cursor-pointer "
                  onClick={toggleChatInfo}
                >
                  <p>Chat info</p>
                  <i className="p-2 px-2 bg-neutral-200/80 dark:bg-neutral-700/30 rounded-full transition duration-[300ms]">
                    {isChatInfoOpen ? (
                      <BiSolidChevronDown className="h-5 w-5" />
                    ) : (
                      <BiSolidChevronRight className="h-5 w-5" />
                    )}
                  </i>
                </button>
                <GetAllPinMessageBtn
                  chatData={chatData}
                  isChatInfoOpen={isChatInfoOpen}
                />
              </div>

              <div className="w-full">
                <button
                  className="w-full flex items-center justify-between gap-2 hover:bg-neutral-200/40 hover:dark:bg-neutral-700/30 rounded-md p-2 cursor-pointer "
                  onClick={toggleChatCustomize}
                >
                  <p>Customize chat</p>
                  <i className="p-2 px-2 bg-neutral-200/80 dark:bg-neutral-700/30 rounded-full transition duration-[300ms]">
                    {isChatCustomizeOpen ? (
                      <BiSolidChevronDown className="h-5 w-5" />
                    ) : (
                      <BiSolidChevronRight className="h-5 w-5" />
                    )}
                  </i>
                </button>
                <CustomizeChat
                  chatData={chatData}
                  isChatCustomizeOpen={isChatCustomizeOpen}
                />
              </div>

              {chatData.chat.type === "group" && (
                <div className="w-full">
                  <button
                    className="w-full flex items-center justify-between gap-2 hover:bg-neutral-200/40 hover:dark:bg-neutral-700/30 rounded-md p-2 cursor-pointer "
                    onClick={toggleChatMembers}
                  >
                    <p>Change members</p>
                    <i className="p-2 px-2 bg-neutral-200/80 dark:bg-neutral-700/30 rounded-full transition duration-[300ms]">
                      {isChatMembersOpen ? (
                        <BiSolidChevronDown className="h-5 w-5" />
                      ) : (
                        <BiSolidChevronRight className="h-5 w-5" />
                      )}
                    </i>
                  </button>

                  <EditChatMember
                    chatData={chatData}
                    isChatMembersOpen={isChatMembersOpen}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatMenuLayout;
