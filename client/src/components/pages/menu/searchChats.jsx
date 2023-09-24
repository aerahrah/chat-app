import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import useChatCreationStore from "../../state/chat/useChatCreationStore";
import { useQueryClient } from "react-query";

const SearchChat = () => {
  const queryClient = useQueryClient();
  const { setSearchTermChat, searchTermChat } = useChatCreationStore();

  const [chatName, setChatName] = useState("");
  const handleSearchChange = (e) => {
    setSearchTermChat(e.target.value);
    console.log(searchTermChat);
    setChatName(e.target.value);
    queryClient.invalidateQueries("getAllChat");
  };
  return (
    <div className="relative text-neutral-600">
      <input
        type="text"
        value={chatName}
        placeholder="Search Chats"
        className="block pl-8 p-2 w-[90%] mx-auto rounded-full bg-neutral-200 outline-0 dark:bg-neutral-900/80  transition duration-[300ms]"
        onChange={(e) => handleSearchChange(e)}
      />
      <FaSearch className="absolute left-[1.75rem] top-1/2 -translate-y-1/2" />
    </div>
  );
};
export default SearchChat;
