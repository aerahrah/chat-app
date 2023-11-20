import Users from "../models/user.mjs";
import { Chat } from "../models/Chat.mjs";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { getInitials } from "../utils/getInitials.mjs";
dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;
export const signup = async (req, res) => {
  try {
    const { email, username, password, firstName, lastName } = req.body;

    const userByEmail = await Users.findOne({ email });
    const userByUsername = await Users.findOne({ username });

    if (userByEmail) {
      return res.status(409).send({ message: "Email already exists" });
    }

    if (userByUsername) {
      return res.status(409).send({ message: "Username already exists" });
    }
    const userImg = getInitials(firstName);

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = Users({
      email: email,
      username: username,
      password: hashPassword,
      firstName: firstName,
      lastName: lastName,
      userProfileImg: userImg,
      userProfileImgType: "initials",
    });
    newUser.save();
    return res.status(200).send({ message: "User registered successfully" });
  } catch (err) {
    return res
      .status(500)
      .send({ message: "Internal server error", error: err });
  }
};

export const signin = async (req, res) => {
  try {
    const { identifier, password } = req.body;

    const userExist = await Users.findOne({
      $or: [{ username: identifier }, { email: identifier }],
    });

    if (!userExist) {
      return res.status(401).send({ message: "Invalid username or password" });
    }
    const isPasswordValid = await bcrypt.compare(password, userExist.password);
    if (!isPasswordValid) {
      return res.status(401).send({ message: "Invalid username or password" });
    }

    const token = jwt.sign({ id: userExist._id }, SECRET_KEY);
    return res.status(200).json({
      message: "Successfully signed in",
      token: token,
    });
  } catch (error) {
    return res.status(500).send({ message: "Internal server error" });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const getUserId = req.user;
    const userProfile = await Users.findById(getUserId);
    if (!userProfile) return res.status(401).send({ error: "User not found" });

    const userProfileFilteredData = {
      username: userProfile.username,
      email: userProfile.email,
      firstName: userProfile.firstName,
      lastName: userProfile.lastName,
      userImg: userProfile.userProfileImg,
      userImgType: userProfile.userProfileImgType,
    };
    return res.status(200).send(userProfileFilteredData);
  } catch (error) {
    return res.status(500).send({ message: "Cannot retrieve user" });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const { name } = req.query;
    if (!name) {
      return res.status(200).json([]);
    }

    const regex = new RegExp(name, "i");

    const users = await Users.find({
      $or: [{ username: regex }, { firstName: regex }, { lastName: regex }],
    });

    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).send({ message: "Cannot retrieve any user" });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const { username, email, firstName, lastName } = req.body;
    const userByEmail = await Users.findOne({ email });
    const userByUsername = await Users.findOne({ username });

    const getUserId = req.user;
    const user = await Users.findById(getUserId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (userByEmail && userByEmail._id.toString() !== getUserId) {
      return res.status(409).send({ message: "Email already exists" });
    }

    if (userByUsername && userByUsername._id.toString() !== getUserId) {
      return res.status(409).send({ message: "Username already exists" });
    }

    user.username = username || user.username;
    user.email = email || user.email;
    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;

    await user.save();

    await Chat.updateMany(
      { "members.user": getUserId },
      { $set: { "members.$.name": `${user.firstName} ${user.lastName}` } }
    );

    return res
      .status(200)
      .json({ message: "User profile updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateUserImage = async (req, res) => {
  try {
    const { userImg, userImgType } = req.body;

    const getUserId = req.user;
    const user = await Users.findById(getUserId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.userProfileImg = userImg || user.userProfileImg;
    user.userProfileImgType = userImgType || user.userProfileImgType;

    await user.save();
    return res.status(200).json({ message: "User image updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateUserPassword = async (req, res) => {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body;

    const getUserId = req.user;
    const user = await Users.findById(getUserId);

    if (!user) {
      return res.status(401).send({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isPasswordValid) {
      return res.status(401).send({ message: "Incorrect password" });
    }

    if (newPassword !== confirmPassword) {
      return res
        .status(401)
        .send({ message: "New password and confirm password must match" });
    }

    if (currentPassword === newPassword) {
      return res
        .status(401)
        .send({ message: "Current password should not match new password" });
    }

    const hashPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashPassword;

    await user.save();
    return res
      .status(200)
      .json({ message: "User password updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
