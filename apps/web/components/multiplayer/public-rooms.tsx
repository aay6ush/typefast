import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@repo/ui/components/ui/card";
import { Users, Signal, Hash, Loader2 } from "lucide-react";
import { Button } from "@repo/ui/components/ui/button";
import { ScrollArea } from "@repo/ui/components/ui/scroll-area";
import { toast } from "sonner";
import { PublicRoomsProps } from "@/types";

const PublicRooms = ({ rooms }: PublicRoomsProps) => {
  const [isPending, startTransition] = useTransition();
  const [roomId, setRoomId] = useState<string | null>(null);
  const router = useRouter();

  const handleJoinRoom = async (roomCode: string, roomId: string) => {
    setRoomId(roomId);
    startTransition(async () => {
      try {
        const response = await fetch(`/api/room/${roomCode}`);
        const room = await response.json();

        if (response.ok) {
          router.push(`/multiplayer/room/${roomCode}`);
          toast.success("Joined room successfully!");
        } else {
          toast.error(room.error || "Room not found!");
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to join room");
      } finally {
        setRoomId(null);
      }
    });
  };

  return (
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
                    {room.maxPlayers}
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
                className="bg-gradient-to-r from-violet-500 to-violet-700 hover:from-violet-600 hover:to-violet-800 text-white font-semibold py-2 px-4 rounded-md transition-all duration-300"
                onClick={() => handleJoinRoom(room.code, room.id)}
                disabled={isPending && roomId === room.id}
              >
                {isPending && roomId === room.id ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Joining...
                  </>
                ) : (
                  "Join"
                )}
              </Button>
            </CardContent>
          </Card>
        ))}
        {rooms.length === 0 && (
          <div className="text-center text-gray-400 py-8">
            No public rooms available
          </div>
        )}
      </div>
    </ScrollArea>
  );
};

export default PublicRooms;
