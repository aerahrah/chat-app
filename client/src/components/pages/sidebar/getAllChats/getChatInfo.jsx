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

export const getSpecificImg = (memberData) => {
  if (memberData) {
    return `https://api.dicebear.com/7.x/${memberData.user.userProfileImgType}/svg?seed=${memberData.user.userProfileImg}`;
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

export const getPinByImg = (chatData, userId) => {
  const pinBy = chatData.chat.members.find(
    (member) => String(member.user._id) === userId
  );
  if (pinBy) {
    return `https://api.dicebear.com/7.x/${pinBy.user.userProfileImgType}/svg?seed=${pinBy.user.userProfileImg}`;
  }
};

export const getPinByName = (chatData, userId) => {
  if (userId === chatData.userId) {
    return "You";
  }
  const pinBy = chatData.chat.members.find(
    (member) => String(member.user._id) === userId
  );
  if (pinBy) {
    if (pinBy.displayName === "") {
      return pinBy.name;
    } else {
      return pinBy.displayName;
    }
  } else {
    return "Unknown";
  }
};
