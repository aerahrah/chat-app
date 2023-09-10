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

export const sendPrivateChatMessage = async (req, res) => {
  try {
    const { receiverUserId, content } = req.body;
    const getUserId = req.user;
    let chat = await Chat.findOne({
      members: { $all: [getUserId, receiverUserId], $size: 2 },
      type: "private",
    });
    if (!chat) {
      return res.status(401).send({ message: "No chat available" });
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
