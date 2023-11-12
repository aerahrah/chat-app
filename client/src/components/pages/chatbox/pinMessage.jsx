import { BiDotsVerticalRounded } from "react-icons/bi";
import { useState } from "react";
import { Menu } from "@headlessui/react";
import { useMutation, useQueryClient } from "react-query";
import { createPinMessage } from "../../api/chatAPI";
import useThemeStore from "../../state/useThemeStore";

const PinMessage = ({ pinMessageBtn, chatId, message, alignment }) => {
  const createPinMessageMutation = useMutation(createPinMessage);
  const theme = useThemeStore((state) => state.theme);
  const queryClient = useQueryClient();

  const handleCreatePinMessage = async () => {
    try {
      const response = await createPinMessageMutation.mutateAsync({
        chatId: chatId,
        pinMessage: message,
      });
      console.log(response);
      queryClient.invalidateQueries("getConversation");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      {pinMessageBtn && (
        <div
          className={`absolute  top-[50%] transform translate-y-[-50%] flex items-center ${
            alignment === "user"
              ? "left-[-3rem] py-14 px-4"
              : "right-[-3rem] py-14 px-4 "
          }`}
        >
          <Menu as="div" className="relative inline-block text-left">
            <Menu.Button className="bg-neutral-200/40 hover:bg-neutral-200 rounded-full dark:bg-neutral-700/10 dark:hover:bg-neutral-700/40 p-1 transition duration-[300ms] outline-0">
              <BiDotsVerticalRounded className="h-5 w-5 text-neutral-700 dark:text-neutral-400" />
            </Menu.Button>
            <Menu.Items
              className={`${
                theme === "light" ? "bg-white" : "bg-neutral-700"
              } absolute transform top-[-3.5rem] right-[50%] translate-x-[50%] mt-2 w-20 rounded-md shadow-lg focus:outline-none z-30`}
            >
              <Menu.Item>
                <button
                  className={`${
                    theme === "light"
                      ? "bg-white ring-neutral-200 hover:bg-neutral-200/30 text-neutral-700"
                      : "bg-neutral-700 ring-neutral-800/30 hover:bg-neutral-800/10 text-neutral-300"
                  } w-full ring-1 flex gap-2 items-center rounded-md p-2 cursor-pointer capitalize`}
                  onClick={handleCreatePinMessage}
                >
                  <p>pin</p>
                </button>
              </Menu.Item>
            </Menu.Items>
          </Menu>
        </div>
      )}
    </div>
  );
};
export default PinMessage;
