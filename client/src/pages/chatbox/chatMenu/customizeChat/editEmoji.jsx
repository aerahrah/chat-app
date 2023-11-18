import { editChatEmoji } from "../../../../services/chatAPI";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import DialogComponent from "../../../../components/globalComponents/dialogComponent";
import BtnPanelComponent from "../../../../components/globalComponents/btnPanelComponent";
import EmojiPicker from "emoji-picker-react";

const EditEmoji = ({ chatData, editEmojiModal, toggleEditEmoji }) => {
  const editChatEmojiMutation = useMutation(editChatEmoji);
  const queryClient = useQueryClient();
  const [defaultEmoji, setDefaultEmoji] = useState("");

  const handleEditChatEmoji = async () => {
    try {
      const response = await editChatEmojiMutation.mutateAsync({
        chatId: chatData.chat._id,
        newEmoji: defaultEmoji,
      });
      queryClient.invalidateQueries("getConversation");
      toggleEditEmoji();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <DialogComponent
      openModal={editEmojiModal}
      closeModal={toggleEditEmoji}
      title="Change emoji"
    >
      <div className="flex justify-center">
        <EmojiPicker
          onEmojiClick={(emoji) => setDefaultEmoji(emoji.emoji)}
          height={400}
          width="100%"
          previewConfig={{ showPreview: false }}
        />
      </div>
      <BtnPanelComponent
        closeModal={toggleEditEmoji}
        handleOnClick={handleEditChatEmoji}
        label="Save"
      />
    </DialogComponent>
  );
};
export default EditEmoji;
