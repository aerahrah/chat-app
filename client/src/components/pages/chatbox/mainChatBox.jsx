import { useQuery } from "react-query";
import { getChatConversation } from "../../api/chatAPI";
import { useParams } from "react-router-dom";
import useThemeStore from "../../state/useThemeStore";
import ConversationHeader from "./conversationHeader";
import ConversationView from "./conversationView";
import MessageComposer from "./MessageComposer";
import { STATES } from "mongoose";

const MainChatBox = () => {
  const { chatId } = useParams();
  const chatQuery = ["getConversation", chatId];
  const theme = useThemeStore((state) => state.theme);
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
        <div className="flex flex-col max-w[100%] h-screen  text-neutral-700 dark:text-neutral-300 ">
          <ConversationHeader chatData={chatData} />
          <ConversationView chatData={chatData} userId={chatData.userId} />
          <MessageComposer chatId={chatId} />
        </div>
      )}
    </div>
  );
};

export default MainChatBox;
