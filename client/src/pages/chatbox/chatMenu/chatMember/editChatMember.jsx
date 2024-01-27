import { BiPlus } from "react-icons/bi";
import { useState } from "react";
import ChatMemberList from "./chatMemberList";
import AddChatMember from "./addChatMember";

const EditChatMember = ({ chatData, isChatMembersOpen }) => {
  const [addChatMemberOpen, setAddChatMemberOpen] = useState(false);
 
  const toggleAddChatMember = () => {
    return setAddChatMemberOpen(!addChatMemberOpen);
  };
  return (
    <div>
      {isChatMembersOpen && (
        <div>
          <ChatMemberList chatData={chatData} />
          <button
            className="w-full flex gap-2 items-center hover:bg-neutral-200/40  hover:dark:bg-neutral-700/30 rounded-md p-2 cursor-pointer "
            onClick={toggleAddChatMember}
          >
            <i className="bg-neutral-200/40 rounded-full dark:bg-neutral-700/10 p-2 transition duration-[300ms] outline-0">
              <BiPlus className="h-5 w-5" />
            </i>
            <p> Add person</p>
          </button>
        </div>
      )}
      <AddChatMember
        chatId={chatData.chat._id}
        addChatMemberOpen={addChatMemberOpen}
        toggleAddChatMember={toggleAddChatMember}
      />
    </div>
  );
};
export default EditChatMember;
