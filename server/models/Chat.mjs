import mongoose from "mongoose";

const memberSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
  name: {
    type: String,
    required: true,
  },
  displayName: {
    type: String,
  },
});

const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const pinMessageSchema = new mongoose.Schema(
  {
    pinBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    pinMessage: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const chatSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["private", "group"],
      default: "private",
    },
    members: [memberSchema],
    messages: [messageSchema],
    chatImg: {
      type: String,
      required: true,
    },
    chatImgType: {
      type: String,
      required: true,
    },
    pinMessages: [pinMessageSchema],
    colorTheme: {
      type: String,
      enum: [
        "black",
        "gray",
        "red",
        "orange",
        "amber",
        "yellow",
        "lime",
        "green",
        "emerald",
        "teal",
        "cyan",
        "sky",
        "blue",
        "indigo",
        "violet",
        "purple",
        "fuchsia",
        "rose",
      ],
      default: "blue",
    },
    defaultEmojis: {
      type: String,
      default: "like",
    },
  },
  { timestamps: true }
);

const Chat = mongoose.model("Chat", chatSchema);
const Message = mongoose.model("Message", messageSchema);
const PinMessage = mongoose.model("PinMessage", pinMessageSchema);

export { Chat, Message, PinMessage };
