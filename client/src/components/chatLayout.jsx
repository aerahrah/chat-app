import SideBarPanel from "./pages/sidebar/sideBarPanel/sideBarPanel";
import GetAllChat from "./pages/sidebar/getAllChats/getAllChats";
const ChatLayout = () => {
  return (
    <div className="flex flex-col h-screen w-[360px] bg-neutral-100 dark:bg-neutral-800 text-gray-700 transition duration-[300ms]">
      <SideBarPanel />
      <GetAllChat />
    </div>
  );
};
export default ChatLayout;
