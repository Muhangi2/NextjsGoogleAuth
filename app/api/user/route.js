import { connecttodb } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";
import { json } from "next/response";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function login(req, res) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    try {
      await connecttodb();
      const existinguser = await User.findOne({ email });
      if (!existinguser) {
        return res.status(404).json({ message: "user not found" });
      }
      const ispassworvalid = await bcrypt.compare(
        password,
        existinguser.password
      );
      if (!ispassworvalid) {
        return res.status(401).json({ message: "Invalid password" });
      }
    } catch (error) {
      console.log(error);
    }

    res.status(200).json({ message: "login successful" });
  }
}
export async function register(req, res) {
  if (req.method === "POST") {
    try {
      const { username, email, password } = req.body;
      const existinguser = await User.findOne({ email });
      if (existinguser) {
        res.status(401).json({ message: "user already exists" });
      }
      const hashpassword = await bcrypt.hash(password, 10);
      const newUser = await User({ username, email, password: hashpassword });
      await newUser.save();

      const token = jwt.sign({ userId: newUser._id }, "stringtoken", {
        expiresIn: "1hr",
      });

      return res
        .status(200)
        .json({ message: "User registerd successfully", token: token });
    } catch (err) {
      console.log({ message: err.message });
      return res.status(500).json({ message: "server error" });
    }
  } else {
    return res.status(405).end();
  }
}
