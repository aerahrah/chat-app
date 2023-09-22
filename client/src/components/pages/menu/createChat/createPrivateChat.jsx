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
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isCreatePrivateChatOpen ? 1 : 0 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30"
            aria-hidden="true"
          />

          <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
            <Dialog.Panel
              as={motion.div}
              initial={{ scale: 0.7 }}
              animate={{ scale: isCreatePrivateChatOpen ? 1 : 0.7 }}
              exit={{ scale: 0.7 }}
              className="mx-auto max-w-sm rounded bg-white"
            >
              <Dialog.Title>Create Private Chat</Dialog.Title>
              <div>
                <SearchUser setUserNameId={setUserNameId} />
                <div>
                  <button onClick={toggleCreatePrivateChatOpen}>Cancel</button>
                  <button onClick={handleCreatePrivateChat}>submit</button>
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
