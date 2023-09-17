import Users from "../models/user.mjs";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;
export const signup = async (req, res) => {
  try {
    const { email, username, password, firstName, lastName } = req.body;
    const userExist = await Users.findOne({ username });

    if (userExist) {
      return res.status(401).send({ message: "User already exists" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = Users({
      email: email,
      username: username,
      password: hashPassword,
      firstName: firstName,
      lastName: lastName,
    });
    newUser.save();
    return res.status(200).send({ message: "User registered successfully" });
  } catch (err) {
    return res.status(500).send({ message: "Internal server error" });
  }
};

export const signin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const userExist = await Users.findOne({ username });
    if (!userExist) {
      return res.status(401).send({ message: "Invalid username or password" });
    }
    const isPasswordValid = await bcrypt.compare(password, userExist.password);
    if (!isPasswordValid) {
      return res.status(401).send({ message: "Invalid username or password" });
    }

    const token = jwt.sign({ id: userExist._id }, SECRET_KEY);
    return res.status(200).json({ message: "Successfully signed in", token });
  } catch (error) {
    return res.status(500).send({ message: "Internal server error" });
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

    const users = await Users.find({ username: regex });

    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).send({ message: "Cannot retrieve any user" });
  }
};
