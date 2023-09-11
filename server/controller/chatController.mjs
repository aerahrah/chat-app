import { Chat, Message } from "../models/Chat.mjs";

export const createPrivateChat = async (req, res) => {
  try {
    const { receiverUserId } = req.body;
    const getUserId = req.user;
    let chat = await Chat.findOne({
      members: { $all: [getUserId, receiverUserId], $size: 2 },
      type: "private",
    });

    if (!chat) {
      chat = new Chat({
        name: "Private Chat",
        type: "private",
        members: [{ user: getUserId }, { user: receiverUserId }],
      });
      await chat.save();
    }

    res
      .status(201)
      .json({ message: "Private chat created successfully", chat });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating private chat" });
  }
};

export const createGroupChat = async (req, res) => {
  try {
    if (!chatName)
      return res
        .status(401)
        .send({ message: "Must include name of group chat" });

    const newGroupChat = new Chat({
      name: chatName,
      type: "group",
    });

    await newGroupChat.save();

    return res.status(200).send({ message: "Group chat created successfully" });
  } catch (err) {
    return res.status(500).send({ error: "Error creating group chat" });
  }
};
export const sendChatMessage = async (req, res) => {
  try {
    const chatId = req.params;
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
    console.error(error);
    res.status(500).json({ error: "Error sending private chat message" });
  }
};
