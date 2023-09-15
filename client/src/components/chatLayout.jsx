import CreateChat from "./pages/menu/createChat";
import GetAllChat from "./pages/menu/getAllChats";
const ChatLayout = () => {
  return (
    <div>
      <GetAllChat />
      <CreateChat />
    </div>
  );
};
export default ChatLayout;
