import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { type: "string", required: true },
  password: { type: "string", required: true },
});

export default mongoose.model("Users", UserSchema);
