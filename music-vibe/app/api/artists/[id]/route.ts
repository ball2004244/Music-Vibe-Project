import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const artist = await prisma.artist.findUnique({
      where: { id: params.id },
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
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const updatedArtist = await prisma.artist.update({
      where: { id: params.id },
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
  { params }: { params: { id: string } }
) {
  try {
    await prisma.artist.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: "Artist deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting artist:", error);
    return NextResponse.json({ error: "Error deleting artist" }, { status: 500 });
  }
}