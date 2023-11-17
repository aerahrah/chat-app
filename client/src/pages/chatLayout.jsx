import { Outlet, useParams } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import SideBarPanel from "../pages/sidebar/sideBarPanel/sideBarPanel";
import GetAllChat from "../pages/sidebar/getAllChats/getAllChats";

const ChatLayout = () => {
  const { chatId } = useParams();
  const isMobileScreen = useMediaQuery({ maxWidth: 548 });
  
  return (
    <div className="flex h-screen bg-neutral-100 dark:bg-neutral-800 text-gray-700 transition duration-[300ms]">
      {!(isMobileScreen && chatId !== undefined) && (
        <div
          className={`${
            isMobileScreen ? "!w-full !max-w-full" : ""
          } flex flex-col w-full min-w-[220px] sm:min-w-[240px] max-w-[23.5vw] border-neutral-300 border-r-[1px] dark:border-neutral-700 transition duration-[300ms]`}
        >
          <SideBarPanel />
          <GetAllChat />
        </div>
      )}
      <Outlet />
    </div>
  );
};
export default ChatLayout;
