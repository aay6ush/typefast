"use client";

import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";
import { Button } from "@repo/ui/components/ui/button";
import {
  ChevronDown,
  Activity,
  LoaderPinwheel,
  CrownIcon,
  Hourglass,
  ArrowRight,
} from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { Input } from "@repo/ui/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/ui/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@repo/ui/components/ui/dropdown-menu";
import { Medal } from "lucide-react";
import { ScrollArea } from "@repo/ui/components/ui/scroll-area";
import { Badge } from "@repo/ui/components/ui/badge";
import { LeaderboardDataType } from "@repo/common/types";
import Link from "next/link";
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
      const response = await fetch(
        `/api/leaderboard?mode=${selectedMode}&timeFrame=${timeFrame}&limit=10`,
        {
          headers: {
            "Cache-Control": "no-store",
          },
        }
      );
      const data = await response.json();

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
            <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
              <CardTitle className="text-xl sm:text-2xl flex items-center space-x-3 text-neutral-200">
                <CrownIcon className="size-6 sm:size-8 text-yellow-400" />
                <span>Leaderboard</span>
                <Badge variant="secondary" className="text-xs sm:text-sm">
                  Updates in {countdown}s
                </Badge>
              </CardTitle>
              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                <div className="w-full flex items-center space-x-1 bg-neutral-800 rounded-md p-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`w-full text-xs sm:text-sm ${
                      isAllTime
                        ? "bg-neutral-700 text-neutral-200"
                        : "text-neutral-400"
                    }`}
                    onClick={() => setIsAllTime(true)}
                  >
                    <Activity className="size-3 sm:size-4 mr-1" />
                    All-Time
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`w-full text-xs sm:text-sm ${
                      !isAllTime
                        ? "bg-neutral-700 text-neutral-200"
                        : "text-neutral-400"
                    }`}
                    onClick={() => setIsAllTime(false)}
                  >
                    <Hourglass className="size-3 sm:size-4 mr-1" />
                    Daily
                  </Button>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="bg-neutral-800 border-neutral-700 text-neutral-200 text-xs sm:text-sm w-full sm:w-auto"
                    >
                      {selectedMode === "all"
                        ? "All Modes"
                        : selectedMode.charAt(0).toUpperCase() +
                          selectedMode.slice(1)}
                      <ChevronDown className="ml-2 size-3 sm:size-4" />
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
                className="bg-neutral-800 border-neutral-700 text-gray-100 w-full"
              />
            </div>
            <div className="overflow-x-auto">
              {isLoading ? (
                <LoaderPinwheel className="animate-spin mx-auto size-10 text-yellow-400" />
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
                        <TableHead className="text-gray-300 hidden sm:table-cell">
                          Accuracy
                        </TableHead>
                        <TableHead className="text-gray-300 hidden md:table-cell">
                          Time
                        </TableHead>
                        <TableHead className="text-gray-300 hidden lg:table-cell">
                          Mode
                        </TableHead>
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
                                className={`size-4 sm:size-5 ${getMedalColor(
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
                          <TableCell className="text-emerald-400 hidden sm:table-cell">
                            {entry.accuracy}%
                          </TableCell>
                          <TableCell className="text-violet-400 hidden md:table-cell">
                            {entry.time}s
                          </TableCell>
                          <TableCell className="text-gray-300 hidden lg:table-cell">
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
        <Button size="lg" asChild className="w-full sm:w-auto">
          <Link href="/type">
            Start New Race
            <ArrowRight className="ml-2" />
          </Link>
        </Button>
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
