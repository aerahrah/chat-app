import { Dialog } from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";
import useThemeStore from "../../../../state/useThemeStore";
import SearchUser from "../../../sidebar/sideBarPanel/createChat/searchUsers";
import useChatCreationStore from "../../../../state/chat/useChatCreationStore";
import { addChatMember } from "../../../../api/chatAPI";
import { useMutation, useQueryClient } from "react-query";

const AddChatMember = ({ chatId, addChatMemberOpen, toggleAddChatMember }) => {
  const theme = useThemeStore((state) => state.theme);
  const { userNameId, setUserNameId } = useChatCreationStore();

  const addChatMemberMutation = useMutation(addChatMember);
  const queryClient = useQueryClient();
  const handleAddChatMember = async () => {
    try {
      await addChatMemberMutation.mutateAsync({
        chatId,
        userNameId,
      });
      queryClient.refetchQueries("getAllChat");
      queryClient.invalidateQueries("getConversation");
      toggleAddChatMember();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AnimatePresence>
      {addChatMemberOpen && (
        <Dialog
          static
          as={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: addChatMemberOpen ? 1 : 0 }}
          exit={{ opacity: 0 }}
          open={addChatMemberOpen}
          onClose={toggleAddChatMember}
        >
          <div className="fixed inset-0 bg-black/40" />

          <div className="fixed inset-0 flex w-screen items-center justify-center">
            <Dialog.Panel
              as={motion.div}
              initial={{ scale: 0.7 }}
              animate={
                addChatMemberOpen
                  ? { scale: 1, opacity: 1 }
                  : { scale: 0.7, opacity: 0 }
              }
              exit={{ scale: 0.7, opacity: 0 }}
              className={`${
                theme === "light"
                  ? "bg-white text-neutral-700"
                  : "bg-neutral-700 text-neutral-300"
              } mx-auto max-w-sm rounded-md shadow-lg p-4`}
            >
              <Dialog.Title className={`text-lg pb-4 font-semibold`}>
                Add member
              </Dialog.Title>
              <div>
                <SearchUser setUserNameId={setUserNameId} theme={theme} />
                <div className="flex justify-between dark:bg-neutral-800">
                  <button
                    className="bg-red-500 text-red-50 rounded px-10 py-2 hover:bg-red-600 shadow-md capitalize"
                    onClick={toggleAddChatMember}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-blue-500 text-blue-50 rounded px-10 py-2 hover:bg-blue-600 shadow-md  capitalize"
                    onClick={handleAddChatMember}
                  >
                    Add
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

export default AddChatMember;
