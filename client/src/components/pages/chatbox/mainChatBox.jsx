import { useQuery } from "react-query";
import { getChatConversation } from "../../api/chatAPI";
import { useParams } from "react-router-dom";
import ConversationHeader from "./conversationHeader";
import ConversationView from "./conversationView";
import MessageComposer from "./MessageComposer";
import { useState } from "react";
import EditNickname from "./chatMenu/editNickname";
import ChatMenuLayout from "./chatMenu/chatMenuLayout";

const MainChatBox = () => {
  const { chatId } = useParams();
  const chatQuery = ["getConversation", chatId];

  const [editNicknameModal, setEditNicknameModal] = useState(false);

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
          <div className="flex flex-col flex-1 max-w[100%] h-screen  ">
            <ConversationHeader chatData={chatData} />
            <ConversationView chatData={chatData} userId={chatData.userId} />
            <MessageComposer chatId={chatId} />
          </div>
          <ChatMenuLayout
            chatData={chatData}
            toggleEditNickname={toggleEditNickname}
          />
          <EditNickname
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
