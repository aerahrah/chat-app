import { Chat, Message } from "../models/Chat.mjs";
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

    const chats = await Chat.find(baseQuery).exec();

    return res.status(200).json(chats);
  } catch (error) {
    return res.status(500).send({ error: "Error getting chats" });
  }
};

export const getConversation = async (req, res) => {
  try {
    const { chatId } = req.params;
    const chat = await Chat.findById(chatId);

    if (!chat) return res.status(404).json({ error: "Chat not found" });

    return res.status(200).send(chat);
  } catch (error) {
    return res.status(500).send({ error: "Error getting chat conversation" });
  }
};
export const createPrivateChat = async (req, res) => {
  try {
    const { userNameId } = req.body;
    const getUserId = req.user;

    const isUsernameExist = await Users.findById(userNameId);
    if (!isUsernameExist) {
      return res.status(401).send({ error: "User not found" });
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
        members: [{ user: getUserId }, { user: userNameId }],
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
  }
};

export const createGroupChat = async (req, res) => {
  try {
    const { chatName } = req.body;
    const getUserId = req.user;
    if (!chatName)
      return res
        .status(401)
        .send({ message: "Must include name of group chat" });

    const newGroupChat = new Chat({
      name: chatName,
      type: "group",
      members: [{ user: getUserId, displayName: "Initial User" }],
      chatImg: chatName,
      chatImgType: "initials",
    });

    await newGroupChat.save();
    return res.status(200).send({ message: "Group chat created successfully" });
  } catch (err) {
    return res.status(500).send({ error: "Error creating group chat" });
  }
};
export const sendChatMessage = async (req, res) => {
  try {
    const { chatId } = req.params;
    const { content } = req.body;
    const getUserId = req.user;
    if (!content) {
      return res
        .status(401)
        .send({ message: "Must input text before sending" });
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
    const { username } = req.body;

    const chat = await Chat.findById(chatId);
    if (!chat) return res.status(401).send({ error: "chat not found" });

    const newMember = await Users.findOne(username);
    if (!newMember)
      return res.status(401).send({ error: "Username not found" });

    const isMember = chat.members.some((member) =>
      member.user.equals(newMember._id)
    );
    if (isMember)
      return res
        .status(401)
        .send({ error: "User is already in the group chat" });

    chat.members.push({ user: newMember._id, displayName: newMember.username });
    await chat.save();

    return res
      .status(200)
      .json({ message: "User added to the group chat successfully", chat });
  } catch (error) {
    return res.status(500).send({ error: "Error adding user" });
  }
};

export const leaveGroupChat = async (req, res) => {
  try {
    const { chatId } = req.params;
    const userId = req.user;

    const chat = await Chat.findById(chatId);
    if (!chat) return res.status(404).json({ error: "Chat not found" });

    chat.members.pull(userId);

    await chat.save();

    return res
      .status(200)
      .json({ message: "User left the group successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Error leaving group" });
  }
};
