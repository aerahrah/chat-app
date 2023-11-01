import { useMutation, useQueryClient } from "react-query";
import { createGroupChat } from "../../../../api/chatAPI";
import DialogComponent from "../../../../utils/dialogComponent";
import useThemeStore from "../../../../state/useThemeStore";
import useChatCreationStore from "../../../../state/chat/useChatCreationStore";

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

      <div className="flex justify-between">
        <button
          className="bg-red-500 text-red-50 rounded px-10 py-2 hover:bg-red-600 shadow-md  capitalize"
          onClick={toggleCreateGroupChatOpen}
        >
          Cancel
        </button>
        <button
          className="bg-blue-500 text-blue-50 rounded px-10 py-2 hover:bg-blue-600  shadow-md  capitalize"
          onClick={handleCreateGroupChat}
        >
          create
        </button>
      </div>
    </DialogComponent>
  );
};
export default CreateGroupChat;
