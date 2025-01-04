import prisma from "@repo/db/client";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  request: NextRequest,
  segmentData: { params: Promise<{ code: string }> }
) => {
  try {
    const { code } = await segmentData.params;

    const room = await prisma.room.findUnique({
      where: { code },
      select: {
        id: true,
        code: true,
        name: true,
        mode: true,
        modeOption: true,
      },
    });

    if (!room) {
      return NextResponse.json({ error: "Room not found" }, { status: 404 });
    }

    return NextResponse.json(room);
  } catch (error) {
    console.error("Error fetching room: ", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};
