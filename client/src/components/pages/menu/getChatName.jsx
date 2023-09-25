export const getChatName = (chatData, userId) => {
  console.log(chatData);
  if (chatData.type === "private") {
    const currentUserId = userId;

    console.log(userId);
    const sender = chatData.members.find(
      (member) => String(member.user) !== currentUserId
    );
    console.log(sender);
    return sender ? sender.displayName : "Unknown";
  } else {
    return chatData.name;
  }
};
