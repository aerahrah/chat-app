import { useMutation, useQueryClient } from "react-query";
import { createPrivateChat } from "../../../../api/chatAPI";
import SearchUser from "./searchUsers";
import DialogComponent from "../../../../utils/dialogComponent";
import BtnPanelComponent from "../../../../utils/btnPanelComponent";
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
      <BtnPanelComponent
        closeModal={toggleCreatePrivateChatOpen}
        handleOnClick={handleCreatePrivateChat}
        label="Create"
      />
    </DialogComponent>
  );
};
export default CreatePrivateChat;
