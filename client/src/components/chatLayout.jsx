import SideBarPanel from "./pages/menu/sideBarPanel";
import GetAllChat from "./pages/menu/getAllChats";
const ChatLayout = () => {
  return (
    <div className="flex flex-col h-screen w-[340px] bg-gray-100">
      <SideBarPanel />
      <GetAllChat />
    </div>
  );
};
export default ChatLayout;
