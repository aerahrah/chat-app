import ChatMemberItem from "./chatMemberItem";
const ChatMemberList = ({ chatData }) => {
  return (
    <div>
      {chatData.chat.members.map((member) => {
        return (
          <ChatMemberItem
            key={member._id}
            member={member}
            chatId={chatData.chat._id}
          />
        );
      })}
    </div>
  );
};

export default ChatMemberList;
