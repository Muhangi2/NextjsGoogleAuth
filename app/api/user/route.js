import { connecttodb } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { name, email } = await request.json();
  await connecttodb();
  await User.create({ name, email });
  return NextResponse.json({ message: "User registered" }, { status: 201 });
}
