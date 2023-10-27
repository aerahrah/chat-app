import { getChatImg, getChatName } from "../../sidebar/getAllChats/getChatInfo";
import useChatCreationStore from "../../../state/chat/useChatCreationStore";
import {
  BiImage,
  BiSolidPencil,
  BiSolidChevronRight,
  BiSolidChevronDown,
} from "react-icons/bi";
import EditChatMember from "./chatMember/editChatMember";
import { useState } from "react";
import CustomizeChat from "./customizeChat/customizeChat";
const ChatMenuLayout = ({ chatData }) => {
  const openChatMenu = useChatCreationStore((state) => state.openChatMenu);
  const [editChatMemberModal, setEditChatMemberModal] = useState(false);
  const [editChatModal, setEditChatModal] = useState(false);

  const toggleEditChatMember = () => {
    return setEditChatMemberModal(!editChatMemberModal);
  };
  const toggleEditChat = () => {
    return setEditChatModal(!editChatModal);
  };

  return (
    <>
      {openChatMenu && (
        <div className="w-full max-w-[360px] border-l-[1px] border-neutral-300 dark:border-neutral-700   transition duration-[300ms]">
          <div className="text-neutral-700 dark:text-neutral-300 font-semibold p-4 ">
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
            <div className="flex flex-col items-start w-full">
              <button
                className="w-full flex items-center justify-between gap-2 hover:bg-neutral-200/40 hover:dark:bg-neutral-700/30 rounded-md p-2 cursor-pointer "
                onClick={toggleEditChat}
              >
                <p>Customize chat</p>
                <i className="p-2 px-2 bg-neutral-200/80 dark:bg-neutral-700/30 rounded-full transition duration-[300ms]">
                  {editChatModal ? (
                    <BiSolidChevronDown className="h-5 w-5" />
                  ) : (
                    <BiSolidChevronRight className="h-5 w-5" />
                  )}
                </i>
              </button>
              <CustomizeChat
                chatData={chatData}
                editChatModal={editChatModal}
              />
              {chatData.chat.type === "group" && (
                <div className="w-full">
                  <button
                    className="w-full flex items-center justify-between gap-2 hover:bg-neutral-200/40 hover:dark:bg-neutral-700/30 rounded-md p-2 cursor-pointer "
                    onClick={toggleEditChatMember}
                  >
                    <p>Change members</p>
                    <i className="p-2 px-2 bg-neutral-200/80 dark:bg-neutral-700/30 rounded-full transition duration-[300ms]">
                      {editChatMemberModal ? (
                        <BiSolidChevronDown className="h-5 w-5" />
                      ) : (
                        <BiSolidChevronRight className="h-5 w-5" />
                      )}
                    </i>
                  </button>

                  <EditChatMember
                    chatData={chatData}
                    editChatMemberModal={editChatMemberModal}
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
