"use client";

import { useEffect, useState, use, useCallback } from "react";
import { useSession } from "next-auth/react";
import { Room as RoomType } from "@prisma/client";
import { motion } from "framer-motion";
import { Member } from "@repo/common/types";
import Header from "@/components/multiplayer/header";
import Race from "@/components/multiplayer/race";
import Chat from "@/components/multiplayer/chat";
import Members from "@/components/multiplayer/members";
import { LoaderPinwheel } from "lucide-react";
import useSocket from "@/hooks/useSocket";

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

  const { data: session, status } = useSession();

  const [roomData, setRoomData] = useState<RoomType | null>(null);
  const [isRaceStarted, setIsRaceStarted] = useState(false);
  const [members, setMembers] = useState<Member[]>([]);
  const [raceText, setRaceText] = useState<string>("");

  const socket = useSocket();

  useEffect(() => {
    const getRoomData = async () => {
      const response = await fetch(`/api/room/${code}`);
      const data = await response.json();
      setRoomData(data);
    };

    if (code) {
      getRoomData();
    }
  }, [code]);

  const joinRoom = useCallback(() => {
    if (status === "loading") return;
    if (!session?.user || !socket) return;

    socket.send(
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

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      switch (data.type) {
        case "ROOM_MEMBERS":
          setMembers(data.members);
          break;

        case "RACE_START":
          setIsRaceStarted(true);
          setRaceText(data.text);
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
  }, [code, socket, status, isRaceStarted]);

  useEffect(() => {
    joinRoom();
  }, [joinRoom]);

  if (status === "loading") {
    return (
      <div className="h-screen grid place-items-center">
        <LoaderPinwheel className="animate-spin mx-auto size-10 text-yellow-400" />
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
          isRaceStarted={isRaceStarted}
        />

        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          {isRaceStarted ? (
            <Race
              members={members}
              isRaceStarted={isRaceStarted}
              setIsRaceStarted={setIsRaceStarted}
              roomData={roomData}
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
