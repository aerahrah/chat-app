import { removeChatMember, leaveGroupChat } from "../../../../services/chatAPI";
import { useMutation, useQueryClient } from "react-query";
import DialogComponent from "../../../../components/globalComponents/dialogComponent";
import BtnPanelComponent from "../../../../components/globalComponents/btnPanelComponent";

const RemoveChatMember = ({
  openConfirmationDialog,
  toggleOpenComfirmationDialog,
  memberData,
  chatId,
  userId,
}) => {
  const removeChatMemberMutation = useMutation(removeChatMember);
  const leaveGroupChatMutation = useMutation(leaveGroupChat);
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
  const handleLeaveGroupChat = async () => {
    try {
      await leaveGroupChatMutation.mutateAsync({
        chatId,
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
          handleOnClick={
            userId === memberData.user._id
              ? handleLeaveGroupChat
              : handleRemoveChatMember
          }
          label={
            userId === memberData.user._id ? "leave group" : "remove from chat"
          }
        />
      </div>
    </DialogComponent>
  );
};

export default RemoveChatMember;
