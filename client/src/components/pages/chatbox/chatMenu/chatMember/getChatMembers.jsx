import { getSpecificImg } from "../../../sidebar/getAllChats/getChatInfo";
import { Menu } from "@headlessui/react";
import { BiMinus } from "react-icons/bi";
import { useState } from "react";
import RemoveChatMember from "./removeChatMember";

const GetChatMembers = ({ chatData, BiDotsHorizontalRounded }) => {
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);

  const toggleOpenComfirmationDialog = () => {
    return setOpenConfirmationDialog(!openConfirmationDialog);
  };

  return (
    <div>
      {chatData.chat.members.map((member) => {
        console.log(member);
        return (
          <div
            className="p-2 flex justify-between items-center"
            key={member._id}
          >
            <div className="flex gap-2 items-center">
              <img
                src={getSpecificImg(member)}
                alt="avatar"
                className="h-9 w-9 rounded-full"
              />
              <p> {member.name}</p>
            </div>

            <Menu as="div" className="relative inline-block text-left">
              <Menu.Button className="bg-neutral-200/40 hover:bg-neutral-200 rounded-full dark:bg-neutral-700/10 dark:hover:bg-neutral-700/40 p-2 transition duration-[300ms] outline-0">
                <BiDotsHorizontalRounded className="h-6 w-6" />
              </Menu.Button>
              <Menu.Items className="absolute right-0 mt-2 w-56 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none z-30">
                <Menu.Item>
                  <button
                    className="w-full flex gap-2 items-center hover:bg-neutral-200/40  hover:dark:bg-neutral-700/30 rounded-md p-2 cursor-pointer capitalize"
                    onClick={toggleOpenComfirmationDialog}
                  >
                    <i className="bg-neutral-200/40 rounded-full dark:bg-neutral-700/10 p-2 transition duration-[300ms] outline-0">
                      <BiMinus className="h-5 w-5" />
                    </i>
                    <p> remove member</p>
                  </button>
                </Menu.Item>
              </Menu.Items>
            </Menu>
            <RemoveChatMember
              openConfirmationDialog={openConfirmationDialog}
              toggleOpenComfirmationDialog={toggleOpenComfirmationDialog}
              chatId={chatData.chat._id}
              memberId={member._id}
            />
          </div>
        );
      })}
    </div>
  );
};

export default GetChatMembers;
