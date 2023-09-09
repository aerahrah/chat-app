import mongoose from "mongoose";

const memberSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  displayName: {
    type: String,
    required: true,
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
  },
  { timestamps: true }
);
export default mongoose.model("Chat", chatSchema);
