import { connecttodb } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { name, email } = await request.json();
  await connecttodb();
  await User.create({ name, email });
  return NextResponse.json({ message: "User registered" }, { status: 201 });
}
export async function login(request) {
  if (request.method === "POST") {
    const { email, password } = await request.json();

    try {
      await connecttodb();
      const existinguser = await User.findOne({ email });
      if (!existinguser) {
        return res.status(404).json({ message: "user not found" });
      }
      if (!password !== User.password) {
        res.status(401).json({ message: "Invalid password" });
      }
    } catch (error) {
      console.log(error);
    }

    res.status(200).json({ message: "login successful" });
  }
}
export async function register(request) {
  if (request.method === "POST") {
    const { username, email, password } = request.body;
    const existinguser = await User.findOne({ email });
    if (existinguser) {
      res.status(401).json({ message: "user already exists" });
    }
  }
}
