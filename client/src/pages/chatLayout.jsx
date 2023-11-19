import { Outlet, useParams } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { useQuery } from "react-query";
import { getAllChat } from "../services/chatAPI";
import { getUserProfile } from "../services/authAPI";
import Spinner from "../components/globalComponents/spinner";
import SideBarPanel from "../pages/sidebar/sideBarPanel/sideBarPanel";
import GetAllChat from "../pages/sidebar/getAllChats/getAllChats";
import useChatCreationStore from "../components/state/useChatCreationStore";

const ChatLayout = () => {
  const { chatId } = useParams();
  const isMobileScreen = useMediaQuery({ maxWidth: 548 });
  const {
    data: userData,
    isLoading: isUserDataLoading,
    error: userDataError,
  } = useQuery("userData", () => getUserProfile());

  const {
    data: chatInfo,
    isLoading: isChatLoading,
    error: chatError,
  } = useQuery(["getAllChat"], () => getAllChat());

  if (isUserDataLoading || isChatLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-neutral-100 dark:bg-neutral-800">
        <Spinner />
      </div>
    );
  }
  if (userDataError || chatError) {
    return (
      <div>
        Error fetching data: {userDataError?.message || chatError?.message}
      </div>
    );
  }
  return (
    <div className="flex h-screen w-full bg-neutral-100 dark:bg-neutral-800 text-gray-700 transition">
      {!(isMobileScreen && chatId !== undefined) && (
        <div
          className={`${
            isMobileScreen ? "!w-full !max-w-full" : ""
          } flex flex-col w-full min-w-[220px] sm:min-w-[240px] max-w-[23.5vw] border-neutral-300 border-r-[1px] dark:border-neutral-700 transition duration-[300ms]`}
        >
          <SideBarPanel userData={userData} />
          <GetAllChat chatInfo={chatInfo} />
        </div>
      )}
      <Outlet />
    </div>
  );
};
export default ChatLayout;
