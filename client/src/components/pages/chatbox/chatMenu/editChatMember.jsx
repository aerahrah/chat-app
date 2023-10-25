import GetChatMembers from "./getChatMembers";
import { BiDotsHorizontalRounded, BiPlus } from "react-icons/bi";
const EditChatMember = ({
  chatData,
  editChatMemberModal,
  toggleEditChatMember,
}) => {
  return (
    <div>
      {editChatMemberModal && (
        <div>
          <GetChatMembers
            chatData={chatData}
            BiDotsHorizontalRounded={BiDotsHorizontalRounded}
          />
          <button className="w-full flex gap-2 items-center hover:bg-neutral-200/40  hover:dark:bg-neutral-700/30 rounded-md p-2 cursor-pointer ">
            <i className="bg-neutral-200/40 hover:bg-neutral-200 rounded-full dark:bg-neutral-700/10 dark:hover:bg-neutral-700/40 p-2 transition duration-[300ms] outline-0">
              <BiPlus className="h-5 w-5" />
            </i>
            <p> Add person</p>
          </button>
        </div>
      )}
    </div>
  );
};
export default EditChatMember;
