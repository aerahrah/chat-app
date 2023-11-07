import { useState } from "react";
import EditChatName from "./editChatName";
import EditNickname from "./editMemberNickname/editNickname";
import EditChatImgBtn from "./editChatImg/editChatImgBtn";
import EditColorTheme from "./editColorTheme";
import { BiImage, BiSolidPencil } from "react-icons/bi";
import { getBgColorTheme } from "../../../../utils/getColorTheme";
import useChatCreationStore from "../../../../state/chat/useChatCreationStore";
const CustomizeChat = ({ chatData, editChatModal }) => {
  const { colorTheme, setColorTheme } = useChatCreationStore();
  const [editNicknameModal, setEditNicknameModal] = useState(false);
  const [editChatNameModal, setEditChatNameModal] = useState(false);
  const [editChatImageModal, setEditChatImageModal] = useState(false);
  const [colorThemeSelector, setColorThemeSelector] = useState(false);

  const toggleEditNickname = () => {
    return setEditNicknameModal(!editNicknameModal);
  };

  const toggleColorThemeSelector = () => {
    setColorTheme(chatData.chat.colorTheme);
    return setColorThemeSelector(!colorThemeSelector);
  };

  const toggleEditChatName = () => {
    return setEditChatNameModal(!editChatNameModal);
  };

  const toggleEditChatImage = () => {
    return setEditChatImageModal(!editChatImageModal);
  };

  return (
    <div className="w-full">
      {editChatModal && (
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
              <div
                className="w-full flex items-center gap-2 hover:bg-neutral-200/40 hover:dark:bg-neutral-700/30 rounded-md p-2 cursor-pointer"
                onClick={toggleEditChatImage}
              >
                <i className="p-2 px-2 bg-neutral-200/80 dark:bg-neutral-700/30 rounded-full transition duration-[300ms]">
                  <BiImage className="h-5 w-5" />
                </i>
                <p>Change photo</p>
              </div>
            </div>
          )}
          <div
            className="w-full flex items-center gap-2 hover:bg-neutral-200/40 hover:dark:bg-neutral-700/30 rounded-md p-2 cursor-pointer"
            onClick={toggleColorThemeSelector}
          >
            <i className="p-2  bg-neutral-200/80 dark:bg-neutral-700/30 rounded-full transition duration-[300ms]">
              <p
                style={{
                  backgroundColor: getBgColorTheme(colorTheme),
                }}
                className="h-5 w-5 rounded-full"
              ></p>
            </i>
            <p>Change theme</p>
          </div>
          <p className="w-full hover:bg-neutral-200/40  hover:dark:bg-neutral-700/30 rounded-md p-2 cursor-pointer ">
            Change Emoji
          </p>
          <button
            className="w-full hover:bg-neutral-200/40 hover:dark:bg-neutral-700/30 rounded-md cursor-pointer text-start items-center flex gap-2 p-2"
            onClick={toggleEditNickname}
          >
            <span className="p-[1.125rem]  bg-neutral-200/80 dark:bg-neutral-700/30 rounded-full transition duration-[300ms] align-middle relative">
              <p className="absolute transform top-1/2 left-1/2 translate-y-[-52.5%] translate-x-[-50%]">
                Aa
              </p>
            </span>
            <p>Edit nickname</p>
          </button>
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
          <EditChatImgBtn
            chatData={chatData}
            editChatImageModal={editChatImageModal}
            toggleEditChatImage={toggleEditChatImage}
          />
          <EditColorTheme
            chatData={chatData}
            colorThemeSelector={colorThemeSelector}
            toggleColorThemeSelector={toggleColorThemeSelector}
            setColorThemeSelector={setColorThemeSelector}
          />
        </div>
      )}
    </div>
  );
};

export default CustomizeChat;
