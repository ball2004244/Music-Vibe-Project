import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

type Params = { params: { id: string } }

export async function GET(
  request: NextRequest,
  context: Params
) {
  try {
    const vibe = await prisma.vibe.findUnique({
      where: { id: context.params.id },
      include: { songs: true },
    });

    if (!vibe) {
      return NextResponse.json({ error: "Vibe not found" }, { status: 404 });
    }

    return NextResponse.json(vibe, { status: 200 });
  } catch (error) {
    console.error("Error fetching vibe:", error);
    return NextResponse.json({ error: "Error fetching vibe" }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  context: Params
) {
  try {
    const body = await request.json();
    const updatedVibe = await prisma.vibe.update({
      where: { id: context.params.id },
      data: {
        name: body.name,
        description: body.description,
        color: body.color,
        songs: body.songIds ? {
          set: body.songIds.map((id: string) => ({ id }))
        } : undefined
      },
      include: {
        songs: true,
      }
    });

    return NextResponse.json(updatedVibe, { status: 200 });
  } catch (error) {
    console.error("Error updating vibe:", error);
    return NextResponse.json({ error: "Error updating vibe" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  context: Params
) {
  try {
    await prisma.vibe.delete({
      where: { id: context.params.id },
    });

    return NextResponse.json({ message: "Vibe deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting vibe:", error);
    return NextResponse.json({ error: "Error deleting vibe" }, { status: 500 });
  }
}