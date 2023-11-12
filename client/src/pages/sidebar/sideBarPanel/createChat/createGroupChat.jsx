import { useMutation, useQueryClient } from "react-query";
import { createGroupChat } from "../../../../services/chatAPI";
import DialogComponent from "../../../../components/globalComponents/dialogComponent";
import BtnPanelComponent from "../../../../components/globalComponents/btnPanelComponent";
import useThemeStore from "../../../../components/state/useThemeStore";
import useChatCreationStore from "../../../../components/state/useChatCreationStore";

const CreateGroupChat = ({
  isCreateGroupChatOpen,
  toggleCreateGroupChatOpen,
}) => {
  const createGroupChatMutation = useMutation(createGroupChat);
  const queryClient = useQueryClient();
  const { chatName, setChatName } = useChatCreationStore();
  const theme = useThemeStore((state) => state.theme);

  const handleCreateGroupChat = async () => {
    try {
      await createGroupChatMutation.mutateAsync(chatName);
      queryClient.refetchQueries("getAllChat");
      toggleCreateGroupChatOpen();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DialogComponent
      openModal={isCreateGroupChatOpen}
      closeModal={toggleCreateGroupChatOpen}
      title="Create group chat"
    >
      <input
        className={`${
          theme === "light"
            ? "bg-neutral-100 outline-neutral-300 focus:outline-blue-500"
            : "bg-neutral-800/70 outline-neutral-800/70"
        } outline outline-1 rounded block p-2 mb-6 w-[40vw] max-w-[100%]`}
        type="text"
        value={chatName}
        placeholder="Enter chat name"
        onChange={(e) => setChatName(e.target.value)}
      />
      <BtnPanelComponent
        closeModal={toggleCreateGroupChatOpen}
        handleOnClick={handleCreateGroupChat}
        label="Create"
      />
    </DialogComponent>
  );
};
export default CreateGroupChat;
