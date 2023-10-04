import { useQuery } from "react-query";
import { getChatConversation } from "../../api/chatAPI";
import { useParams } from "react-router-dom";
import { Dialog } from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";
import { getChatName, getChatImg } from "../sidebar/getAllChats/getChatInfo";
import useThemeStore from "../../state/useThemeStore";
import ConversationHeader from "./conversationHeader";
import ConversationView from "./conversationView";
import MessageComposer from "./MessageComposer";
import { useState } from "react";
import { getSpecificImg } from "../sidebar/getAllChats/getChatInfo";

const MainChatBox = () => {
  const { chatId } = useParams();
  const chatQuery = ["getConversation", chatId];
  const theme = useThemeStore((state) => state.theme);
  const [editNicknameModal, setEditNicknameModal] = useState(false);

  const toggleEditNickname = () => {
    return setEditNicknameModal(!editNicknameModal);
  };
  const {
    data: chatData,
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
      {chatData && (
        <div className="flex w-full">
          <div className="flex flex-col flex-1 max-w[100%] h-screen  text-neutral-700 dark:text-neutral-300 ">
            <ConversationHeader chatData={chatData} />
            <ConversationView chatData={chatData} userId={chatData.userId} />
            <MessageComposer chatId={chatId} />
          </div>
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
          {editNicknameModal && (
            <Dialog
              static
              as={motion.div}
              initial={{ opacity: 0 }}
              animate={{ opacity: editNicknameModal ? 1 : 0 }}
              exit={{ opacity: 0 }}
              open={editNicknameModal}
              onClose={toggleEditNickname}
            >
              <div className="fixed inset-0 bg-black/40" />

              <div className="fixed inset-0 flex w-screen items-center justify-center">
                <Dialog.Panel
                  as={motion.div}
                  initial={{ scale: 0.7 }}
                  animate={
                    editNicknameModal
                      ? { scale: 1, opacity: 1 }
                      : { scale: 0.7, opacity: 0 }
                  }
                  exit={{ scale: 0.7, opacity: 0 }}
                  className={`${
                    theme === "light"
                      ? "bg-white text-neutral-700"
                      : "bg-neutral-700 text-neutral-300"
                  } mx-auto max-w-lg rounded-md shadow-lg p-4`}
                >
                  <Dialog.Title className="text-lg text-center pb-4 font-semibold">
                    Nickname
                  </Dialog.Title>
                  <div className="flex flex-col gap-2">
                    {chatData.chat.members.map((user) => (
                      <div
                        key={user._id}
                        className="flex items-center gap-2 hover:bg-neutral-600 p-3 rounded-md "
                      >
                        <img
                          src={getSpecificImg(user)}
                          alt="avatar"
                          className="h-10 w-10 rounded-full"
                        />
                        <div className="flex flex-col gap-1  hover:bg-neutral-600 justify-center w-[100vw] max-w-[1000rem]">
                          <p>
                            {user.displayName ? user.displayName : user.name}
                          </p>
                          <p className="text-xs">
                            {user.displayName
                              ? user.displayName
                              : "Set Nickname"}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Dialog.Panel>
              </div>
            </Dialog>
          )}
        </div>
      )}
    </div>
  );
};

export default MainChatBox;
