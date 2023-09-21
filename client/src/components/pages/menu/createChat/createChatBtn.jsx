import useChatCreationStore from "../../../state/chat/useChatCreationStore";
import CreateGroupChat from "./createGroupChat";
import CreatePrivateChat from "./createPrivateChat";
import { BiPlus } from "react-icons/bi";
import { FaUser, FaUsers } from "react-icons/fa";
import { Popover } from "@headlessui/react";
const CreateChat = () => {
  const {
    isCreateGroupChatOpen,
    isCreatePrivateChatOpen,
    toggleCreateGroupChatOpen,
    toggleCreatePrivateChatOpen,
  } = useChatCreationStore();

  return (
    <div>
      <div className="relative text-gray-700 text-lg">
        <Popover className="relative">
          <Popover.Button className="hover:bg-gray-200 rounded-full">
            <BiPlus className="h-8 w-8" />
          </Popover.Button>
          <Popover.Panel className="absolute z-10">
            <div className="absolute shadow-md p-6 flex flex-col gap-6 z-10 rounded-md bg-white items-start">
              <button
                className="flex gap-2 items-center whitespace-nowrap"
                onClick={toggleCreatePrivateChatOpen}
              >
                <i>
                  <FaUser />
                </i>
                Private Chat
              </button>
              <button
                className="flex gap-2 items-center"
                onClick={toggleCreateGroupChatOpen}
              >
                <i>
                  <FaUsers />
                </i>
                Group Chat
              </button>
            </div>
          </Popover.Panel>
        </Popover>
      </div>
      {isCreateGroupChatOpen && <CreateGroupChat />}
      {isCreatePrivateChatOpen && <CreatePrivateChat />}
    </div>
  );
};
export default CreateChat;
