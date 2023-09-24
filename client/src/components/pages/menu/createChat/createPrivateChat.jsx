import { useMutation, useQueryClient } from "react-query";
import { createPrivateChat } from "../../../api/chatAPI";
import SearchUser from "./searchUser";
import { Dialog } from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";
import useChatCreationStore from "../../../state/chat/useChatCreationStore";
import useThemeStore from "../../../state/useThemeStore";

const CreatePrivateChat = ({
  isCreatePrivateChatOpen,
  toggleCreatePrivateChatOpen,
}) => {
  const createPrivateChatMutation = useMutation(createPrivateChat);
  const queryClient = useQueryClient();
  const { userNameId, setUserNameId } = useChatCreationStore();
  const theme = useThemeStore((state) => state.theme);

  const handleCreatePrivateChat = async () => {
    try {
      await createPrivateChatMutation.mutateAsync(userNameId);
      queryClient.refetchQueries("getAllChat");
      toggleCreatePrivateChatOpen();
    } catch (error) {
      console.log(error);
    }
  };
  console.log(theme);
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

          <div className="fixed inset-0 flex w-screen items-center justify-center ">
            <Dialog.Panel
              as={motion.div}
              initial={{ scale: 0.7 }}
              animate={{ scale: isCreatePrivateChatOpen ? 1 : 0.7 }}
              exit={{ scale: 0.7 }}
              className={`${
                theme === "light"
                  ? "bg-white text-neutral-700"
                  : "bg-neutral-700 text-neutral-300"
              } mx-auto max-w-sm rounded-md shadow-xl  p-4`}
            >
              <Dialog.Title className={`text-lg pb-4`}>
                Create Private Chat
              </Dialog.Title>
              <div>
                <SearchUser setUserNameId={setUserNameId} theme={theme} />
                <div className="flex justify-between dark:bg-neutral-800">
                  <button
                    className="bg-red-500 text-red-50 rounded px-10 py-2 hover:bg-red-600 shadow-md  capitalize"
                    onClick={toggleCreatePrivateChatOpen}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-blue-500 text-blue-50 rounded px-10 py-2 hover:bg-blue-600  shadow-md  capitalize"
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
