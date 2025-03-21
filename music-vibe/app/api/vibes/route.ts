import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const vibes = await prisma.vibe.findMany({
      include: {
        songs: true,
      },
    });
    return NextResponse.json(vibes, { status: 200 });
  } catch (error) {
    console.error("Error fetching vibes:", error);
    return NextResponse.json(
      { error: "Error fetching vibes" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const vibe = await prisma.vibe.create({
      data: {
        name: body.name,
        description: body.description,
        color: body.color,
        songs: body.songIds
          ? {
              connect: body.songIds.map((id: string) => ({ id })),
            }
          : undefined,
      },
      include: {
        songs: true,
      },
    });
    return NextResponse.json(vibe, { status: 201 });
  } catch (error) {
    console.error("Error creating vibe:", error);
    return NextResponse.json({ error: "Error creating vibe" }, { status: 500 });
  }
}
