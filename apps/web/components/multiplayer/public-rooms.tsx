import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@repo/ui/components/ui/card";
import { Loader2, Type, Hourglass } from "lucide-react";
import { Button } from "@repo/ui/components/ui/button";
import { ScrollArea } from "@repo/ui/components/ui/scroll-area";
import { toast } from "sonner";
import { PublicRoomsProps } from "@repo/common/types";

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
            className="bg-neutral-800/50 border-neutral-700 hover:bg-neutral-700 transition-all duration-300"
          >
            <CardContent className="flex items-center justify-between p-4">
              <div className="flex items-center space-x-4 text-lg ">
                <h3 className=" text-neutral-200">{room.name}</h3>
                <p className="text-emerald-400 flex items-center">
                  {room.mode === "words" ? (
                    <>
                      <Type className="size-5 mr-2" />
                      {room.modeOption} words
                    </>
                  ) : (
                    <>
                      <Hourglass className="size-5 mr-2" />
                      {room.modeOption} seconds
                    </>
                  )}
                </p>
              </div>
              <Button
                size="lg"
                className="from-violet-500 to-violet-600 hover:from-violet-700 hover:to-violet-800"
                onClick={() => handleJoinRoom(room.code, room.id)}
                disabled={isPending && roomId === room.id}
              >
                {isPending && roomId === room.id ? (
                  <>
                    <Loader2 className="size-5 mr-2 animate-spin" />
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
          <div className="text-center text-neutral-400 py-8">
            No public rooms available
          </div>
        )}
      </div>
    </ScrollArea>
  );
};

export default PublicRooms;
