import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const artists = await prisma.artist.findMany({
      include: {
        songs: true,
      },
    });
    return NextResponse.json(artists, { status: 200 });
  } catch (error) {
    console.error("Error fetching artists:", error);
    return NextResponse.json({ error: "Error fetching artists" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const artist = await prisma.artist.create({
      data: {
        name: body.name,
        imageUrl: body.imageUrl,
      },
    });
    return NextResponse.json(artist, { status: 201 });
  } catch (error) {
    console.error("Error creating artist:", error);
    return NextResponse.json({ error: "Error creating artist" }, { status: 500 });
  }
}