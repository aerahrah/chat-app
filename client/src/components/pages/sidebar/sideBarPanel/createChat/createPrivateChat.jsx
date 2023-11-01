import { useMutation, useQueryClient } from "react-query";
import { createPrivateChat } from "../../../../api/chatAPI";
import SearchUser from "./searchUsers";
import DialogComponent from "../../../../utils/dialogComponent";
import useChatCreationStore from "../../../../state/chat/useChatCreationStore";
import useThemeStore from "../../../../state/useThemeStore";

const CreatePrivateChat = ({
  isCreatePrivateChatOpen,
  toggleCreatePrivateChatOpen,
}) => {
  const createPrivateChatMutation = useMutation(createPrivateChat);
  const queryClient = useQueryClient();
  const { userNameId, setUserNameId } = useChatCreationStore();
  const theme = useThemeStore((state) => state.theme);

  const handleCreatePrivateChat = async () => {
    try {
      await createPrivateChatMutation.mutateAsync(userNameId);
      queryClient.refetchQueries("getAllChat");
      toggleCreatePrivateChatOpen();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <DialogComponent
      openModal={isCreatePrivateChatOpen}
      closeModal={toggleCreatePrivateChatOpen}
      title="Create private chat"
    >
      <SearchUser setUserNameId={setUserNameId} theme={theme} />
      <div className="flex justify-between dark:bg-neutral-800">
        <button
          className="bg-red-500 text-red-50 rounded px-10 py-2 hover:bg-red-600 shadow-md capitalize"
          onClick={toggleCreatePrivateChatOpen}
        >
          Cancel
        </button>
        <button
          className="bg-blue-500 text-blue-50 rounded px-10 py-2 hover:bg-blue-600 shadow-md  capitalize"
          onClick={handleCreatePrivateChat}
        >
          Create
        </button>
      </div>
    </DialogComponent>
  );
};
export default CreatePrivateChat;
