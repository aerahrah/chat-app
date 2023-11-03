import { removeChatMember } from "../../../../api/chatAPI";
import { useMutation, useQueryClient } from "react-query";
import DialogComponent from "../../../../utils/dialogComponent";
import BtnPanelComponent from "../../../../utils/btnPanelComponent";
const RemoveChatMember = ({
  openConfirmationDialog,
  toggleOpenComfirmationDialog,
  memberData,
  chatId,
  userId,
}) => {
  const removeChatMemberMutation = useMutation(removeChatMember);
  const queryClient = useQueryClient();
  const handleRemoveChatMember = async () => {
    try {
      await removeChatMemberMutation.mutateAsync({
        chatId,
        memberId: memberData._id,
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
      title={
        userId === memberData.user._id
          ? "leave group chat?"
          : "remove chat member?"
      }
    >
      <div className="w-full">
        <p className="text-sm mb-6 text-center">
          {userId === memberData.user._id
            ? "You will stop receiving messages from this conversation and people will see that you left."
            : " Are you sure you want to remove this person from the conversation? They will no longer be able to send or receive new messages."}
        </p>
        <BtnPanelComponent
          closeModal={toggleOpenComfirmationDialog}
          handleOnClick={handleRemoveChatMember}
          label={
            userId === memberData.user._id ? "leave group" : "remove from chat"
          }
        />
      </div>
    </DialogComponent>
  );
};

export default RemoveChatMember;
