import { useMutation, useQueryClient } from "react-query";
import { useState, useEffect } from "react";
import { createGroupChat, createPrivateChat } from "../../api/chatAPI";
import { getAllUsers } from "../../api/authAPI";
import { Combobox } from "@headlessui/react";
import SearchUser from "./searchUser";

const CreateChat = () => {
  const createGroupChatMutation = useMutation(createGroupChat);
  const createPrivateChatMutation = useMutation(createPrivateChat);
  const [chatName, setChatName] = useState("");
  const [userNameId, setUserNameId] = useState("");
  const [isAddChatOpen, setIsAddChatOpen] = useState(false);
  const [isCreateGroupChatOpen, setIsCreateGroupChatOpen] = useState(false);
  const [isCreatePrivateChatOpen, setIsCreatePrivateChatOpen] = useState(false);
  const [allUsers, setAllUsers] = useState(null);
  const queryClient = useQueryClient();

  const handleCreateGroupChat = async () => {
    try {
      const data = await createGroupChatMutation.mutateAsync(chatName);
      queryClient.refetchQueries("getAllChat");
    } catch (error) {
      console.log(error);
    }
  };
  const handleCreatePrivateChat = async () => {
    try {
      const data = await createPrivateChatMutation.mutateAsync(userNameId);
      queryClient.refetchQueries("getAllChat");
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
          <button onClick={handleCreateGroupChat}>submit</button>
        </div>
      )}
      {isCreatePrivateChatOpen && (
        <div>
          <SearchUser setUserNameId={setUserNameId} />
          <button onClick={handleCreatePrivateChat}>submit</button>
        </div>
      )}
    </div>
  );
};
export default CreateChat;
