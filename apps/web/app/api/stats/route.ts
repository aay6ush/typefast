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
    console.error("Error fetching room: ", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};
