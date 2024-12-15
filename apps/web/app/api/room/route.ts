import { auth } from "@/auth";
import { roomSchema } from "@/lib/schemas";
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

    const { name, maxPlayers, mode, modeOption, isPublic } = validation.data;

    const roomCode = generateRoomCode();

    const room = await prisma.room.create({
      data: {
        code: roomCode,
        name,
        maxPlayers,
        mode,
        modeOption: Number(modeOption),
        isPublic,
        userId: session?.user?.id,
      },
    });

    return NextResponse.json(room);
  } catch (error) {
    console.log("Error creating room: ", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};

export const GET = async () => {
  try {
    const rooms = await prisma.room.findMany({
      where: { isPublic: true },
      select: {
        id: true,
        code: true,
        name: true,
        maxPlayers: true,
        mode: true,
        modeOption: true,
        isPublic: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(rooms);
  } catch (error) {
    console.log("Error fetching public rooms: ", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};
