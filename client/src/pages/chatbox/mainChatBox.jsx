import { useQuery } from "react-query";
import { getChatConversation } from "../../services/chatAPI";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import useChatCreationStore from "../../components/state/useChatCreationStore";
import ConversationHeader from "./conversationHeader";
import ConversationView from "./displayConversation/conversationView";
import MessageComposer from "./MessageComposer";
import ChatMenuLayout from "./chatMenu/chatMenuLayout";

const MainChatBox = () => {
  const { chatId } = useParams();
  const setColorTheme = useChatCreationStore((state) => state.setColorTheme);
  const chatQuery = ["getConversation", chatId];
  const {
    data: chatData,
    isLoading,
    isError,
    error,
  } = useQuery(chatQuery, () => (chatId ? getChatConversation(chatId) : null));

  useEffect(() => {
    if (chatData) {
      setColorTheme(chatData.chat.colorTheme);
    }
  }, [chatData]);

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
            <ConversationView
              chatData={chatData}
              chatId={chatId}
              userId={chatData.userId}
              key={chatId}
            />
            <MessageComposer
              chatData={chatData}
              chatId={chatId}
              userId={chatData.userId}
            />
          </div>
          <ChatMenuLayout chatData={chatData} />
        </div>
      )}
    </div>
  );
};

export default MainChatBox;
