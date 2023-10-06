import { getChatImg, getChatName } from "../../sidebar/getAllChats/getChatInfo";
import useChatCreationStore from "../../../state/chat/useChatCreationStore";
import { BiImage, BiSolidPencil } from "react-icons/bi";
import EditNickname from "./editNickname";
import EditChatName from "./editChatName";
import { useState } from "react";

const ChatMenuLayout = ({ chatData }) => {
  const openChatMenu = useChatCreationStore((state) => state.openChatMenu);
  const [editNicknameModal, setEditNicknameModal] = useState(false);
  const [editChatNameModal, setEditChatNameModal] = useState(false);
  const [editChatImageModal, setEditChatImageModal] = useState(false);

  const toggleEditNickname = () => {
    return setEditNicknameModal(!editNicknameModal);
  };

  const toggleEditChatName = () => {
    return setEditChatNameModal(!editChatNameModal);
  };

  const toggleEditChatImage = () => {
    return setEditChatImageModal(!editChatImageModal);
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
            <div className="flex flex-col items-start gap-3 w-full">
              {chatData.chat.type === "group" && (
                <div className="flex flex-col gap-2 w-full">
                  <div
                    className="w-full flex items-center gap-2 hover:bg-neutral-200/40 hover:dark:bg-neutral-700/30 rounded-md p-2 cursor-pointer "
                    onClick={toggleEditChatName}
                  >
                    <i className="p-2 px-2 bg-neutral-200/80 dark:bg-neutral-700/30 rounded-full transition duration-[300ms]">
                      <BiSolidPencil className="h-5 w-5" />
                    </i>
                    <p>Change chat name</p>
                  </div>
                  <div className="w-full flex items-center gap-2 hover:bg-neutral-200/40 hover:dark:bg-neutral-700/30 rounded-md p-2 cursor-pointer">
                    <i className="p-2 px-2 bg-neutral-200/80 dark:bg-neutral-700/30 rounded-full transition duration-[300ms]">
                      <BiImage className="h-5 w-5" />
                    </i>
                    <p>Change photo</p>
                  </div>
                </div>
              )}
              <p className="w-full hover:bg-neutral-200/40 hover:dark:bg-neutral-700/30 rounded-md p-2 cursor-pointer">
                Change Theme
              </p>
              <p className="w-full hover:bg-neutral-200/40  hover:dark:bg-neutral-700/30 rounded-md p-2 cursor-pointer ">
                Change Emoji
              </p>
              <button
                className="w-full hover:bg-neutral-200/40 hover:dark:bg-neutral-700/30 rounded-md cursor-pointer text-start flex p-2"
                onClick={toggleEditNickname}
              >
                <p className="p-1 px-2 bg-neutral-200/80 dark:bg-neutral-700/30 rounded-full transition duration-[300ms]">
                  Aa
                </p>
                <p className="p-1">Edit nickname</p>
              </button>
            </div>
          </div>
          <EditNickname
            chatData={chatData}
            editNicknameModal={editNicknameModal}
            toggleEditNickname={toggleEditNickname}
          />
          <EditChatName
            chatData={chatData}
            editChatNameModal={editChatNameModal}
            toggleEditChatName={toggleEditChatName}
          />
        </div>
      )}
    </>
  );
};

export default ChatMenuLayout;
