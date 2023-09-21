import { useState } from "react";

const SearchChat = () => {
  const [chatName, setChatName] = useState();
  return (
    <div>
      <input
        type="text"
        value={chatName}
        placeholder="Search Chats"
        className="block p-2 w-[90%] mx-auto rounded-full bg-gray-200 outline-0"
        onChange={(e) => setChatName(e.target.value)}
      />
    </div>
  );
};
export default SearchChat;
