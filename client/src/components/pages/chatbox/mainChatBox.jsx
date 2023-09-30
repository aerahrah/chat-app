import { useQuery } from "react-query";
import { getChatConversation } from "../../api/chatAPI";
import useChatBoxStore from "../../state/chat/useChatBoxStore";
const MainChatBox = () => {
  const chatId = useChatBoxStore((state) => state.chatId);
  const chatQuery = ["getConversation", chatId];
  const { data, isLoading, isError, error } = useQuery(
    chatQuery,
    () => (chatId ? getChatConversation(chatId) : null) // Only call API when chatId is defined
  );
  console.log(data);
  return <div></div>;
};

export default MainChatBox;
