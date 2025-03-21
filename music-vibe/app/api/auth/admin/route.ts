import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    if (!process.env.ADMIN_PWD || !process.env.ADMIN_USER) {
      console.error("ADMIN_PWD or ADMIN_USER environment variable not set");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    if (
      username === process.env.ADMIN_USER &&
      password === process.env.ADMIN_PWD
    ) {
      return NextResponse.json({ authenticated: true }, { status: 200 });
    }

    return NextResponse.json(
      { error: "Invalid username or password" },
      { status: 401 }
    );
  } catch (error) {
    console.error("Error in admin authentication:", error);
    return NextResponse.json(
      { error: "Authentication failed" },
      { status: 500 }
    );
  }
}
