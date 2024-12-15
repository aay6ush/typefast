"use client";

import { useState, useEffect, useTransition } from "react";
import { motion } from "framer-motion";
import { Signal, Globe, Hash, List, Loader } from "lucide-react";
import CreateRoom from "@/components/multiplayer/create-room";
import JoinRoom from "@/components/multiplayer/join-room";
import PublicRooms from "@/components/multiplayer/public-rooms";
import { Room } from "@prisma/client";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";
import useWsStore from "@/store/useWsStore";

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

const MultiplayerPage = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [isPending, startTransition] = useTransition();
  const [onlinePlayers, setOnlinePlayers] = useState<number>(0);
  const [ping, setPing] = useState<number>(0);

  const { setWsRef } = useWsStore((state) => state);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch("/api/room");
        const data = await response.json();
        setRooms(data);
      } catch (error) {
        console.error("Error fetching public rooms:", error);
      }
    };

    startTransition(() => fetchRooms());

    const interval = setInterval(fetchRooms, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");
    setWsRef(ws);

    ws.onopen = () => {
      console.log("WebSocket connection established");
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed");
    };
  }, [setWsRef]);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen text-neutral-200"
    >
      <div className="w-full max-w-5xl mx-auto space-y-8 pb-16 px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row justify-between items-center pt-8 pb-4 border-b border-neutral-800"
        >
          <h1 className="text-3xl font-bold mb-4 sm:mb-0">Multiplayer Arena</h1>
          <div className="flex items-center space-x-6">
            <div className="flex items-center text-emerald-400">
              <Globe className="w-5 h-5 mr-2" />
              <span className="font-semibold">{onlinePlayers} online</span>
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
          <CreateRoom />

          <JoinRoom />
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="bg-neutral-900/50 border-neutral-800 text-neutral-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <List className="w-6 h-6 text-violet-400" />
                <span>Public Rooms</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isPending ? (
                <Loader className="animate-spin mx-auto size-10 text-yellow-400" />
              ) : (
                <PublicRooms rooms={rooms} />
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default MultiplayerPage;
