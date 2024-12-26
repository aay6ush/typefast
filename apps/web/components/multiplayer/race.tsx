import { useCallback, useEffect } from "react";
import { Card, CardContent } from "@repo/ui/components/ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@repo/ui/components/ui/avatar";
import Interface from "@/components/multiplayer/interface";
import useWsStore from "@/store/useWsStore";
import { useSession } from "next-auth/react";
import { MemberProgressProps, RaceProps } from "@repo/common/types";

const Race = ({
  members,
  isRaceStarted,
  setIsRaceStarted,
  roomData,
  raceText,
}: RaceProps) => {
  const { wsRef } = useWsStore((state) => state);
  const { data: session } = useSession();

  useEffect(() => {
    let isAllTypistFinished = false;

    if (members.length > 0) {
      isAllTypistFinished = members.every(
        (member) => member.progress?.progress === 100
      );
    }

    if (isAllTypistFinished) {
      setTimeout(() => {
        setIsRaceStarted(false);
      }, 5000);
    }
  }, [members]);

  const handleProgressUpdate = useCallback(
    (wpm: number, accuracy: number, progress: number) => {
      if (!roomData?.code || !session?.user?.id) return;

      if (isRaceStarted && wsRef?.readyState === WebSocket.OPEN) {
        try {
          wsRef.send(
            JSON.stringify({
              type: "UPDATE_PROGRESS",
              userId: session.user.id,
              roomCode: roomData.code,
              progress: {
                wpm,
                accuracy,
                progress,
              },
            })
          );
        } catch (error) {
          console.error("Error updating progress:", error);
        }
      }
    },
    [isRaceStarted, wsRef, session?.user?.id, roomData?.code]
  );

  if (!roomData) return null;

  const sortedMembers = [...members].sort((a, b) => {
    const progressA = a.progress?.progress || 0;
    const progressB = b.progress?.progress || 0;
    return progressB - progressA;
  });

  return (
    <div className="lg:col-span-3">
      <Card className="bg-neutral-900/50 border-neutral-800 mb-6">
        <CardContent className="space-y-4 p-6">
          {sortedMembers.map((member) => (
            <MemberProgress key={member.id} member={member} />
          ))}
        </CardContent>
      </Card>

      <Interface
        mode={roomData.mode}
        modeOption={roomData.modeOption}
        text={raceText}
        onProgress={handleProgressUpdate}
      />
    </div>
  );
};

const MemberProgress = ({ member }: MemberProgressProps) => {
  const progress = member.progress?.progress || 0;
  const wpm = member.progress?.wpm || 0;
  const accuracy = member.progress?.accuracy || 0;

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarImage src={member.image || ""} alt={member.name} />
          <AvatarFallback>
            {member.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="font-medium text-neutral-200">{member.name}</p>
          <div className="text-sm text-neutral-400">
            {wpm > 0 && (
              <span className="text-emerald-400">{Math.round(wpm)} WPM</span>
            )}
            {accuracy > 0 && (
              <span className="text-violet-400 ml-2">
                {Math.round(accuracy)}% ACC
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="flex-1">
        <div className="h-2 bg-neutral-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600 transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default Race;
