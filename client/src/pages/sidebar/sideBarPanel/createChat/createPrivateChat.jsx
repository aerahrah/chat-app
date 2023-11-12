import { useMutation, useQueryClient } from "react-query";
import { createPrivateChat } from "../../../../services/chatAPI";
import SearchUser from "../../../../components/globalComponents/searchUsers";
import DialogComponent from "../../../../components/globalComponents/dialogComponent";
import BtnPanelComponent from "../../../../components/globalComponents/btnPanelComponent";
import useThemeStore from "../../../../components/state/useThemeStore";
import useChatCreationStore from "../../../../components/state/useChatCreationStore";

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
      <BtnPanelComponent
        closeModal={toggleCreatePrivateChatOpen}
        handleOnClick={handleCreatePrivateChat}
        label="Create"
      />
    </DialogComponent>
  );
};
export default CreatePrivateChat;
