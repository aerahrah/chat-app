import { removeChatMember } from "../../../../api/chatAPI";
import { useMutation, useQueryClient } from "react-query";
import DialogComponent from "../../../../utils/dialogComponent";
import BtnPanelComponent from "../../../../utils/btnPanelComponent";
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
        <BtnPanelComponent
          closeModal={toggleOpenComfirmationDialog}
          handleOnClick={handleRemoveChatMember}
          label="remove from chat"
        />
      </div>
    </DialogComponent>
  );
};

export default RemoveChatMember;
