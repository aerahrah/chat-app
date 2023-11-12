import { Menu } from "@headlessui/react";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { removePinMessage } from "../../../../api/chatAPI";
import { useMutation, useQueryClient } from "react-query";

const RemovePinMessage = ({ chatId, theme, pinMessageId }) => {
  const removePinMessageMutation = useMutation(removePinMessage);
  const queryClient = useQueryClient();
  const handleRemovePinMessage = async () => {
    try {
      const response = await removePinMessageMutation.mutateAsync({
        chatId,
        pinMessageId,
      });
      queryClient.invalidateQueries("getConversation");
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button
        className={`${
          theme === "light"
            ? "bg-neutral-200/50 hover:bg-neutral-300/70"
            : "bg-neutral-600/50 hover:bg-neutral-600"
        } p-1 rounded-full transition duration-[300ms] cursor-pointer`}
      >
        <BiDotsHorizontalRounded className="h-5 w-5" />
      </Menu.Button>
      <Menu.Items
        className={`${
          theme === "light" ? "bg-white" : "bg-neutral-600"
        } absolute transform top-[-3.5rem] right-0  mt-2 w-20 rounded-md shadow-lg focus:outline-none z-30`}
      >
        <Menu.Item>
          <button
            className={`${
              theme === "light"
                ? "bg-white ring-neutral-300 hover:bg-neutral-200/30 text-neutral-700"
                : "bg-neutral-600 ring-neutral-700/30 hover:bg-neutral-800/10 text-neutral-300"
            } w-full ring-1 flex gap-2 items-center rounded-md p-2 cursor-pointer capitalize`}
            onClick={handleRemovePinMessage}
          >
            <p>unpin</p>
          </button>
        </Menu.Item>
      </Menu.Items>
    </Menu>
  );
};

export default RemovePinMessage;
