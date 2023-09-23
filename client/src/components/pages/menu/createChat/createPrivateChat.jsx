import { useMutation, useQueryClient } from "react-query";
import { createPrivateChat } from "../../../api/chatAPI";
import SearchUser from "./searchUser";
import { Dialog } from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";
import useChatCreationStore from "../../../state/chat/useChatCreationStore";

const CreatePrivateChat = ({
  isCreatePrivateChatOpen,
  toggleCreatePrivateChatOpen,
}) => {
  const createPrivateChatMutation = useMutation(createPrivateChat);
  const queryClient = useQueryClient();
  const { userNameId, setUserNameId } = useChatCreationStore();

  const handleCreatePrivateChat = async () => {
    try {
      await createPrivateChatMutation.mutateAsync(userNameId);
      queryClient.refetchQueries("getAllChat");
      toggleCreatePrivateChatOpen();
    } catch (error) {
      console.log(error);
    }
  };
  console.log(isCreatePrivateChatOpen);
  return (
    <AnimatePresence>
      {isCreatePrivateChatOpen && (
        <Dialog
          static
          as={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: isCreatePrivateChatOpen ? 1 : 0 }}
          exit={{ opacity: 0 }}
          open={isCreatePrivateChatOpen}
          onClose={toggleCreatePrivateChatOpen}
        >
          <div className="fixed inset-0 bg-black/40" />

          <div className="fixed inset-0 flex w-screen items-center justify-center">
            <Dialog.Panel
              as={motion.div}
              initial={{ scale: 0.7 }}
              animate={{ scale: isCreatePrivateChatOpen ? 1 : 0.7 }}
              exit={{ scale: 0.7 }}
              className="mx-auto max-w-sm rounded shadow-xl bg-white p-4"
            >
              <Dialog.Title className="text-lg pb-4">
                Create Private Chat
              </Dialog.Title>
              <div>
                <SearchUser setUserNameId={setUserNameId} />
                <div className="flex justify-between">
                  <button
                    className="bg-red-500 text-red-50 rounded-sm px-10 py-2 hover:bg-red-600 shadow-md  capitalize"
                    onClick={toggleCreatePrivateChatOpen}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-blue-500 text-blue-50 rounded-sm px-10 py-2 hover:bg-blue-600  shadow-md  capitalize"
                    onClick={handleCreatePrivateChat}
                  >
                    Create
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
export default CreatePrivateChat;
