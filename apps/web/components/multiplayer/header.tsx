import { useCallback } from "react";
import { motion } from "framer-motion";
import { Copy, Hash, PlayCircle, Type, Hourglass } from "lucide-react";
import { Button } from "@repo/ui/components/ui/button";
import useWsStore from "@/store/useWsStore";
import { generateRandomWords } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { MultiplayerHeaderProps } from "@repo/common/types";

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const Header = ({
  roomData,
  isHost,
  isRaceStarted,
}: MultiplayerHeaderProps) => {
  const { wsRef } = useWsStore((state) => state);
  const { data: session } = useSession();

  const handleStartTest = useCallback(() => {
    if (!roomData || !session?.user?.id) return;

    if (wsRef?.readyState === WebSocket.OPEN) {
      try {
        const text = generateRandomWords(
          roomData.mode === "words"
            ? roomData.modeOption
            : roomData.modeOption * 2
        );

        wsRef.send(
          JSON.stringify({
            type: "START_RACE",
            userId: session.user.id,
            roomCode: roomData.code,
            text: text,
          })
        );
      } catch (error) {
        console.error("Error starting race:", error);
        toast.error("Failed to start race. Please try again.");
      }
    } else {
      toast.error("Connection lost. Reconnecting...");
    }
  }, [wsRef, session?.user?.id, roomData]);

  const handleCopyInvite = useCallback(() => {
    if (!roomData?.code) return;

    try {
      const inviteUrl = `${window.location.origin}/multiplayer/room/${roomData.code}`;
      navigator.clipboard.writeText(inviteUrl);
      toast.success("Invite link copied to clipboard!");
    } catch (error) {
      console.error("Error copying invite link:", error);
      toast.error("Failed to copy invite link");
    }
  }, [roomData?.code]);

  if (!roomData) return null;

  return (
    <motion.div
      variants={itemVariants}
      className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 pt-8 pb-4 border-b border-neutral-800"
    >
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-neutral-200 flex items-center gap-x-3">
          {roomData.name} |{" "}
          {roomData.mode === "words" ? (
            <>
              <Type strokeWidth="3" className="size-7" />
              {roomData.modeOption} words
            </>
          ) : (
            <>
              <Hourglass strokeWidth="3" className="size-7" />
              {roomData.modeOption} seconds
            </>
          )}
        </h1>
        <div className="flex items-center gap-4 text-neutral-400">
          <div className="flex items-center gap-2">
            <Hash className="size-5" />
            <span>Room Code: {roomData.code}</span>
            <Button
              variant="ghost"
              size="icon"
              className="text-neutral-400 hover:text-violet-400"
              onClick={handleCopyInvite}
              aria-label="Copy invite link"
            >
              <Copy className="size-5" />
            </Button>
          </div>
        </div>
      </div>
      <div className="flex gap-3 w-full lg:w-auto">
        {isHost && (
          <Button size="lg" onClick={handleStartTest} disabled={isRaceStarted}>
            <PlayCircle />
            {isRaceStarted ? "Race in Progress" : "Start Race"}
          </Button>
        )}
      </div>
    </motion.div>
  );
};

export default Header;
