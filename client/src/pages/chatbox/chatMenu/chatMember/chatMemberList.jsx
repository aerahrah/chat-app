import ChatMemberItem from "./chatMemberItem";

const ChatMemberList = ({ chatData }) => {
  
  return (
    <div>
      {chatData.chat.members.map((memberData) => {
        return (
          <ChatMemberItem
            key={memberData._id}
            memberData={memberData}
            chatId={chatData.chat._id}
            userId={chatData.userId}
          />
        );
      })}
    </div>
  );
};

export default ChatMemberList;
