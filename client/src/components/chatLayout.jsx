import SideBarPanel from "./pages/sidebar/sideBarPanel/sideBarPanel";
import GetAllChat from "./pages/sidebar/getAllChats/getAllChats";
import MainChatBox from "./pages/chatbox/mainChatBox";
const ChatLayout = () => {
  return (
    <div className="flex h-screen bg-neutral-100 dark:bg-neutral-800 text-gray-700 transition duration-[300ms]">
      <div className="flex flex-col  min-w-[360px] border-r-[1px]">
        <SideBarPanel />
        <GetAllChat />
      </div>
      <MainChatBox />
    </div>
  );
};
export default ChatLayout;
