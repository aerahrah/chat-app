import { useMutation, useQueryClient } from "react-query";
import { useState } from "react";
import { createMessage } from "../../api/chatAPI";
const CreateChat = () => {
  const createMessageMutation = useMutation(createMessage);
  const [chatName, setChatName] = useState("");
  const [userName, setUserName] = useState("");
  const [isAddChatOpen, setIsAddChatOpen] = useState(false);
  const [isCreateGroupChatOpen, setIsCreateGroupChatOpen] = useState(false);
  const [isCreatePrivateChatOpen, setIsCreatePrivateChatOpen] = useState(false);
  const queryClient = useQueryClient();

  const handleGroupCreateChat = () => {
    try {
      const data = createMessageMutation.mutateAsync(chatName).then(() => {
        queryClient.refetchQueries("getAllChat");
      });

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div>
        <button onClick={() => setIsAddChatOpen(!isAddChatOpen)}>
          open modal
        </button>
        {isAddChatOpen && (
          <div>
            <button
              onClick={() => setIsCreateGroupChatOpen(!isCreateGroupChatOpen)}
            >
              Create group chat
            </button>
            <button
              onClick={() =>
                setIsCreatePrivateChatOpen(!isCreatePrivateChatOpen)
              }
            >
              Create private chat
            </button>
          </div>
        )}
      </div>
      {isCreateGroupChatOpen && (
        <div>
          <div>
            <input
              type="text"
              value={chatName}
              placeholder="Enter chat name"
              onChange={(e) => setChatName(e.target.value)}
            />
          </div>
          <button onClick={handleGroupCreateChat}>submit</button>
        </div>
      )}
    </div>
  );
};
export default CreateChat;
