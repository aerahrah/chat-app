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
    const userExist = await Users.findOne({ username });

    if (userExist) {
      return res.status(401).send({ message: "User already exists" });
    }
    const userImg = getInitials(firstName);
    console.log(firstName);
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
    console.log(identifier);
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
    console.log(name);
    const regex = new RegExp(name, "i");

    const users = await Users.find({
      $or: [{ username: regex }, { firstName: regex }, { lastName: regex }],
    });
    console.log(users);
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).send({ message: "Cannot retrieve any user" });
  }
};
