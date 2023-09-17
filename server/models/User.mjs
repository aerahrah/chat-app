import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  username: { type: "string", required: true },
  password: { type: "string", required: true },
  firstName: { type: "string", required: true },
  lastName: { type: "string", required: true },
});

export default mongoose.model("Users", UserSchema);
