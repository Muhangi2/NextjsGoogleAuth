import mongoose from "mongoose";

export const connecttodb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("connected to the database");
  } catch (error) {
    console.log("error while connectimg to the database", error);
  }
};
