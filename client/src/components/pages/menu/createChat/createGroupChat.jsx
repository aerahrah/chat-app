import { useMutation, useQueryClient } from "react-query";
import useChatCreationStore from "../../../state/chat/useChatCreationStore";
import { createGroupChat } from "../../../api/chatAPI";
import { Dialog } from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";

const CreateGroupChat = ({
  isCreateGroupChatOpen,
  toggleCreateGroupChatOpen,
}) => {
  const createGroupChatMutation = useMutation(createGroupChat);
  const queryClient = useQueryClient();
  const { chatName, setChatName } = useChatCreationStore();

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
    <AnimatePresence>
      {isCreateGroupChatOpen && (
        <Dialog
          static
          as={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: isCreateGroupChatOpen ? 1 : 0 }}
          exit={{ opacity: 0 }}
          open={isCreateGroupChatOpen}
          onClose={toggleCreateGroupChatOpen}
        >
          <div className="fixed inset-0 bg-black/30" />

          <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
            <Dialog.Panel
              as={motion.div}
              initial={{ scale: 0.7 }}
              animate={{ scale: isCreateGroupChatOpen ? 1 : 0.7 }}
              exit={{ scale: 0.7 }}
              className="mx-auto max-w-sm rounded bg-white"
            >
              <Dialog.Title>Create Group Chat</Dialog.Title>
              <div>
                <input
                  className="outline-0 rounded-md "
                  type="text"
                  value={chatName}
                  placeholder="Enter chat name"
                  onChange={(e) => setChatName(e.target.value)}
                />

                <div className="flex justify-between">
                  <button onClick={toggleCreateGroupChatOpen}>Cancel</button>
                  <button onClick={handleCreateGroupChat}>submit</button>
                </div>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  );
};
export default CreateGroupChat;
