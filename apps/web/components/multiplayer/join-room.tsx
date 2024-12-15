"use client";

import { Loader2, LogIn } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Button } from "@repo/ui/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@repo/ui/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@repo/ui/components/ui/form";
import { Input } from "@repo/ui/components/ui/input";
import { joinRoomSchema, JoinRoomValues } from "@/lib/schemas";

const JoinRoom = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<JoinRoomValues>({
    resolver: zodResolver(joinRoomSchema),
    defaultValues: {
      code: "",
    },
  });

  const onSubmit = (data: JoinRoomValues) => {
    startTransition(async () => {
      try {
        const response = await fetch(`/api/room/${data.code}`);
        const room = await response.json();

        if (response.ok) {
          router.push(`/room/${data.code}`);
          toast.success("Joined room successfully!");
        } else {
          toast.error(room.error || "Room not found!");
        }
      } catch (error) {
        console.error(error);
        toast.error("Something went wrong!");
      }
    });
  };

  return (
    <Card className="bg-neutral-900/50 border-neutral-800 text-neutral-200">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <LogIn className="w-6 h-6 text-sky-400" />
          <span>Join Room</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Room Code"
                      className="bg-neutral-700/50 border-neutral-600 text-gray-100 placeholder-gray-400"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-sky-500 to-sky-700 hover:from-sky-600 hover:to-sky-800 text-white font-semibold py-2 px-4 rounded-md transition-all duration-300"
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  <span>Joining...</span>
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5 mr-2" />
                  <span>Join Room</span>
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default JoinRoom;
