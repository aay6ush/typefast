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
import { joinRoomSchema, JoinRoomValues } from "@repo/common/schemas";

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
        <CardTitle className="flex items-center space-x-3 text-2xl">
          <LogIn className="size-8 text-sky-400" />
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
                      className="bg-neutral-800 border-neutral-700 text-neutral-200 placeholder-neutral-400"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              size="lg"
              variant="secondary"
              className="w-full"
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <Loader2 className="animate-spin" />
                  <span>Joining...</span>
                </>
              ) : (
                <>
                  <LogIn />
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
