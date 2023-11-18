import { BiPlus } from "react-icons/bi";
import { FaUser, FaUsers } from "react-icons/fa";
import { Popover, Transition } from "@headlessui/react";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import CreateGroupChat from "./createGroupChat";
import CreatePrivateChat from "./createPrivateChat";

const CreateChat = () => {
  const [isCreatePrivateChatOpen, setIsCreatePrivateChatOpen] = useState(false);
  const [isCreateGroupChatOpen, setIsCreateGroupChatOpen] = useState(false);
  const isMobileScreen = useMediaQuery({ maxWidth: 548 });

  const toggleCreatePrivateChatOpen = () => {
    setIsCreatePrivateChatOpen(!isCreatePrivateChatOpen);
  };
  const toggleCreateGroupChatOpen = () => {
    setIsCreateGroupChatOpen(!isCreateGroupChatOpen);
  };

  return (
    <div>
      <div className="relative text-lg">
        <Popover className="relative">
          <Popover.Button className="bg-neutral-200/40 hover:bg-neutral-200 rounded-full dark:bg-neutral-700/10 dark:hover:bg-neutral-700/40 p-1 transition duration-[300ms] outline-0">
            <BiPlus className="h-8 w-8" />
          </Popover.Button>
          <Transition
            as="div"
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
            className="absolute z-30"
          >
            <Popover.Panel>
              <div
                className={`${
                  isMobileScreen ? "right-[-6rem]" : ""
                } absolute shadow-md p-2 flex flex-col gap-2 z-10 rounded-md bg-white items-start whitespace-nowrap dark:bg-neutral-700 dark:shadow-lg  border-[1px] border-neutral-200 dark:border-neutral-800`}
              >
                <button
                  className="flex gap-2 items-center whitespace-nowrap capitalize py-2 px-4 hover:bg-neutral-100 hover:dark:bg-neutral-600"
                  onClick={toggleCreatePrivateChatOpen}
                >
                  <i>
                    <FaUser />
                  </i>
                  Private Chat
                </button>
                <button
                  className="flex gap-2 items-center whitespace-nowrap capitalize py-2 px-4 hover:bg-neutral-100 hover:dark:bg-neutral-600"
                  onClick={toggleCreateGroupChatOpen}
                >
                  <i>
                    <FaUsers />
                  </i>
                  Group Chat
                </button>
              </div>
            </Popover.Panel>
          </Transition>
        </Popover>
      </div>
      <CreateGroupChat
        isCreateGroupChatOpen={isCreateGroupChatOpen}
        toggleCreateGroupChatOpen={toggleCreateGroupChatOpen}
      />

      <CreatePrivateChat
        isCreatePrivateChatOpen={isCreatePrivateChatOpen}
        toggleCreatePrivateChatOpen={toggleCreatePrivateChatOpen}
      />
    </div>
  );
};
export default CreateChat;
