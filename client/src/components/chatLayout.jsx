import SideBarPanel from "./pages/sidebar/sideBarPanel/sideBarPanel";
import GetAllChat from "./pages/sidebar/getAllChats/getAllChats";
import MainChatBox from "./pages/chatbox/mainChatBox";
const ChatLayout = () => {
  return (
    <div className=" h-screen w-[360px] bg-neutral-100 dark:bg-neutral-800 text-gray-700 transition duration-[300ms]">
      <div className="flex flex-col">
        <SideBarPanel />
        <GetAllChat />
      </div>
      <MainChatBox />
    </div>
  );
};
export default ChatLayout;
