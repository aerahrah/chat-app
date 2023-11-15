import { useState } from "react";
import { BiImage, BiSolidPencil } from "react-icons/bi";
import { getBgColorTheme } from "../../../../utils/getColorTheme";
import useChatCreationStore from "../../../../components/state/useChatCreationStore";
import EditChatName from "./editChatName";
import EditNickname from "./editMemberNickname/editNickname";
import EditChatImgBtn from "./editChatImg/editChatImgBtn";
import EditColorTheme from "./editColorTheme";
import EditEmoji from "./editEmoji";

const CustomizeChat = ({ chatData, isChatCustomizeOpen }) => {
  const { colorTheme, setColorTheme } = useChatCreationStore();
  const [editNicknameModal, setEditNicknameModal] = useState(false);
  const [editChatNameModal, setEditChatNameModal] = useState(false);
  const [editChatImageModal, setEditChatImageModal] = useState(false);
  const [editEmojiModal, setEditEmojiModal] = useState(false);
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

  const toggleEditEmoji = () => {
    return setEditEmojiModal(!editEmojiModal);
  };

  return (
    <div className="w-full">
      {isChatCustomizeOpen && (
        <div className="flex flex-col items-start w-full">
          {chatData.chat.type === "group" && (
            <div className="flex flex-col w-full">
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
          <div
            className="w-full flex items-center gap-2 hover:bg-neutral-200/40 hover:dark:bg-neutral-700/30 rounded-md p-2 cursor-pointer"
            onClick={toggleEditEmoji}
          >
            <div className="p-[1.125rem] relative bg-neutral-200/80 dark:bg-neutral-700/30 rounded-full transition duration-[300ms]">
              <p className="text-xl absolute top-1/2 left-1/2 transform translate-y-[-55%] translate-x-[-50%] rounded-full">
                {chatData.chat.defaultEmojis}
              </p>
            </div>
            <p>Change emoji</p>
          </div>
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
          <EditEmoji
            chatData={chatData}
            editEmojiModal={editEmojiModal}
            toggleEditEmoji={toggleEditEmoji}
          />
        </div>
      )}
    </div>
  );
};

export default CustomizeChat;
