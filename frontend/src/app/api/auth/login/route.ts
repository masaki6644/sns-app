import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  console.log(process.env.JWT_SECRET)
  const { username, password } = await req.json();

  if (username === "admin6644" && password === "admin6644") {
    const accessToken = jwt.sign({ userId: 1 }, process.env.JWT_SECRET!, { expiresIn: "15m" });
    const refreshToken = jwt.sign({ userId: 1 }, process.env.JWT_SECRET!, { expiresIn: "7d" });

    const response = NextResponse.json({ message: "Logged in" });

    response.cookies.set({
      name: "access_token",
      value: accessToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    response.cookies.set({
      name: "refresh_token",
      value: refreshToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    return response;
  }

  return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
}
