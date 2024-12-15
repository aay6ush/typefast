import { useCallback, useState } from "react";
import { motion } from "framer-motion";
import {
  Users,
  Lock,
  Globe,
  Copy,
  LogOut,
  Hash,
  Signal,
  PlayCircle,
  Settings,
} from "lucide-react";
import { Button } from "@repo/ui/components/ui/button";
import { Dialog, DialogTrigger } from "@repo/ui/components/ui/dialog";
import useWsStore from "@/store/useWsStore";
import { generateRandomWords } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { MultiplayerHeaderProps, RoomSettingsProps } from "@/types";

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const Header = ({
  roomData,
  isHost,
  isRaceActive,
  countdown,
}: MultiplayerHeaderProps) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
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
        <h1 className="text-3xl font-bold flex items-center gap-x-3 text-neutral-200">
          {roomData.isPublic ? (
            <Globe
              className="size-8 text-violet-400"
              aria-label="Public Room"
            />
          ) : (
            <Lock
              className="size-8 text-violet-400"
              aria-label="Private Room"
            />
          )}
          {roomData.name}
        </h1>
        <div className="flex items-center gap-4 text-sm text-neutral-400">
          <div className="flex items-center gap-2">
            <Hash className="w-4 h-4" />
            <span>Room Code: {roomData.code}</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 text-neutral-400 hover:text-violet-400"
              onClick={handleCopyInvite}
              aria-label="Copy invite link"
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            <span>{roomData.maxPlayers} Players</span>
          </div>
          <div className="flex items-center gap-2">
            <Signal className="w-4 h-4" />
            <span>
              {roomData.mode === "words"
                ? `${roomData.modeOption} words`
                : `${roomData.modeOption} min`}
            </span>
          </div>
        </div>
      </div>
      <div className="flex gap-3 w-full lg:w-auto">
        <Button
          className="flex-1 lg:flex-none bg-gradient-to-r from-emerald-500 to-emerald-700 hover:from-emerald-600 hover:to-emerald-800"
          onClick={handleStartTest}
          disabled={!isHost || isRaceActive}
        >
          <PlayCircle className="w-5 h-5 mr-2" />
          {countdown !== null
            ? `Starting in ${countdown}s`
            : isRaceActive
              ? "Race in Progress"
              : "Start Test"}
        </Button>
        <RoomSettings
          isSettingsOpen={isSettingsOpen}
          setIsSettingsOpen={setIsSettingsOpen}
        />
        <Button variant="destructive" size="icon" aria-label="Leave room">
          <LogOut className="!size-5" />
        </Button>
      </div>
    </motion.div>
  );
};

const RoomSettings = ({
  isSettingsOpen,
  setIsSettingsOpen,
}: RoomSettingsProps) => {
  return (
    <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
      <DialogTrigger asChild>
        <Button
          size="icon"
          className="bg-neutral-800 border-neutral-700 hover:bg-neutral-700"
          aria-label="Room settings"
        >
          <Settings className="!size-5" />
        </Button>
      </DialogTrigger>
    </Dialog>
  );
};

export default Header;
