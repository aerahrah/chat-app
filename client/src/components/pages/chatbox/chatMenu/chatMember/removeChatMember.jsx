import { removeChatMember } from "../../../../api/chatAPI";
import { useMutation, useQueryClient } from "react-query";
import DialogComponent from "../../../../utils/dialogComponent";
const RemoveChatMember = ({
  openConfirmationDialog,
  toggleOpenComfirmationDialog,
  memberId,
  chatId,
}) => {
  const removeChatMemberMutation = useMutation(removeChatMember);
  const queryClient = useQueryClient();
  const handleRemoveChatMember = async () => {
    try {
      await removeChatMemberMutation.mutateAsync({
        chatId,
        memberId,
      });
      queryClient.refetchQueries("getAllChat");
      queryClient.invalidateQueries("getConversation");
      toggleOpenComfirmationDialog();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <DialogComponent
      openModal={openConfirmationDialog}
      closeModal={toggleOpenComfirmationDialog}
      title="remove chat member?"
    >
      <div className="w-full">
        <p className="text-sm mb-6 text-center">
          Are you sure you want to remove this person from the conversation?
          They will no longer be able to send or receive new messages.
        </p>
        <div className="flex justify-between dark:bg-neutral-800">
          <button
            className="bg-red-500 text-red-50 rounded px-10 py-2 hover:bg-red-600 shadow-md capitalize"
            onClick={toggleOpenComfirmationDialog}
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 text-blue-50 rounded px-10 py-2 hover:bg-blue-600 shadow-md  capitalize"
            onClick={handleRemoveChatMember}
          >
            remove from chat
          </button>
        </div>
      </div>
    </DialogComponent>
  );
};

export default RemoveChatMember;
