import { NextRequest, NextResponse } from "next/server";
import redis from "@/lib/redis";
import { auth } from "@/auth";
import { LeaderboardDataType, LeaderboardEntry } from "@repo/common/types";

const ALL_TIME_LEADERBOARD = "typefast:leaderboard:alltime";
const DAILY_LEADERBOARD = "typefast:leaderboard:daily";

export const GET = async (request: NextRequest) => {
  const { searchParams } = new URL(request.url);
  const mode = searchParams.get("mode") || "all";
  const timeFrame = searchParams.get("timeFrame") || "alltime";
  const limit = parseInt(searchParams.get("limit") || "10");

  const leaderboardKey =
    timeFrame === "daily" ? DAILY_LEADERBOARD : ALL_TIME_LEADERBOARD;

  try {
    const scores = await redis.zrevrange(leaderboardKey, 0, -1, "WITHSCORES");

    const userHighestScores = new Map<string, LeaderboardDataType>();

    for (let i = 0; i < scores.length; i += 2) {
      const userData = JSON.parse(scores[i]!) as LeaderboardEntry;

      if (mode === "all" || userData.mode === mode) {
        if (!userHighestScores.has(userData.name)) {
          userHighestScores.set(userData.name, {
            rank: 0,
            name: userData.name,
            wpm: userData.wpm,
            accuracy: userData.accuracy,
            time: userData.time,
            mode: userData.mode,
          });
        }
      }
    }

    const leaderboard = Array.from(userHighestScores.values())
      .slice(0, limit)
      .map((entry, index) => ({
        ...entry,
        rank: index + 1,
      }));

    return NextResponse.json({ leaderboard });
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    return NextResponse.json(
      { error: "Failed to fetch leaderboard" },
      { status: 500 }
    );
  }
};

export const POST = async (request: NextRequest) => {
  try {
    const { wpm, accuracy, time, mode } = await request.json();

    if (!wpm || !accuracy || !time || !mode) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const session = await auth();

    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized: No valid session found" },
        { status: 401 }
      );
    }

    const score = Math.round(wpm * (accuracy / 100));

    const userData = JSON.stringify({
      name: session.user.name,
      wpm,
      accuracy,
      time,
      mode,
      timestamp: Date.now(),
    });

    const allTimeScores = await redis.zrange(
      ALL_TIME_LEADERBOARD,
      0,
      -1,
      "WITHSCORES"
    );
    const dailyScores = await redis.zrange(
      DAILY_LEADERBOARD,
      0,
      -1,
      "WITHSCORES"
    );

    for (let i = 0; i < allTimeScores.length; i += 2) {
      const entry = JSON.parse(allTimeScores[i]!) as LeaderboardEntry;
      if (entry.name === session.user.name) {
        await redis.zrem(ALL_TIME_LEADERBOARD, allTimeScores[i]!);
      }
    }

    for (let i = 0; i < dailyScores.length; i += 2) {
      const entry = JSON.parse(dailyScores[i]!) as LeaderboardEntry;
      if (entry.name === session.user.name) {
        await redis.zrem(DAILY_LEADERBOARD, dailyScores[i]!);
      }
    }

    await Promise.all([
      redis.zadd(ALL_TIME_LEADERBOARD, score, userData),
      redis.zadd(DAILY_LEADERBOARD, score, userData),
    ]);

    const midnight = new Date();
    midnight.setHours(24, 0, 0, 0);
    const secondsUntilMidnight = Math.floor(
      (midnight.getTime() - Date.now()) / 1000
    );
    await redis.expire(DAILY_LEADERBOARD, secondsUntilMidnight);

    return NextResponse.json({ success: true, score });
  } catch (error) {
    console.error("Error updating leaderboard:", error);
    return NextResponse.json(
      { error: "Failed to update leaderboard" },
      { status: 500 }
    );
  }
};
