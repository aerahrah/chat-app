import { useQuery } from "react-query";
import { getChatConversation } from "../../services/chatAPI";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import useChatCreationStore from "../../components/state/useChatCreationStore";
import ConversationHeader from "./conversationHeader";
import ConversationView from "./displayConversation/conversationView";
import MessageComposer from "./MessageComposer";
import Spinner from "../../components/globalComponents/spinner";
import ChatMenuLayout from "./chatMenu/chatMenuLayout";

const MainChatBox = () => {
  const { chatId } = useParams();
  const openChatMenu = useChatCreationStore((state) => state.openChatMenu);
  const setColorTheme = useChatCreationStore((state) => state.setColorTheme);
  const isMediumScreen = useMediaQuery({ minWidth: 768 });

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
    return (
      <div className="h-screen w-full flex items-center justify-center bg-neutral-100 dark:bg-neutral-800">
        <Spinner />
      </div>
    );
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className=" w-full max-w-[100%] relative text-neutral-700">
      {chatData && (
        <div className="flex w-full">
          {!(!isMediumScreen && openChatMenu) && (
            <div className="flex flex-col min-w-[300px] md:min-w-[40vw] flex-1 max-w-[100%] h-screen  ">
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
          )}
          <ChatMenuLayout chatData={chatData} />
        </div>
      )}
    </div>
  );
};

export default MainChatBox;
