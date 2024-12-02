import { NextRequest, NextResponse } from "next/server";
import redis from "@/lib/redis";
import { auth } from "@/auth";

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
    const scores = await redis.zrevrange(
      leaderboardKey,
      0,
      limit - 1,
      "WITHSCORES"
    );

    const leaderboard = [];
    for (let i = 0; i < scores.length; i += 2) {
      const userData = JSON.parse(scores[i]);

      if (mode === "all" || userData.mode === mode) {
        leaderboard.push({
          rank: Math.floor(i / 2) + 1,
          name: userData.name,
          wpm: userData.wpm,
          accuracy: userData.accuracy,
          time: userData.time,
          mode: userData.mode,
        });
      }
    }

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
