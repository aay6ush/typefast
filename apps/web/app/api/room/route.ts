import { auth } from "@/auth";
import { roomSchema } from "@repo/common/schemas";
import { generateRoomCode } from "@/lib/utils";
import prisma from "@repo/db/client";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  try {
    const session = await auth();

    if (!session || !session?.user || !session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized: No valid session found" },
        { status: 401 }
      );
    }

    const data = await request.json();

    const validation = roomSchema.safeParse(data);
    if (!validation.success) {
      return NextResponse.json(validation.error.errors, { status: 400 });
    }

    const { name, mode, modeOption } = validation.data;

    const roomCode = generateRoomCode();

    const room = await prisma.room.create({
      data: {
        code: roomCode,
        name,
        mode,
        modeOption: Number(modeOption),
        userId: session?.user?.id,
      },
    });

    return NextResponse.json(room);
  } catch (error) {
    console.error("Error creating room: ", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};

export const GET = async () => {
  try {
    const rooms = await prisma.room.findMany({
      select: {
        id: true,
        code: true,
        name: true,
        mode: true,
        modeOption: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(rooms);
  } catch (error) {
    console.error("Error fetching public rooms: ", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};
