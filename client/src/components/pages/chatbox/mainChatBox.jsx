import { useQuery } from "react-query";
import { getChatConversation } from "../../api/chatAPI";
import { useParams } from "react-router-dom";
import useThemeStore from "../../state/useThemeStore";
import ConversationHeader from "./conversationHeader";
import ConversationView from "./conversationView";
import MessageComposer from "./MessageComposer";
import { useState } from "react";
import EditNickname from "./chatMenu/editNickname";
import ChatMenuLayout from "./chatMenu/chatMenuLayout";

const MainChatBox = () => {
  const { chatId } = useParams();
  const chatQuery = ["getConversation", chatId];
  const theme = useThemeStore((state) => state.theme);
  const [editNicknameModal, setEditNicknameModal] = useState(false);
  const [openChatMenu, setOpenChatMenu] = useState(false);

  const toggleEditNickname = () => {
    return setEditNicknameModal(!editNicknameModal);
  };

  const {
    data: chatData,
    isLoading,
    isError,
    error,
  } = useQuery(chatQuery, () => (chatId ? getChatConversation(chatId) : null));

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className=" w-full max-w-[100%] relative text-neutral-700">
      {chatData && (
        <div className="flex w-full">
          <div className="flex flex-col flex-1 max-w[100%] h-screen  text-neutral-700 dark:text-neutral-300 ">
            <ConversationHeader chatData={chatData} />
            <ConversationView chatData={chatData} userId={chatData.userId} />
            <MessageComposer chatId={chatId} />
          </div>
          <ChatMenuLayout
            chatData={chatData}
            toggleEditNickname={toggleEditNickname}
          />
          <EditNickname
            theme={theme}
            chatData={chatData}
            editNicknameModal={editNicknameModal}
            toggleEditNickname={toggleEditNickname}
          />
        </div>
      )}
    </div>
  );
};

export default MainChatBox;
