import { useState } from "react";
import { useQueryClient, useMutation } from "react-query";
import { editChatName } from "../../../../services/chatAPI";
import useThemeStore from "../../../../components/state/useThemeStore";
import DialogComponent from "../../../../components/globalComponents/dialogComponent";
import BtnPanelComponent from "../../../../components/globalComponents/btnPanelComponent";

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
      toggleEditChatName();
    } catch (error) {
      console.log(error);
    }
  };

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
          } outline outline-1 rounded block p-2 w-[40vw] max-w-[100%]`}
          onClick={(e) => e.stopPropagation()}
          onChange={(e) => setChatName(e.target.value)}
        />
      </div>
      <BtnPanelComponent
        closeModal={toggleEditChatName}
        handleOnClick={handleChangeChatName}
        label="Save"
      />
    </DialogComponent>
  );
};

export default EditChatName;
