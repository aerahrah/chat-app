import { useMutation, useQueryClient } from "react-query";
import { createPrivateChat } from "../../../api/chatAPI";
import SearchUser from "./searchUser";
import useChatCreationStore from "../../../state/chat/useChatCreationStore";

const CreatePrivateChat = () => {
  const createPrivateChatMutation = useMutation(createPrivateChat);
  const queryClient = useQueryClient();
  const { userNameId, setUserNameId, toggleCreatePrivateChatOpen } =
    useChatCreationStore();

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
    <div>
      <SearchUser setUserNameId={setUserNameId} />
      <button onClick={handleCreatePrivateChat}>submit</button>
    </div>
  );
};
export default CreatePrivateChat;
