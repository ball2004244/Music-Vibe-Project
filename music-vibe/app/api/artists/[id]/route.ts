import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

type Params = { params: { id: string } }

export async function GET(
  request: NextRequest,
  context: Params
) {
  try {
    const artist = await prisma.artist.findUnique({
      where: { id: context.params.id },
      include: { songs: true },
    });

    if (!artist) {
      return NextResponse.json({ error: "Artist not found" }, { status: 404 });
    }

    return NextResponse.json(artist, { status: 200 });
  } catch (error) {
    console.error("Error fetching artist:", error);
    return NextResponse.json({ error: "Error fetching artist" }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  context: Params
) {
  try {
    const body = await request.json();
    const updatedArtist = await prisma.artist.update({
      where: { id: context.params.id },
      data: {
        name: body.name,
        imageUrl: body.imageUrl,
      },
    });

    return NextResponse.json(updatedArtist, { status: 200 });
  } catch (error) {
    console.error("Error updating artist:", error);
    return NextResponse.json({ error: "Error updating artist" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  context: Params
) {
  try {
    await prisma.artist.delete({
      where: { id: context.params.id },
    });

    return NextResponse.json({ message: "Artist deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting artist:", error);
    return NextResponse.json({ error: "Error deleting artist" }, { status: 500 });
  }
}