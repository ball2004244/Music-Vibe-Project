import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const songs = await prisma.song.findMany({
      include: {
        artist: true,
        vibes: true,
      },
    });
    return NextResponse.json(songs, { status: 200 });
  } catch (error) {
    console.error("Error fetching songs:", error);
    return NextResponse.json({ error: "Error fetching songs" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const song = await prisma.song.create({
      data: {
        title: body.title,
        duration: body.duration,
        artist: {
          connect: { id: body.artistId }
        },
        vibes: body.vibeIds ? {
          connect: body.vibeIds.map((id: string) => ({ id }))
        } : undefined
      },
      include: {
        artist: true,
        vibes: true,
      }
    });
    return NextResponse.json(song, { status: 201 });
  } catch (error) {
    console.error("Error creating song:", error);
    return NextResponse.json({ error: "Error creating song" }, { status: 500 });
  }
}