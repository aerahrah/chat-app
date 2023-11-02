import useThemeStore from "../../../../state/useThemeStore";
import useChatCreationStore from "../../../../state/chat/useChatCreationStore";
import SearchUser from "../../../sidebar/sideBarPanel/createChat/searchUsers";
import DialogComponent from "../../../../utils/dialogComponent";
import BtnPanelComponent from "../../../../utils/btnPanelComponent";
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
      <BtnPanelComponent
        closeModal={toggleAddChatMember}
        handleOnClick={handleAddChatMember}
        label="Add"
      />
    </DialogComponent>
  );
};

export default AddChatMember;
