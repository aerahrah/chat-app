import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: [true, "Email is already in use"],
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: [true, "Username is already in use"],
    minlength: [4, "Username must be at least 4 characters"],
  },
  password: {
    type: String,
    required: true,
    minlength: [8, "Password must be at least 4 characters"],
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  userProfileImg: {
    type: String,
    required: true,
  },
  userProfileImgType: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Users", UserSchema);
