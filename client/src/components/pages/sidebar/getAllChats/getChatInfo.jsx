export const getChatName = (chatData, userId) => {
  if (chatData.type === "private") {
    const currentUserId = userId;
    console.log(chatData);
    const sender = chatData.members.find((member) => {
      console.log("Member user ID:", member.user._id);
      console.log("Current User ID:", currentUserId);
      return String(member.user._id) !== currentUserId;
    });

    // console.log(currentUserId);
    // console.log(sender);
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
    console.log(chatData);
    const sender = chatData.members.find(
      (member) => String(member.user._id) !== currentUserId
    );
    if (sender) {
      return `https://api.dicebear.com/7.x/${sender.user.userProfileImgType}/svg?seed=${sender.user.userProfileImg}`;
    }
  } else {
    console.log(chatData);
    return `https://api.dicebear.com/7.x/${chatData.chatImgType}/svg?seed=${chatData.chatImg}`;
  }
};
