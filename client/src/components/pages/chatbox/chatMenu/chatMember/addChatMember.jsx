import useThemeStore from "../../../../state/useThemeStore";
import useChatCreationStore from "../../../../state/chat/useChatCreationStore";
import SearchUser from "../../../sidebar/sideBarPanel/createChat/searchUsers";
import DialogComponent from "../../../../utils/dialogComponent";
import { addChatMember } from "../../../../api/chatAPI";
import { useMutation, useQueryClient } from "react-query";

const AddChatMember = ({ chatId, addChatMemberOpen, toggleAddChatMember }) => {
  const theme = useThemeStore((state) => state.theme);
  const { userNameId, setUserNameId } = useChatCreationStore();

  const addChatMemberMutation = useMutation(addChatMember);
  const queryClient = useQueryClient();
  const handleAddChatMember = async () => {
    try {
      await addChatMemberMutation.mutateAsync({
        chatId,
        userNameId,
      });
      queryClient.refetchQueries("getAllChat");
      queryClient.invalidateQueries("getConversation");
      toggleAddChatMember();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DialogComponent
      openModal={addChatMemberOpen}
      closeModal={toggleAddChatMember}
      title="Add member"
    >
      <SearchUser setUserNameId={setUserNameId} theme={theme} />
      <div className="flex justify-between dark:bg-neutral-800">
        <button
          className="bg-red-500 text-red-50 rounded px-10 py-2 hover:bg-red-600 shadow-md capitalize"
          onClick={toggleAddChatMember}
        >
          Cancel
        </button>
        <button
          className="bg-blue-500 text-blue-50 rounded px-10 py-2 hover:bg-blue-600 shadow-md  capitalize"
          onClick={handleAddChatMember}
        >
          Add
        </button>
      </div>
    </DialogComponent>
  );
};

export default AddChatMember;
