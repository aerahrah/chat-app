import { useMutation, useQueryClient } from "react-query";
import { useState, useEffect } from "react";
import { createMessage } from "../../api/chatAPI";
import { getAllUsers } from "../../api/authAPI";
import { Combobox } from "@headlessui/react";
import SearchUser from "./searchUser";

const CreateChat = () => {
  const createMessageMutation = useMutation(createMessage);
  const [chatName, setChatName] = useState("");
  const [userName, setUserName] = useState("");
  const [isAddChatOpen, setIsAddChatOpen] = useState(false);
  const [isCreateGroupChatOpen, setIsCreateGroupChatOpen] = useState(false);
  const [isCreatePrivateChatOpen, setIsCreatePrivateChatOpen] = useState(false);
  const [allUsers, setAllUsers] = useState(null);
  const queryClient = useQueryClient();

  const handleCreateGroupChat = async () => {
    try {
      const data = await createMessageMutation.mutateAsync(chatName);
      queryClient.refetchQueries("getAllChat");
    } catch (error) {
      console.log(error);
    }
  };
  const handleCreatePrivateChat = async () => {};

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
          <button onClick={handleCreateGroupChat}>submit</button>
        </div>
      )}
      {isCreatePrivateChatOpen && (
        <div>
          <SearchUser />
        </div>
      )}
    </div>
  );
};
export default CreateChat;
