import { useMutation, useQueryClient } from "react-query";
import useChatCreationStore from "../../../state/chat/useChatCreationStore";
import { createGroupChat } from "../../../api/chatAPI";
import { Dialog } from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";
import useThemeStore from "../../../state/useThemeStore";

const CreateGroupChat = ({
  isCreateGroupChatOpen,
  toggleCreateGroupChatOpen,
}) => {
  const createGroupChatMutation = useMutation(createGroupChat);
  const queryClient = useQueryClient();
  const { chatName, setChatName } = useChatCreationStore();
  const theme = useThemeStore((state) => state.theme);

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
          <div className="fixed inset-0 bg-black/40" />

          <div className="fixed inset-0 flex w-screen items-center justify-center">
            <Dialog.Panel
              as={motion.div}
              initial={{ scale: 0.7 }}
              animate={{ scale: isCreateGroupChatOpen ? 1 : 0.7 }}
              exit={{ scale: 0.7 }}
              className={`${
                theme === "light"
                  ? "bg-white text-neutral-700"
                  : "bg-neutral-700 text-neutral-300"
              } mx-auto max-w-sm rounded-md bg-white shadow-xl p-4`}
            >
              <Dialog.Title className="text-lg pb-4 font-semibold">
                Create Group Chat
              </Dialog.Title>
              <div>
                <input
                  className={`${
                    theme === "light"
                      ? "bg-neutral-100 outline-neutral-300 focus:outline-blue-500"
                      : "bg-neutral-800 outline-neutral-800"
                  } outline outline-1 rounded block p-2 mb-6 w-[40vw] max-w-[100%]`}
                  type="text"
                  value={chatName}
                  placeholder="Enter chat name"
                  onChange={(e) => setChatName(e.target.value)}
                />

                <div className="flex justify-between">
                  <button
                    className="bg-red-500 text-red-50 rounded px-10 py-2 hover:bg-red-600 shadow-md  capitalize"
                    onClick={toggleCreateGroupChatOpen}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-blue-500 text-blue-50 rounded px-10 py-2 hover:bg-blue-600  shadow-md  capitalize"
                    onClick={handleCreateGroupChat}
                  >
                    create
                  </button>
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
