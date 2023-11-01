import { AnimatePresence, motion } from "framer-motion";
import DialogComponent from "../../../../../utils/dialogComponent";
import useThemeStore from "../../../../../state/useThemeStore";
import { useState, useEffect } from "react";
import { useQueryClient, useMutation } from "react-query";
import LoadImgOption from "./loadImgOption";
import { editChatImage } from "../../../../../api/chatAPI";
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
    <DialogComponent
      openModal={editChatImageModal}
      closeModal={toggleEditChatImage}
      title="Change chat image"
    >
      <div className="w-full flex justify-center">
        <img
          src={`https://api.dicebear.com/7.x/${stateChatData.chatImgType}/svg?seed=${stateChatData.chatImg}`}
          alt="avatar"
          className="h-20 w-20 rounded-full"
        />
      </div>
      <div className="mb-4">
        <LoadImgOption theme={theme} setStateChatData={setStateChatData} />
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
    </DialogComponent>
  );
};

export default EditChatImgBtn;
