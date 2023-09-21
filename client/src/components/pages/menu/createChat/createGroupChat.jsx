import { useMutation, useQueryClient } from "react-query";
import useChatCreationStore from "../../../state/chat/useChatCreationStore";
import { createGroupChat } from "../../../api/chatAPI";
import { Dialog } from "@headlessui/react";

const CreateGroupChat = () => {
  const createGroupChatMutation = useMutation(createGroupChat);
  const queryClient = useQueryClient();
  const {
    chatName,
    setChatName,
    isCreateGroupChatOpen,
    toggleCreateGroupChatOpen,
  } = useChatCreationStore();
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
      <Dialog open={isCreateGroupChatOpen} onClose={toggleCreateGroupChatOpen}>
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <Dialog.Panel className="mx-auto max-w-sm rounded bg-white">
            <Dialog.Title>Create Group Chat</Dialog.Title>
            <div>
              <input
                type="text"
                value={chatName}
                placeholder="Enter chat name"
                onChange={(e) => setChatName(e.target.value)}
              />

              <div>
                <button>Cancel</button>
                <button onClick={handleCreateGroupChat}>submit</button>
              </div>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};
export default CreateGroupChat;
