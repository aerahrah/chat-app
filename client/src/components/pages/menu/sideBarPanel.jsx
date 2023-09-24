import { useQuery } from "react-query";
import { getUserProfile } from "../../api/authAPI";
import { useState } from "react";
import CreateChat from "./createChat/createChatBtn";
import SearchChat from "./searchChats";
import UserSettings from "./userSettings";
import DarkModeToggle from "./darkModeToggle";
const SideBarPanel = () => {
  const [searchTerm, setSearchTerm] = useState();
  const { data, isLoading, error, isFetching } = useQuery(
    "userData",
    () => getUserProfile(),
    {
      refetchOnWindowFocus: false,
    }
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching data: {error.message}</div>;
  }
  console.log(data);
  return (
    <div className="flex flex-col w-[100%] pb-4">
      <div className="flex justify-between items-center px-4 py-6">
        <img
          src={`https://api.dicebear.com/7.x/${data.userImgType}/svg?seed=${data.userImg}`}
          alt="avatar"
          className="h-12 w-12 rounded-full"
        />
        <div className="flex gap-2 text-neutral-700 dark:text-neutral-300 ">
          <UserSettings />
          <CreateChat />
          <DarkModeToggle />
        </div>
      </div>
      <SearchChat setSearchTerm={setSearchTerm} />
    </div>
  );
};
export default SideBarPanel;
