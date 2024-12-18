import prisma from "@repo/db/client";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const totalUsers = await prisma.user.count();
    const totalTests = await prisma.test.count();

    return NextResponse.json([
      { name: "Typist Registered", value: totalUsers },
      { name: "Races Completed", value: totalTests },
    ]);
  } catch (error) {
    console.log("Error fetching room: ", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};
