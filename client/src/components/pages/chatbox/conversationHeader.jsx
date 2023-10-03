import { getChatName, getChatImg } from "../sidebar/getAllChats/getChatInfo";

const ConversationHeader = ({ chatData }) => {
  return (
    <header className="p-4 border-b-[1px]  flex items-center gap-2">
      <img
        src={getChatImg(chatData.chat, chatData.userId)}
        alt="avatar"
        className="h-10 w-10 rounded-full"
      />
      <h1>{getChatName(chatData.chat, chatData.userId)}</h1>
    </header>
  );
};

export default ConversationHeader;
