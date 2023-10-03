import { BiSolidHappyAlt, BiSolidSend } from "react-icons/bi";
import EmojiPicker from "emoji-picker-react";
import { useMutation } from "react-query";
import { sendMessage } from "../../api/chatAPI";
import { Popover } from "@headlessui/react";
import { useState } from "react";

const MessageComposer = ({ chatId }) => {
  const sendMessageMutation = useMutation(sendMessage);
  const [message, setMessage] = useState("");

  const handleSendMessage = async () => {
    try {
      const response = await sendMessageMutation.mutateAsync({
        chatId,
        content: message,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="border-t-[1px] w-full max-w-[100%] flex gap-2 p-2">
      <Popover className="relative">
        <Popover.Button className="bg-neutral-200/40 hover:bg-neutral-200 rounded-full dark:bg-neutral-700/10 dark:hover:bg-neutral-700/40 p-2 transition duration-[300ms] outline-0">
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
        className="bg-neutral-200/70 py-2 px-4 w-full outline-0 rounded-full"
      />
      <button
        className="p-2 hover:bg-neutral-200 rounded-full"
        onClick={() => {
          handleSendMessage();
          setMessage("");
        }}
      >
        <BiSolidSend className="h-6 w-6" />
      </button>
    </div>
  );
};

export default MessageComposer;
