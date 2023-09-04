import mongoose from "mongoose";

const connectDb = async (url) => {
  try {
    await mongoose.connect(url);
    console.log("Connected to database");
  } catch (err) {
    console.log(err);
  }
};

export default connectDb;
