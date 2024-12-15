"use client";

import { useEffect, useState, useCallback, use } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { Room as RoomType } from "@prisma/client";
import useWsStore from "@/store/useWsStore";
import { motion } from "framer-motion";
import { Member } from "@/types";
import Header from "@/components/multiplayer/header";
import Race from "@/components/multiplayer/race";
import Chat from "@/components/multiplayer/chat";
import Members from "@/components/multiplayer/members";
import { Loader } from "lucide-react";

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

const RoomPage = (props: { params: Promise<{ code: string }> }) => {
  const { code } = use(props.params);

  const [roomData, setRoomData] = useState<RoomType | null>(null);

  const { wsRef } = useWsStore((state) => state);

  const { data: session, status } = useSession();

  const [countdown, setCountdown] = useState<number | null>(null);
  const [isRaceActive, setIsRaceActive] = useState(false);
  const [isRaceStarted, setIsRaceStarted] = useState(false);
  const [members, setMembers] = useState<Member[]>([]);
  const [raceText, setRaceText] = useState<string>("");

  const connect = useCallback(() => {
    if (!session?.user || !wsRef) return;

    wsRef.send(
      JSON.stringify({
        type: "JOIN_ROOM",
        userId: session?.user?.id,
        roomCode: code,
        userData: {
          name: session?.user?.name,
          image: session?.user?.image,
        },
      })
    );

    wsRef.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    wsRef.onclose = () => {
      setTimeout(() => {
        if (document.visibilityState === "visible") {
          connect();
        }
      }, 3000);
    };
  }, [session?.user, code, wsRef]);

  useEffect(() => {
    const getRoomData = async () => {
      const response = await axios.get(`/api/room/${code}`);
      setRoomData(response.data);
    };

    if (code) {
      getRoomData();
    }
  }, [code]);

  useEffect(() => {
    if (status === "loading") return;
    if (!session?.user) return;

    connect();
  }, [session, status, connect]);

  useEffect(() => {
    if (!wsRef) return;

    wsRef.onmessage = (event) => {
      const data = JSON.parse(event.data);

      switch (data.type) {
        case "ROOM_MEMBERS":
          setMembers(data.members);
          break;

        case "PROGRESS_UPDATE":
          setMembers((prevMembers) => {
            const newMembers = prevMembers.map((member) =>
              member.id === data.userId
                ? { ...member, progress: data.progress }
                : member
            );
            return newMembers;
          });
          break;
      }
    };
  }, []);

  useEffect(() => {
    if (!wsRef) {
      return;
    }

    const handleMessage = (event: MessageEvent) => {
      const data = JSON.parse(event.data);

      switch (data.type) {
        case "RACE_STARTING":
          setIsRaceStarted(true);
          setRaceText(data.text);
          setCountdown(5);
          break;
        case "RACE_START":
          setIsRaceActive(true);
          setCountdown(null);
          break;
        case "PROGRESS_UPDATE":
          setMembers((prevMembers) => {
            return prevMembers.map((member) =>
              member.id === data.userId
                ? {
                    ...member,
                    progress: {
                      wpm: data.progress.wpm,
                      accuracy: data.progress.accuracy,
                      progress: data.progress.progress,
                    },
                  }
                : member
            );
          });
          break;
      }
    };

    wsRef.addEventListener("message", handleMessage);

    return () => {
      if (wsRef) {
        wsRef.removeEventListener("message", handleMessage);
      }
    };
  }, [wsRef]);

  useEffect(() => {
    if (countdown === null) {
      return;
    }

    if (countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          const next = prev !== null ? prev - 1 : null;
          return next;
        });
      }, 1000);

      return () => {
        clearInterval(timer);
      };
    }
  }, [countdown]);

  if (status === "loading") {
    return (
      <div className="h-screen grid place-items-center">
        <Loader className="animate-spin mx-auto size-10 text-yellow-400" />
      </div>
    );
  }

  const isHost = members.some(
    (member) => member.id === session?.user?.id && member.isHost
  );

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen"
    >
      <div className="w-full max-w-5xl mx-auto space-y-8 pb-16 px-4 sm:px-6 lg:px-8">
        <Header
          roomData={roomData}
          isHost={isHost}
          isRaceActive={isRaceActive}
          countdown={countdown}
        />

        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          {isRaceStarted ? (
            <Race
              members={members}
              isRaceActive={isRaceActive}
              roomData={roomData}
              countdown={countdown}
              raceText={raceText}
            />
          ) : (
            <>
              <Chat code={code} />
              <Members members={members} />
            </>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default RoomPage;
