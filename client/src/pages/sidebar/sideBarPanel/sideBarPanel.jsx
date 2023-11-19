
import CreateChat from "./createChat/createChatBtn";
import UserSettings from "./userSettings/userSettingBtn";
import DarkModeToggle from "./darkModeToggle/darkModeToggle";
import SearchChat from "../getAllChats/searchChats";

const SideBarPanel = ({ userData }) => {
  return (
    <div className="flex flex-col w-[100%] pb-4 ">
      <div className="flex justify-between items-center p-4">
        <img
          src={`https://api.dicebear.com/7.x/${userData.userImgType}/svg?seed=${userData.userImg}`}
          alt="avatar"
          className="h-12 w-12 rounded-full"
        />
        <div className="flex gap-2 text-neutral-700 dark:text-neutral-300 ">
          <UserSettings />
          <CreateChat />
          <DarkModeToggle />
        </div>
      </div>
      <SearchChat />
    </div>
  );
};
export default SideBarPanel;
