import { useMutation, useQueryClient } from "react-query";
import useChatCreationStore from "../../../state/chat/useChatCreationStore";
import { createGroupChat } from "../../../api/chatAPI";
const CreateGroupChat = () => {
  const createGroupChatMutation = useMutation(createGroupChat);
  const queryClient = useQueryClient();
  const { chatName, setChatName, toggleCreateGroupChatOpen } =
    useChatCreationStore();
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
    <div>
      <div>
        <input
          type="text"
          value={chatName}
          placeholder="Enter chat name"
          onChange={(e) => setChatName(e.target.value)}
        />
      </div>
      <button onClick={handleCreateGroupChat}>submit</button>
    </div>
  );
};
export default CreateGroupChat;
