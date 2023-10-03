export const getChatName = (chatData, userId) => {
  if (chatData.type === "private") {
    const currentUserId = userId;
    const sender = chatData.members.find((member) => {
      return String(member.user._id) !== currentUserId;
    });

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

export const getConversationName = (chatData, sender) => {
  if (chatData.chat.type === "group") {
    const senderName = chatData.chat.members.find((member) => {
      return String(member.user._id) === sender;
    });

    if (senderName) {
      if (senderName.displayName === "") {
        return senderName.name;
      } else {
        return senderName.displayName;
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
  } else {
    return `https://api.dicebear.com/7.x/${chatData.chatImgType}/svg?seed=${chatData.chatImg}`;
  }
};
