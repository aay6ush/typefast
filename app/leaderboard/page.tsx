"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import { Trophy, ChevronDown, Activity } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Medal } from "lucide-react";
import { Clock } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { LeaderboardDataType } from "@/types";
import axios from "axios";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { modes } from "@/constants";

const Leaderboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAllTime, setIsAllTime] = useState(true);
  const [selectedMode, setSelectedMode] = useState("all");
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardDataType[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);
  const [countdown, setCountdown] = useState(30);

  const fetchLeaderboard = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      setCountdown(30);
      const timeFrame = isAllTime ? "alltime" : "daily";
      const { data } = await axios.get(
        `/api/leaderboard?mode=${selectedMode}&timeFrame=${timeFrame}&limit=10`,
        {
          headers: {
            "Cache-Control": "no-store",
          },
        }
      );

      if (Array.isArray(data.leaderboard)) {
        setLeaderboardData(data.leaderboard);
      } else {
        setLeaderboardData([]);
      }
    } catch (err) {
      console.error("Error fetching leaderboard:", err);
      setError("Failed to fetch leaderboard");
      setLeaderboardData([]);
    } finally {
      setIsLoading(false);
    }
  }, [isAllTime, selectedMode]);

  useEffect(() => {
    fetchLeaderboard();

    const countdownInterval = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 30));
    }, 1000);

    const fetchInterval = setInterval(() => {
      fetchLeaderboard();
    }, 30000);

    return () => {
      clearInterval(countdownInterval);
      clearInterval(fetchInterval);
    };
  }, [isAllTime, selectedMode, fetchLeaderboard]);

  const filteredData = leaderboardData.filter((entry) =>
    entry?.name?.toLowerCase().includes(searchTerm?.toLowerCase())
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full max-w-5xl mx-auto space-y-8 pb-8 px-4 sm:px-6 lg:px-8 mt-7"
    >
      <motion.div variants={itemVariants}>
        <Card className="bg-neutral-900/50 border-neutral-800 shadow-lg">
          <CardHeader className="pb-2">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0">
              <CardTitle className="text-2xl font-bold flex items-center space-x-2 text-gray-100">
                <Trophy className="w-6 h-6 text-yellow-400" />
                <span>Leaderboard</span>
                <Badge variant="secondary">Updates in {countdown}s</Badge>
              </CardTitle>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1 bg-neutral-800 rounded-md p-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`text-sm ${
                      isAllTime
                        ? "bg-neutral-700 text-neutral-200"
                        : "text-neutral-400"
                    }`}
                    onClick={() => setIsAllTime(true)}
                  >
                    <Activity />
                    All-Time
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`text-sm ${
                      !isAllTime
                        ? "bg-neutral-700 text-neutral-200"
                        : "text-neutral-400"
                    }`}
                    onClick={() => setIsAllTime(false)}
                  >
                    <Clock />
                    Daily
                  </Button>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="bg-neutral-800 border-neutral-700 text-neutral-200"
                    >
                      {selectedMode === "all"
                        ? "All Modes"
                        : selectedMode.charAt(0).toUpperCase() +
                          selectedMode.slice(1)}
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-neutral-800 border-neutral-700">
                    <DropdownMenuItem
                      className="text-neutral-400 min-w-full cursor-pointer"
                      onClick={() => setSelectedMode("all")}
                    >
                      All Modes
                    </DropdownMenuItem>
                    {modes.map((mode) => (
                      <DropdownMenuItem
                        key={mode}
                        className="text-neutral-400 min-w-full cursor-pointer"
                        onClick={() => setSelectedMode(mode)}
                      >
                        {mode.charAt(0).toUpperCase() + mode.slice(1)}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <Input
                type="text"
                placeholder="Search by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-neutral-800 border-neutral-700 text-gray-100"
              />
            </div>
            <div className="overflow-x-auto">
              {isLoading ? (
                <div className="flex justify-center items-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-400"></div>
                </div>
              ) : error ? (
                <div className="text-red-400 text-center py-8">{error}</div>
              ) : (
                <ScrollArea className="h-[300px] pr-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-gray-300">Rank</TableHead>
                        <TableHead className="text-gray-300">Name</TableHead>
                        <TableHead className="text-gray-300">WPM</TableHead>
                        <TableHead className="text-gray-300">
                          Accuracy
                        </TableHead>
                        <TableHead className="text-gray-300">Time</TableHead>
                        <TableHead className="text-gray-300">Mode</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredData.map((entry) => (
                        <TableRow
                          key={entry.rank}
                          className="hover:bg-neutral-800/50"
                        >
                          <TableCell className="font-medium text-gray-100">
                            {entry.rank <= 3 ? (
                              <Medal
                                className={`w-5 h-5 ${getMedalColor(
                                  entry.rank
                                )}`}
                              />
                            ) : (
                              entry.rank
                            )}
                          </TableCell>
                          <TableCell className="text-gray-100">
                            {entry.name}
                          </TableCell>
                          <TableCell className="text-sky-400">
                            {entry.wpm}
                          </TableCell>
                          <TableCell className="text-emerald-400">
                            {entry.accuracy}%
                          </TableCell>
                          <TableCell className="text-violet-400">
                            {entry.time}s
                          </TableCell>
                          <TableCell className="text-gray-300">
                            {entry.mode}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </ScrollArea>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={itemVariants} className="flex justify-center">
        <Link
          href="/type"
          className={cn(
            buttonVariants({ size: "lg" }),
            "bg-emerald-600 hover:bg-emerald-700 text-white"
          )}
        >
          <Clock className="w-5 h-5 mr-2" />
          Start New Test
        </Link>
      </motion.div>
    </motion.div>
  );
};

const getMedalColor = (rank: number) => {
  switch (rank) {
    case 1:
      return "text-yellow-400";
    case 2:
      return "text-gray-400";
    case 3:
      return "text-amber-600";
    default:
      return "text-gray-400";
  }
};

export default Leaderboard;
