"use server";

import { auth } from "@/auth";
import { prisma } from "@/prisma/db";
import { getUserByEmail } from "@/db/user";
import { Trophy, Target, Crown } from "lucide-react";
import {
  calculateLevelAndXP,
  calculateTotalTypingTime,
  getAllTimeBestScores,
  getRecentTests,
} from "@/lib/utils";

export async function getProfileData() {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      throw new Error("Unauthorized: No valid session found");
    }

    const user = await getUserByEmail(session.user.email);
    if (!user) {
      throw new Error("User not found");
    }

    const tests = await prisma.test.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
    });

    const testsCompleted = tests.length;
    const averageWpm = testsCompleted
      ? Math.round(
          tests.reduce((sum, test) => sum + test.wpm, 0) / testsCompleted
        )
      : 0;
    const averageAccuracy = testsCompleted
      ? Number(
          (
            tests.reduce((sum, test) => sum + test.accuracy, 0) / testsCompleted
          ).toFixed(1)
        )
      : 0;

    const { level, xp, xpToNextLevel } = calculateLevelAndXP(testsCompleted);

    const achievements = [
      {
        icon: Trophy,
        title: "Speed Demon",
        description: "Reach 100 WPM",
        achieved: averageWpm >= 100,
      },
      {
        icon: Target,
        title: "Perfectionist",
        description: "100% Accuracy",
        achieved: averageAccuracy === 100,
      },
      {
        icon: Crown,
        title: "Veteran",
        description: "Complete 1000 tests",
        achieved: testsCompleted >= 1000,
      },
    ];

    return {
      data: {
        name: user.name || "TypeMaster",
        image: user.image || "/placeholder.svg",
        level,
        xp,
        xpToNextLevel,
        stats: {
          averageWpm,
          averageAccuracy,
          testsCompleted,
          totalTimeTyping: calculateTotalTypingTime(tests),
        },
        allTimeBestScores: getAllTimeBestScores(tests),
        recentTests: getRecentTests(tests),
        achievements: achievements.filter((a) => a.achieved),
      },
    };
  } catch (err) {
    console.error("Error retrieving profile data:", err);
    throw err;
  }
}
