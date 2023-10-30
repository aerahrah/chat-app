import Users from "../models/user.mjs";
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
    const { username, email, firstName, lastName, userImg, userImgType } =
      req.body;
    const getUserId = req.user;
    const user = await Users.findById(getUserId);
    if (userImgType === "initials") {
      userImg = getInitials(firstName);
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.username = username || user.username;
    user.email = email || user.email;
    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.userProfileImg = userImg || user.userProfileImg;
    user.userProfileImgType = userImgType || user.userProfileImgType;

    await user.save();
    return res
      .status(200)
      .json({ message: "User profile updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
