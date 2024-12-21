"use server";

import { auth } from "@/auth";
import { getUserByEmail } from "@/db/user";
import prisma from "@repo/db/client";
import { AddTestTypes } from "@repo/common/types";

export const addTest = async ({
  wpm,
  accuracy,
  time,
  mode,
  modeOption,
}: AddTestTypes) => {
  try {
    if (!wpm || !accuracy || !time || !mode || !modeOption) {
      throw new Error("Missing required parameters");
    }

    const session = await auth();

    if (!session?.user?.email) {
      throw new Error("Unauthorized: No valid session found");
    }

    const user = await getUserByEmail(session.user.email);

    if (!user) {
      throw new Error("User not found");
    }

    return await prisma.test.create({
      data: {
        wpm: Math.round(wpm),
        accuracy: Number(accuracy),
        time: Math.round(time),
        mode,
        modeOption,
        userId: user.id,
      },
    });
  } catch (err) {
    console.error("Error in adding test to db:", err);
    throw err;
  }
};
