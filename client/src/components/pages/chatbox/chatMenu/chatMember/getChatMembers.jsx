import { getSpecificImg } from "../../../sidebar/getAllChats/getChatInfo";

const GetChatMembers = ({ chatData, BiDotsHorizontalRounded }) => {
  console.log(chatData.chat.members);
  return (
    <div>
      {chatData.chat.members.map((member) => {
        return (
          <div className="p-2 flex justify-between items-center">
            <div className="flex gap-2 items-center">
              <img
                src={getSpecificImg(member)}
                alt="avatar"
                className="h-9 w-9 rounded-full"
              />
              <p> {member.name}</p>
            </div>
            <button className="bg-neutral-200/40 hover:bg-neutral-200 rounded-full dark:bg-neutral-700/10 dark:hover:bg-neutral-700/40 p-2 transition duration-[300ms] outline-0">
              <BiDotsHorizontalRounded className="h-6 w-6" />
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default GetChatMembers;
