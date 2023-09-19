import CreateChat from "./pages/menu/createChat/createChatBtn";
import GetAllChat from "./pages/menu/getAllChats";
const ChatLayout = () => {
  return (
    <div className="flex flex-col h-screen w-[340px] bg-gray-100">
      <CreateChat />
      <GetAllChat />
    </div>
  );
};
export default ChatLayout;
