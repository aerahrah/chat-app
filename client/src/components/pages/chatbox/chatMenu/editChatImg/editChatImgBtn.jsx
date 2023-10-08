import { AnimatePresence, motion } from "framer-motion";
import { Dialog } from "@headlessui/react";
import useThemeStore from "../../../../state/useThemeStore";
import { useState, useEffect } from "react";
import { useQueryClient, useMutation } from "react-query";
import LoadImgOption from "./loadImgOption";
import { editChatImage } from "../../../../api/chatAPI";
const EditChatImgBtn = ({
  chatData,
  editChatImageModal,
  toggleEditChatImage,
}) => {
  const queryClient = useQueryClient();
  const theme = useThemeStore((state) => state.theme);
  const editChatImageMutation = useMutation(editChatImage);
  const [stateChatData, setStateChatData] = useState(() => chatData.chat);

  const handleChangeChatName = async () => {
    try {
      await editChatImageMutation.mutateAsync({
        chatId: chatData.chat._id,
        stateChatData,
      });
      queryClient.invalidateQueries("getAllChat");
      queryClient.invalidateQueries("getConversation");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    setStateChatData(chatData.chat);
  }, [chatData.chat]);

  return (
    <AnimatePresence>
      {editChatImageModal && (
        <Dialog
          static
          as={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: editChatImageModal ? 1 : 0 }}
          exit={{ opacity: 0 }}
          open={editChatImageModal}
          onClose={toggleEditChatImage}
        >
          <div className="fixed inset-0 bg-black/40" />

          <div className="fixed inset-0 flex w-screen items-center justify-center">
            <Dialog.Panel
              as={motion.div}
              initial={{ scale: 0.7 }}
              animate={
                editChatImageModal
                  ? { scale: 1, opacity: 1 }
                  : { scale: 0.7, opacity: 0 }
              }
              exit={{ scale: 0.7, opacity: 0 }}
              className={`${
                theme === "light"
                  ? "bg-white text-neutral-700"
                  : "bg-neutral-700 text-neutral-300"
              } w-full mx-auto max-w-md rounded-md shadow-lg p-4`}
            >
              <Dialog.Title className="text-lg text-center pb-4 font-semibold">
                Change chat image
              </Dialog.Title>
              <div className="w-full flex justify-center">
                <img
                  src={`https://api.dicebear.com/7.x/${stateChatData.chatImgType}/svg?seed=${stateChatData.chatImg}`}
                  alt="avatar"
                  className="h-24 w-24 rounded-full"
                />
              </div>
              <div className="mb-4">
                <LoadImgOption
                  theme={theme}
                  setStateChatData={setStateChatData}
                />
              </div>
              <div className="flex justify-between dark:bg-neutral-800">
                <button
                  className="bg-red-500 text-red-50 rounded px-10 py-2 hover:bg-red-600 shadow-md capitalize"
                  onClick={toggleEditChatImage}
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

export default EditChatImgBtn;
