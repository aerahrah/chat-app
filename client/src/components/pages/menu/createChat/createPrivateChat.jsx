import { useMutation, useQueryClient } from "react-query";
import { createPrivateChat } from "../../../api/chatAPI";
import SearchUser from "./searchUser";
import { Dialog } from "@headlessui/react";
import useChatCreationStore from "../../../state/chat/useChatCreationStore";

const CreatePrivateChat = () => {
  const createPrivateChatMutation = useMutation(createPrivateChat);
  const queryClient = useQueryClient();
  const {
    userNameId,
    setUserNameId,
    isCreatePrivateChatOpen,
    toggleCreatePrivateChatOpen,
  } = useChatCreationStore();

  const handleCreatePrivateChat = async () => {
    try {
      await createPrivateChatMutation.mutateAsync(userNameId);
      queryClient.refetchQueries("getAllChat");
      toggleCreatePrivateChatOpen();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Dialog
        open={isCreatePrivateChatOpen}
        onClose={toggleCreatePrivateChatOpen}
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <Dialog.Panel className="mx-auto max-w-sm rounded bg-white">
            <Dialog.Title>Create Private Chat</Dialog.Title>
            <div>
              <SearchUser setUserNameId={setUserNameId} />
              <div>
                <button>Cancel</button>
                <button onClick={handleCreatePrivateChat}>submit</button>
              </div>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};
export default CreatePrivateChat;
