import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

type Params = { params: { id: string } }

export async function GET(
  request: NextRequest,
  context: Params
) {
  try {
    const song = await prisma.song.findUnique({
      where: { id: context.params.id },
      include: { artist: true, vibes: true },
    });

    if (!song) {
      return NextResponse.json({ error: "Song not found" }, { status: 404 });
    }

    return NextResponse.json(song, { status: 200 });
  } catch (error) {
    console.error("Error fetching song:", error);
    return NextResponse.json({ error: "Error fetching song" }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  context: Params
) {
  try {
    const body = await request.json();
    const updatedSong = await prisma.song.update({
      where: { id: context.params.id },
      data: {
        title: body.title,
        duration: body.duration,
        artist: body.artistId ? {
          connect: { id: body.artistId }
        } : undefined,
        vibes: body.vibeIds ? {
          set: body.vibeIds.map((id: string) => ({ id }))
        } : undefined
      },
      include: {
        artist: true,
        vibes: true,
      }
    });

    return NextResponse.json(updatedSong, { status: 200 });
  } catch (error) {
    console.error("Error updating song:", error);
    return NextResponse.json({ error: "Error updating song" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  context: Params
) {
  try {
    await prisma.song.delete({
      where: { id: context.params.id },
    });

    return NextResponse.json({ message: "Song deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting song:", error);
    return NextResponse.json({ error: "Error deleting song" }, { status: 500 });
  }
}