import { Chat, Message, PinMessage } from "../models/Chat.mjs";
import Users from "../models/user.mjs";
import { getInitials } from "../utils/getInitials.mjs";

export const getAllChat = async (req, res) => {
  try {
    const getUserId = req.user;
    const { chatName } = req.query;

    const baseQuery = { "members.user": getUserId };
    if (chatName && chatName.trim() !== "") {
      baseQuery.name = { $regex: chatName, $options: "i" };
    }

    const chats = await Chat.find(baseQuery)
      .populate("members.user", "userProfileImg userProfileImgType")
      .exec();

    return res.status(200).json({ chats: chats, userId: getUserId });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: "Error getting chats" });
  }
};

export const getConversation = async (req, res) => {
  try {
    const getUserId = req.user;
    const { chatId } = req.params;
    const chat = await Chat.findById(chatId)
      .populate("members.user", "userProfileImg userProfileImgType")
      .exec();

    if (!chat) return res.status(404).json({ error: "Chat not found" });

    return res.status(200).send({ chat: chat, userId: getUserId });
  } catch (error) {
    return res.status(500).send({ error: "Error getting chat conversation" });
  }
};
export const createPrivateChat = async (req, res) => {
  try {
    const { userNameId } = req.body;
    const getUserId = req.user;

    const isCurrentUserExist = await Users.findById(getUserId);
    if (!isCurrentUserExist) {
      return res.status(401).send({ message: "User not found" });
    }
    const isUsernameExist = await Users.findById(userNameId);
    if (!isUsernameExist) {
      return res.status(401).send({ message: "User not found" });
    }
    const imgName = `${getInitials(isUsernameExist.firstName)}`;

    let chat = await Chat.findOne({
      members: {
        $all: [
          { $elemMatch: { user: getUserId } },
          { $elemMatch: { user: userNameId } },
        ],
        $size: 2,
      },
      type: "private",
    });
    if (!chat) {
      chat = new Chat({
        name: `${isUsernameExist.firstName} ${isUsernameExist.lastName}`,
        type: "private",
        members: [
          {
            user: getUserId,
            name: `${isCurrentUserExist.firstName} ${isCurrentUserExist.lastName}`,
            displayName: "",
          },
          {
            user: userNameId,
            name: `${isUsernameExist.firstName} ${isUsernameExist.lastName}`,
            displayName: "",
          },
        ],
        chatImg: imgName,
        chatImgType: "initials",
      });
      await chat.save();
    }

    return res
      .status(201)
      .json({ message: "Private chat created successfully", chat });
  } catch (error) {
    res.status(500).json({ error: "Error creating private chat" });
    console.log(error);
  }
};

export const createGroupChat = async (req, res) => {
  try {
    const { chatName } = req.body;
    const getUserId = req.user;

    const isUsernameExist = await Users.findById(getUserId);
    if (!isUsernameExist)
      return res.status(401).send({ message: "User not found" });
    if (!chatName)
      return res
        .status(401)
        .send({ message: "Must include name of group chat" });

    const newGroupChat = new Chat({
      name: chatName,
      type: "group",
      members: [
        {
          user: getUserId,
          name: `${isUsernameExist.firstName} ${isUsernameExist.lastName}`,
          displayName: "",
        },
      ],
      chatImg: chatName,
      chatImgType: "initials",
    });

    await newGroupChat.save();
    return res.status(200).send({ message: "Group chat created successfully" });
  } catch (err) {
    return res.status(500).send({ error: "Error creating group chat" });
  }
};
export const createPinMessage = async (req, res) => {
  try {
    const { chatId } = req.params;
    const { pinMessageId } = req.body;
    const getUserId = req.user;

    if (!pinMessageId) {
      return res.status(401).send({ message: "message id is empty" });
    }

    let chat = await Chat.findById(chatId);
    if (!chat) {
      return res.status(401).send({ message: "Chat not found" });
    }

    const isAlreadyPinned = chat.pinMessages.some((data) =>
      data.pinMessage.equals(pinMessageId)
    );

    if (isAlreadyPinned) {
      return res
        .status(400)
        .json({ message: "Message is already pinned in the chat" });
    }

    const newPinMessage = new PinMessage({
      pinBy: getUserId,
      pinMessage: pinMessageId,
    });

    await newPinMessage.save();
    chat.pinMessages.push(newPinMessage);
    await chat.save();

    res.status(201).json({ message: "Pinned message successfully", chat });
  } catch (error) {
    res.status(500).json({ error: "Error pinning message" });
  }
};

export const removePinMessage = async (req, res) => {
  try {
    const { chatId } = req.params;
    const { pinMessageId } = req.body;

    console.log("remove", pinMessageId);
    const chat = await Chat.findOneAndUpdate(
      { _id: chatId },
      { $pull: { pinMessages: { _id: pinMessageId } } },
      { new: true }
    );

    if (!chat) {
      return res
        .status(404)
        .json({ error: "Chat not found or pin message not found" });
    }

    return res.status(200).json({
      message: "Pinned message successfully removed",
      chat,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error removing pinned message" });
  }
};

export const createChatMessage = async (req, res) => {
  try {
    const { chatId } = req.params;
    const { content } = req.body;
    const getUserId = req.user;

    if (!content) {
      return res.status(401).send({ message: "content must not be empty" });
    }

    let chat = await Chat.findById(chatId);
    if (!chat) {
      return res.status(401).send({ message: "Chat not found" });
    }

    const newMessage = new Message({
      sender: getUserId,
      content,
    });

    await newMessage.save();
    chat.messages.push(newMessage);
    await chat.save();

    res.status(201).json({ message: "Message sent successfully", chat });
  } catch (error) {
    res.status(500).json({ error: "Error sending private chat message" });
  }
};

export const addNewMember = async (req, res) => {
  try {
    const { chatId } = req.params;
    const { userNameId } = req.body;

    const chat = await Chat.findById(chatId);
    if (!chat) return res.status(401).send({ error: "Chat not found" });

    const newMember = await Users.findById(userNameId);

    if (!newMember) return res.status(401).send({ error: "User not found" });

    const isMember = chat.members.some((member) =>
      member.user.equals(newMember._id)
    );
    if (isMember)
      return res
        .status(401)
        .send({ error: "User is already in the group chat" });

    chat.members.push({
      user: newMember._id,
      name: `${newMember.firstName} ${newMember.lastName}`,
      displayName: "",
    });
    await chat.save();

    return res
      .status(200)
      .json({ message: "User added to the group chat successfully", chat });
  } catch (error) {
    return res.status(500).send({ error: "Error adding user" });
  }
};

export const removeChatMember = async (req, res) => {
  try {
    const { chatId } = req.params;
    const { memberId } = req.body;

    console.log(chatId, memberId);
    const chat = await Chat.findById(chatId);
    if (!chat) return res.status(401).send({ error: "Chat not found" });

    chat.members.pull(memberId);
    await chat.save();

    return res
      .status(200)
      .json({ message: "User removed from the group chat successfully", chat });
  } catch (error) {
    return res.status(500).send({ error: "Error removing user from the chat" });
  }
};

export const leaveGroupChat = async (req, res) => {
  try {
    const { chatId } = req.params;
    const userId = req.user;

    const chat = await Chat.findById(chatId);
    if (!chat) return res.status(404).json({ error: "Chat not found" });

    const updatedMembers = chat.members.filter(
      (member) => member.user._id.toString() !== userId.toString()
    );

    chat.members = updatedMembers;

    await chat.save();

    return res
      .status(200)
      .json({ message: "User left the group successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Error leaving group" });
  }
};

export const editChatMemberNickname = async (req, res) => {
  try {
    const { chatId } = req.params;
    const { memberId, nickname } = req.body;
    const chat = await Chat.findById(chatId);

    if (!chat) {
      return res.status(404).json({ error: "Chat not found" });
    }

    const member = chat.members.find(
      (member) => member._id.toString() === memberId
    );

    if (!member) {
      return res.status(404).json({ error: "Member not found in the chat" });
    }

    member.displayName = nickname;
    await chat.save();

    return res
      .status(200)
      .json({ message: "Successfully updated member nickname" });
  } catch (error) {
    return res.status(500).json({ error: "Error updating member's nickname" });
  }
};

export const editChatName = async (req, res) => {
  try {
    const { chatId } = req.params;
    const { chatName } = req.body;
    const chat = await Chat.findById(chatId);

    if (!chatName)
      return res.status(401).send({ message: "Chat name is empty" });

    if (chat.chatImgType === "initials") {
      chat.chatImg = getInitials(chatName);
    }

    chat.name = chatName;
    await chat.save();

    return res.status(200).json({ message: "Successfully updated chat name" });
  } catch (error) {
    return res.status(500).json({ error: "Error updating chat name" });
  }
};

export const editChatImage = async (req, res) => {
  try {
    const { chatId } = req.params;
    const { chatImg, chatImgType } = req.body;
    const chat = await Chat.findById(chatId);

    chat.chatImg = chatImg;
    chat.chatImgType = chatImgType;
    await chat.save();

    return res.status(200).json({ message: "Successfully updated chat image" });
  } catch (error) {
    return res.status(500).json({ error: "Error updating chat name" });
  }
};

export const editColorTheme = async (req, res) => {
  try {
    const { chatId } = req.params;
    const { colorTheme } = req.body;
    const chat = await Chat.findById(chatId);

    chat.colorTheme = colorTheme;
    await chat.save();

    return res
      .status(200)
      .json({ message: "Successfully updated color theme" });
  } catch (error) {
    return res.status(500).json({ error: "Error updating color theme" });
  }
};

export const editDefaultEmoji = async (req, res) => {
  try {
    const { chatId } = req.params;
    const { newEmoji } = req.body;

    const chat = await Chat.findById(chatId);

    if (!chat) {
      return res.status(401).json({ message: "chat not found" });
    }

    chat.defaultEmojis = newEmoji;
    await chat.save();

    return res.status(200).json({ message: "Successfully updated emoji" });
  } catch (error) {
    return res.status(500).json({ error: "Error updating emoji" });
  }
};
