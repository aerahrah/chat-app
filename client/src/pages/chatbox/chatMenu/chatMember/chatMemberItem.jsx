import { Menu } from "@headlessui/react";
import { useState } from "react";
import { BiMinus, BiDotsHorizontalRounded, BiLogOut } from "react-icons/bi";
import { getSpecificImg } from "../../../../utils/getChatInfo";
import useThemeStore from "../../../../components/state/useThemeStore";
import RemoveChatMember from "./RemoveChatMember";

const ChatMemberItem = ({ memberData, chatId, userId }) => {
  const theme = useThemeStore((state) => state.theme);
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);

  const toggleOpenComfirmationDialog = () => {
    return setOpenConfirmationDialog(!openConfirmationDialog);
  };

  return (
    <div className="p-2 flex justify-between items-center" key={memberData._id}>
      <div className="flex gap-2  items-center">
        <img
          src={getSpecificImg(memberData)}
          alt="avatar"
          className="h-9 w-9 rounded-full"
        />
        <p> {memberData.name}</p>
      </div>

      <Menu as="div" className="relative inline-block text-left">
        <Menu.Button className="bg-neutral-200/40 hover:bg-neutral-200 rounded-full dark:bg-neutral-700/10 dark:hover:bg-neutral-700/40 p-2 transition duration-[300ms] outline-0">
          <BiDotsHorizontalRounded className="h-6 w-6" />
        </Menu.Button>
        <Menu.Items
          className={`${
            theme === "light" ? "bg-white" : "bg-neutral-700"
          } absolute right-0 mt-2 w-56 rounded-md shadow-lg focus:outline-none z-30`}
        >
          <Menu.Item>
            <button
              className={`${
                theme === "light"
                  ? "bg-white ring-1 ring-neutral-200 hover:bg-neutral-200/30"
                  : "bg-neutral-700 hover:bg-neutral-800/10"
              } w-full flex gap-2 items-center rounded-md p-2 cursor-pointer capitalize`}
              onClick={toggleOpenComfirmationDialog}
            >
              <i
                className={`${
                  theme === "light" ? "bg-neutral-200/80" : "bg-neutral-600/40"
                } rounded-full p-2 transition duration-[300ms] outline-0`}
              >
                {userId === memberData.user._id ? (
                  <BiLogOut className="h-5 w-5 transform rotate-180" />
                ) : (
                  <BiMinus className="h-5 w-5" />
                )}
              </i>
              <p>
                {userId === memberData.user._id
                  ? "leave group"
                  : "remove member"}
              </p>
            </button>
          </Menu.Item>
        </Menu.Items>
      </Menu>
      <RemoveChatMember
        openConfirmationDialog={openConfirmationDialog}
        toggleOpenComfirmationDialog={toggleOpenComfirmationDialog}
        chatId={chatId}
        userId={userId}
        memberData={memberData}
      />
    </div>
  );
};

export default ChatMemberItem;
