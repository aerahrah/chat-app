import { AnimatePresence, motion } from "framer-motion";
import { Dialog } from "@headlessui/react";
import useThemeStore from "../../../state/useThemeStore";
import { useState } from "react";
import { useQueryClient, useMutation } from "react-query";
import { editChatName } from "../../../api/chatAPI";

const EditChatName = ({ chatData, editChatNameModal, toggleEditChatName }) => {
  const theme = useThemeStore((state) => state.theme);
  const [chatName, setChatName] = useState("");
  const editChatNameMutation = useMutation(editChatName);
  const queryClient = useQueryClient();

  const handleChangeChatName = async () => {
    try {
      await editChatNameMutation.mutateAsync({
        chatId: chatData.chat._id,
        chatName,
      });
      queryClient.invalidateQueries("getAllChat");
      queryClient.invalidateQueries("getConversation");
    } catch (error) {
      console.log(error);
    }
  };
  console.log(chatData);
  return (
    <AnimatePresence>
      {editChatNameModal && (
        <Dialog
          static
          as={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: editChatNameModal ? 1 : 0 }}
          exit={{ opacity: 0 }}
          open={editChatNameModal}
          onClose={toggleEditChatName}
        >
          <div className="fixed inset-0 bg-black/40" />

          <div className="fixed inset-0 flex w-screen items-center justify-center">
            <Dialog.Panel
              as={motion.div}
              initial={{ scale: 0.7 }}
              animate={
                editChatNameModal
                  ? { scale: 1, opacity: 1 }
                  : { scale: 0.7, opacity: 0 }
              }
              exit={{ scale: 0.7, opacity: 0 }}
              className={`${
                theme === "light"
                  ? "bg-white text-neutral-700"
                  : "bg-neutral-700 text-neutral-300"
              } w-full mx-auto max-w-sm rounded-md shadow-lg p-4`}
            >
              <Dialog.Title className="text-lg text-center pb-4 font-semibold">
                Change chat name
              </Dialog.Title>
              <div className="flex flex-col gap-2">
                <input
                  type="text"
                  placeholder={
                    chatData.chat.name ? chatData.chat.name : "Set chat name"
                  }
                  value={chatName}
                  className={`${
                    theme === "light"
                      ? "bg-neutral-100 outline-neutral-300 focus:outline-blue-500"
                      : "bg-neutral-800/70 outline-neutral-800/70   "
                  } outline outline-1 rounded block p-2 mb-6 w-[40vw] max-w-[100%]`}
                  onClick={(e) => e.stopPropagation()}
                  onChange={(e) => setChatName(e.target.value)}
                />
              </div>
              <div className="flex justify-between dark:bg-neutral-800">
                <button
                  className="bg-red-500 text-red-50 rounded px-10 py-2 hover:bg-red-600 shadow-md capitalize"
                  onClick={toggleEditChatName}
                >
                  Cancel
                </button>
                <button
                  className="bg-blue-500 text-blue-50 rounded px-10 py-2 hover:bg-blue-600 shadow-md  capitalize"
                  onClick={handleChangeChatName}
                >
                  save
                </button>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

export default EditChatName;
