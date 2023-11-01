import useThemeStore from "../../../../state/useThemeStore";
import { useState } from "react";
import { useQueryClient, useMutation } from "react-query";
import { editChatName } from "../../../../api/chatAPI";
import DialogComponent from "../../../../utils/dialogComponent";

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
    <DialogComponent
      openModal={editChatNameModal}
      closeModal={toggleEditChatName}
      title="Change chat name"
    >
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
    </DialogComponent>
  );
};

export default EditChatName;
