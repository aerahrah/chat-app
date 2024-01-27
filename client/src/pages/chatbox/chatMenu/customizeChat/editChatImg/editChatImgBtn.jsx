import { useState, useEffect } from "react";
import { useQueryClient, useMutation } from "react-query";
import { editChatImage } from "../../../../../services/chatAPI";
import DialogComponent from "../../../../../components/globalComponents/dialogComponent";
import BtnPanelComponent from "../../../../../components/globalComponents/btnPanelComponent";
import useThemeStore from "../../../../../components/state/useThemeStore";
import LoadImgOption from "./loadImgOption";

const EditChatImgBtn = ({
  chatData,
  editChatImageModal,
  toggleEditChatImage,
}) => {
  const queryClient = useQueryClient();
  const theme = useThemeStore((state) => state.theme);
  const editChatImageMutation = useMutation(editChatImage);
  const [stateChatData, setStateChatData] = useState(() => chatData.chat);

  const handleChangeChatImage = async () => {
    try {
      await editChatImageMutation.mutateAsync({
        chatId: chatData.chat._id,
        stateChatData,
      });
      queryClient.invalidateQueries("getAllChat");
      queryClient.invalidateQueries("getConversation");
      toggleEditChatImage();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    setStateChatData(chatData.chat);
  }, [chatData.chat]);

  return (
    <DialogComponent
      openModal={editChatImageModal}
      closeModal={toggleEditChatImage}
      title="Change chat image"
    >
      <div className="w-full flex justify-center">
        <img
          src={`https://api.dicebear.com/7.x/${stateChatData.chatImgType}/svg?seed=${stateChatData.chatImg}`}
          alt="avatar"
          className="h-20 w-20 rounded-full"
        />
      </div>
      <div className="mb-4">
        <LoadImgOption
          theme={theme}
          chatInitials={stateChatData.name}
          setStateChatData={setStateChatData}
        />
      </div>
      <BtnPanelComponent
        closeModal={toggleEditChatImage}
        handleOnClick={handleChangeChatImage}
        label="Save"
      />
    </DialogComponent>
  );
};

export default EditChatImgBtn;
