import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useMediaQuery } from "react-responsive";
import useChatCreationStore from "../../../components/state/useChatCreationStore";

const SearchChat = () => {
  const isMobileScreen = useMediaQuery({ maxWidth: 548 });
  const { setSearchTermChat } = useChatCreationStore();

  const [chatName, setChatName] = useState("");
  const handleSearchChange = (e) => {
    setSearchTermChat(e.target.value);
    setChatName(e.target.value);
  };

  return (
    <div className="relative text-neutral-700 dark:text-neutral-300">
      <input
        type="text"
        value={chatName}
        placeholder="Search Chats"
        className="block pl-8 p-2 w-[90%] mx-auto rounded-full bg-neutral-200 outline-0 dark:bg-neutral-900/60 transition duration-[300ms] "
        onChange={(e) => handleSearchChange(e)}
      />
      <FaSearch
        className={`${
          isMobileScreen ? "left-[7%]" : "left-[8%]"
        } absolute  top-1/2 -translate-y-1/2`}
      />
    </div>
  );
};
export default SearchChat;
