import DialogComponent from "../../../../components/globalComponents/dialogComponent";
import BtnPanelComponent from "../../../../components/globalComponents/btnPanelComponent";
import EmojiPicker from "emoji-picker-react";
import { useState } from "react";

const EditEmoji = ({ editEmojiModal, toggleEditEmoji }) => {
  const [defaultEmoji, setDefaultEmoji] = useState("");
  console.log(defaultEmoji);
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
          width={700}
          previewConfig={{ showPreview: false }}
        />
      </div>
      <BtnPanelComponent
        closeModal={toggleEditEmoji}
        handleOnClick={console.log("")}
        label="Save"
      />
    </DialogComponent>
  );
};
export default EditEmoji;
