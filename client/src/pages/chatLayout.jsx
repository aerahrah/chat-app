import { Outlet, useParams } from "react-router-dom";
import SideBarPanel from "../pages/sidebar/sideBarPanel/sideBarPanel";
import GetAllChat from "../pages/sidebar/getAllChats/getAllChats";

const ChatLayout = () => {
  return (
    <div className="flex h-screen bg-neutral-100 dark:bg-neutral-800 text-gray-700 transition duration-[300ms]">
      <div className="flex flex-col w-full min-w-[200px] sm:min-w-[260px] max-w-[23.5vw] border-neutral-300 border-r-[1px] dark:border-neutral-700 transition duration-[300ms]">
        <SideBarPanel />
        <GetAllChat />
      </div>
      <Outlet />
    </div>
  );
};
export default ChatLayout;
