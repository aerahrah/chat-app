import GetChatMembers from "./getChatMembers";
import { BiDotsHorizontalRounded, BiPlus } from "react-icons/bi";
import AddChatMember from "./addChatMember";
import { useState } from "react";

const EditChatMember = ({ chatData, editChatMemberModal }) => {
  const [addChatMemberOpen, setAddChatMemberOpen] = useState(false);
  console.log(chatData.chat._id);
  const toggleAddChatMember = () => {
    return setAddChatMemberOpen(!addChatMemberOpen);
  };
  return (
    <div>
      {editChatMemberModal && (
        <div>
          <GetChatMembers
            chatData={chatData}
            BiDotsHorizontalRounded={BiDotsHorizontalRounded}
          />
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