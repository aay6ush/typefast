"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trophy, ChevronDown } from "lucide-react";
import { useState } from "react";
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
import { Clock, Search } from "lucide-react";

// Mock data for the leaderboard
const leaderboardData = [
  {
    rank: 1,
    name: "SpeedDemon",
    wpm: 120,
    accuracy: 98.5,
    time: 60,
    mode: "words",
  },
  {
    rank: 2,
    name: "TypeMaster",
    wpm: 115,
    accuracy: 97.8,
    time: 60,
    mode: "time",
  },
  {
    rank: 3,
    name: "KeyboardWarrior",
    wpm: 110,
    accuracy: 99.0,
    time: 60,
    mode: "words",
  },
  {
    rank: 4,
    name: "SwiftFingers",
    wpm: 108,
    accuracy: 96.5,
    time: 60,
    mode: "quote",
  },
  {
    rank: 5,
    name: "WordNinja",
    wpm: 105,
    accuracy: 98.2,
    time: 60,
    mode: "time",
  },
  // Add more mock data as needed
];

const Leaderboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAllTime, setIsAllTime] = useState(true);
  const [selectedMode, setSelectedMode] = useState("all");

  const filteredData = leaderboardData.filter(
    (entry) =>
      entry.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedMode === "all" || entry.mode === selectedMode)
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
      className="w-full max-w-5xl mx-auto space-y-8 pb-8 px-4 sm:px-6 lg:px-8 mt-10"
    >
      <motion.div variants={itemVariants}>
        <Card className="bg-neutral-900/50 border-neutral-800 shadow-lg">
          <CardHeader className="pb-2">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0">
              <CardTitle className="text-2xl font-bold flex items-center space-x-2 text-gray-100">
                <Trophy className="w-6 h-6 text-yellow-400" />
                <span>TypeFast Leaderboard</span>
              </CardTitle>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 bg-neutral-800 rounded-md p-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`text-sm ${
                      isAllTime
                        ? "bg-neutral-700 text-gray-100"
                        : "text-gray-400"
                    }`}
                    onClick={() => setIsAllTime(true)}
                  >
                    All-Time
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`text-sm ${
                      !isAllTime
                        ? "bg-neutral-700 text-gray-100"
                        : "text-gray-400"
                    }`}
                    onClick={() => setIsAllTime(false)}
                  >
                    Daily
                  </Button>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="bg-neutral-800 border-neutral-700 text-gray-100"
                    >
                      {selectedMode === "all"
                        ? "All Modes"
                        : selectedMode.charAt(0).toUpperCase() +
                          selectedMode.slice(1)}
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-neutral-800 border-neutral-700">
                    <DropdownMenuItem onClick={() => setSelectedMode("all")}>
                      All Modes
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSelectedMode("words")}>
                      Words
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSelectedMode("time")}>
                      Time
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSelectedMode("quote")}>
                      Quote
                    </DropdownMenuItem>
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
                icon={<Search className="w-4 h-4 text-gray-400" />}
              />
            </div>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-gray-300">Rank</TableHead>
                    <TableHead className="text-gray-300">Name</TableHead>
                    <TableHead className="text-gray-300">WPM</TableHead>
                    <TableHead className="text-gray-300">Accuracy</TableHead>
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
                            className={`w-5 h-5 ${getMedalColor(entry.rank)}`}
                          />
                        ) : (
                          entry.rank
                        )}
                      </TableCell>
                      <TableCell className="text-gray-100">
                        {entry.name}
                      </TableCell>
                      <TableCell className="text-emerald-400">
                        {entry.wpm}
                      </TableCell>
                      <TableCell className="text-sky-400">
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
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={itemVariants} className="flex justify-center">
        <Button
          className="flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white"
          size="lg"
        >
          <Clock className="w-5 h-5 mr-2" />
          <span>Start New Test</span>
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
