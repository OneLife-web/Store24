import { hashPassword } from "@/lib/auth"; // Utility for hashing passwords
import { User } from "@/utils/models/User";
import { connectToDb } from "@/utils/config/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { email, password, name } = await request.json();
  console.log(email, password, name);

  if (!email || !password || !name) {
    return NextResponse.json(
      { message: "Missing required fields." },
      { status: 400 }
    );
  }

  await connectToDb(); // Ensure only one call to connectToDb

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return NextResponse.json(
      { message: "User already exists." },
      { status: 422 }
    );
  }

  try {
    const hashedPassword = await hashPassword(password);
    const newUser = new User({
      email,
      name,
      password: hashedPassword,
    });
    await newUser.save();

    return NextResponse.json({
      data: newUser,
      message: "User created successfully!",
      status: 200,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({ error: "Error creating user" }, { status: 500 });
  }
}
