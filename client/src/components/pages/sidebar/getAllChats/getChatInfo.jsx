export const getChatName = (chatData, userId) => {
  console.log(chatData);
  if (chatData.type === "private") {
    const currentUserId = userId;
    console.log(userId);
    const sender = chatData.members.find(
      (member) => String(member.user._id) !== currentUserId
    );
    console.log(sender);
    if (sender) {
      if (sender.displayName === "") {
        return sender.name;
      } else {
        return sender.displayName;
      }
    } else {
      return "Unknown";
    }
  } else {
    return chatData.name;
  }
};

export const getChatImg = (chatData, userId) => {
  if (chatData.type === "private") {
    const currentUserId = userId;

    const sender = chatData.members.find(
      (member) => String(member.user._id) !== currentUserId
    );
    if (sender) {
      return `https://api.dicebear.com/7.x/${sender.user.userProfileImgType}/svg?seed=${sender.user.userProfileImg}`;
    }
  }
};
