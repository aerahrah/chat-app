import { BiSolidHappyAlt, BiSolidSend } from "react-icons/bi";
import { useQueryClient, useMutation } from "react-query";
import { sendMessage } from "../../services/chatAPI";
import { Popover } from "@headlessui/react";
import { useState } from "react";
import EmojiPicker from "emoji-picker-react";
import socket from "../../socket/socket";

const MessageComposer = ({ chatId, userId }) => {
  const sendMessageMutation = useMutation(sendMessage);
  const queryClient = useQueryClient();
  const [message, setMessage] = useState("");

  const handleSendMessage = async () => {
    if (message.trim() === "") {
      return;
    }
    try {
      const response = await sendMessageMutation.mutateAsync({
        chatId,
        content: message,
      });
      socket.emit("send message", chatId, userId, message);
      queryClient.invalidateQueries("getAllChat");
      setMessage("");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="border-neutral-300 border-t-[1px] dark:border-neutral-700 w-full max-w-[100%]  transition duration-[300ms]">
      <div className="text-neutral-700 dark:text-neutral-300 flex gap-2 p-2 ">
        <Popover className="relative">
          <Popover.Button className="bg-neutral-200/40 hover:bg-neutral-200 rounded-full dark:bg-neutral-700/10  dark:hover:bg-neutral-700/40 p-2 outline-0  transition duration-[300ms]">
            <BiSolidHappyAlt className="h-6 w-6" />
          </Popover.Button>

          <Popover.Panel>
            <div className="absolute bottom-10 z-30">
              <EmojiPicker
                onEmojiClick={(emoji) =>
                  setMessage((prevMessage) => prevMessage + emoji.emoji)
                }
                height={350}
                width={300}
                previewConfig={{ showPreview: false }}
              />
            </div>
          </Popover.Panel>
        </Popover>

        <input
          type="text"
          placeholder="Aa"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="bg-neutral-200/70 dark:bg-neutral-900/60 py-2 px-4 w-full outline-0 rounded-full transition duration-[300ms]"
        />
        <button
          className="bg-neutral-200/40 hover:bg-neutral-200 rounded-full dark:bg-neutral-700/10  dark:hover:bg-neutral-700/40 p-2 outline-0  transition duration-[300ms]"
          onClick={() => {
            handleSendMessage();
            setMessage("");
          }}
        >
          <BiSolidSend className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
};

export default MessageComposer;