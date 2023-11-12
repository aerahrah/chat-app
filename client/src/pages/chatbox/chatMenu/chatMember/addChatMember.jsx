import { addChatMember } from "../../../../services/chatAPI";
import { useMutation, useQueryClient } from "react-query";
import useThemeStore from "../../../../components/state/useThemeStore";
import useChatCreationStore from "../../../../components/state/useChatCreationStore";
import DialogComponent from "../../../../components/globalComponents/dialogComponent";
import BtnPanelComponent from "../../../../components/globalComponents/btnPanelComponent";
import SearchUser from "../../../../components/globalComponents/searchUsers";

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
      <BtnPanelComponent
        closeModal={toggleAddChatMember}
        handleOnClick={handleAddChatMember}
        label="Add"
      />
    </DialogComponent>
  );
};

export default AddChatMember;
