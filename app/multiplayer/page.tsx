"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Users, Plus, LogIn, List, Signal, Globe, Hash } from "lucide-react";

const MultiplayerPage = () => {
  const [rooms, setRooms] = useState([
    {
      id: 1,
      name: "Speed Demons",
      players: 3,
      maxPlayers: 5,
      mode: "words",
      modeOption: "50",
    },
    {
      id: 2,
      name: "Casual Typers",
      players: 2,
      maxPlayers: 4,
      mode: "time",
      modeOption: "1",
    },
    {
      id: 3,
      name: "Pro League",
      players: 4,
      maxPlayers: 6,
      mode: "words",
      modeOption: "100",
    },
    {
      id: 4,
      name: "Marathon Typists",
      players: 2,
      maxPlayers: 8,
      mode: "time",
      modeOption: "5",
    },
    {
      id: 5,
      name: "Quick Sprints",
      players: 3,
      maxPlayers: 5,
      mode: "words",
      modeOption: "25",
    },
    {
      id: 6,
      name: "Endurance Challenge",
      players: 1,
      maxPlayers: 10,
      mode: "time",
      modeOption: "10",
    },
  ]);

  const [onlineUsers, setOnlineUsers] = useState(0);
  const [ping, setPing] = useState(0);

  useEffect(() => {
    setOnlineUsers(Math.floor(Math.random() * 1000) + 500);
    setPing(Math.floor(Math.random() * 50) + 10);

    const interval = setInterval(() => {
      setPing(Math.floor(Math.random() * 50) + 10);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

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
      className="min-h-screen bg-gradient-to-b from-neutral-900 to-neutral-950 text-gray-100"
    >
      <div className="w-full max-w-5xl mx-auto space-y-8 pb-16 px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row justify-between items-center pt-8 pb-4 border-b border-neutral-800"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-sky-400 bg-clip-text text-transparent mb-4 sm:mb-0">
            Multiplayer Arena
          </h1>
          <div className="flex items-center space-x-6">
            <div className="flex items-center text-emerald-400">
              <Globe className="w-5 h-5 mr-2" />
              <span className="font-semibold">{onlineUsers} online</span>
            </div>
            <div className="flex items-center text-sky-400">
              <Signal className="w-5 h-5 mr-2" />
              <span className="font-semibold">{ping} ms</span>
            </div>
            <div className="flex items-center text-violet-400">
              <Hash className="w-5 h-5 mr-2" />
              <span className="font-semibold">{rooms.length} rooms</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          <Card className="bg-neutral-800/50 border-neutral-700 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-2xl font-bold flex items-center space-x-2 text-emerald-400">
                <Plus className="w-6 h-6" />
                <span>Create Room</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <Input
                  type="text"
                  placeholder="Room Name"
                  className="bg-neutral-700/50 border-neutral-600 text-gray-100 placeholder-gray-400"
                />
                <div className="grid grid-cols-2 gap-4">
                  <Select>
                    <SelectTrigger className="bg-neutral-700/50 border-neutral-600 text-gray-100">
                      <SelectValue placeholder="Mode" />
                    </SelectTrigger>
                    <SelectContent className="bg-neutral-800 border-neutral-700">
                      <SelectItem value="words">Words</SelectItem>
                      <SelectItem value="time">Time</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger className="bg-neutral-700/50 border-neutral-600 text-gray-100">
                      <SelectValue placeholder="Mode Option" />
                    </SelectTrigger>
                    <SelectContent className="bg-neutral-800 border-neutral-700">
                      <SelectItem value="25">25 words</SelectItem>
                      <SelectItem value="50">50 words</SelectItem>
                      <SelectItem value="100">100 words</SelectItem>
                      <SelectItem value="1">1 minute</SelectItem>
                      <SelectItem value="3">3 minutes</SelectItem>
                      <SelectItem value="5">5 minutes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Input
                  type="number"
                  placeholder="Max Players"
                  className="bg-neutral-700/50 border-neutral-600 text-gray-100 placeholder-gray-400"
                />
                <Button className="w-full bg-gradient-to-r from-emerald-500 to-emerald-700 hover:from-emerald-600 hover:to-emerald-800 text-white font-semibold py-2 px-4 rounded-md transition-all duration-300">
                  <Plus className="w-5 h-5 mr-2" />
                  Create Room
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card className="bg-neutral-800/50 border-neutral-700 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-2xl font-bold flex items-center space-x-2 text-sky-400">
                <LogIn className="w-6 h-6" />
                <span>Join Room</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <Input
                  type="text"
                  placeholder="Room Code"
                  className="bg-neutral-700/50 border-neutral-600 text-gray-100 placeholder-gray-400"
                />
                <Button className="w-full bg-gradient-to-r from-sky-500 to-sky-700 hover:from-sky-600 hover:to-sky-800 text-white font-semibold py-2 px-4 rounded-md transition-all duration-300">
                  <LogIn className="w-5 h-5 mr-2" />
                  Join Room
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="bg-neutral-800/50 border-neutral-700 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-2xl font-bold flex items-center space-x-2 text-violet-400">
                <List className="w-6 h-6" />
                <span>Public Rooms</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-4">
                  {rooms.map((room) => (
                    <Card
                      key={room.id}
                      className="bg-neutral-700/50 border-neutral-600 hover:bg-neutral-700 transition-all duration-300"
                    >
                      <CardContent className="flex items-center justify-between p-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-100">
                            {room.name}
                          </h3>
                          <div className="flex items-center space-x-4 mt-2">
                            <p className="text-sm text-gray-300 flex items-center">
                              <Users className="w-4 h-4 mr-1" />
                              {room.players}/{room.maxPlayers}
                            </p>
                            <p className="text-sm text-emerald-400 flex items-center">
                              {room.mode === "words" ? (
                                <>
                                  <Hash className="w-4 h-4 mr-1" />
                                  {room.modeOption} words
                                </>
                              ) : (
                                <>
                                  <Signal className="w-4 h-4 mr-1" />
                                  {room.modeOption} min
                                </>
                              )}
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          className="bg-gradient-to-r from-violet-500 to-violet-700 hover:from-violet-600 hover:to-violet-800 text-white border-0 font-semibold py-2 px-4 rounded-md transition-all duration-300"
                        >
                          Join
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default MultiplayerPage;
