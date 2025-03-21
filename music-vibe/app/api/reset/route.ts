import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    // Delete all data in the correct order to respect foreign key constraints
    // First delete songs (which likely have relationships to artists and vibes)
    await prisma.song.deleteMany({});

    // Then delete artists and vibes
    await prisma.artist.deleteMany({});
    await prisma.vibe.deleteMany({});

    return NextResponse.json(
      { message: "Database reset successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error resetting database:", error);
    return NextResponse.json(
      { error: "Error resetting database" },
      { status: 500 }
    );
  }
}
