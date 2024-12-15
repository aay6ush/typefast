"use client";

import { Loader2, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";
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
  FormLabel,
  FormMessage,
} from "@repo/ui/components/ui/form";
import { Input } from "@repo/ui/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/ui/select";
import { Switch } from "@repo/ui/components/ui/switch";
import { modes, timeOptions, wordOptions } from "@/constants";
import { toast } from "sonner";
import { roomSchema, RoomValues } from "@/lib/schemas";
import { useTransition } from "react";

const CreateRoom = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const form = useForm<RoomValues>({
    resolver: zodResolver(roomSchema),
    defaultValues: {
      name: "",
      maxPlayers: 5,
      mode: "",
      modeOption: "",
      isPublic: true,
    },
  });

  const mode = form.watch("mode");

  const onSubmit = (data: RoomValues) => {
    startTransition(async () => {
      try {
        const response = await axios.post("/api/room", data);
        const room = response.data;
        router.push(`/multiplayer/room/${room.code}`);
        toast.success("Room created successfully!");
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
          <Plus className="w-6 h-6 text-emerald-400" />
          <span>Create Room</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Room Name"
                      className="bg-neutral-700/50 border-neutral-600 text-gray-100 placeholder-gray-400"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="mode"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-neutral-800 border-neutral-700 text-neutral-200">
                          <SelectValue placeholder="Mode" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-neutral-800 border-neutral-700">
                        {modes.map((mode) => (
                          <SelectItem
                            key={mode}
                            value={mode}
                            className="text-neutral-400 cursor-pointer"
                          >
                            {mode.charAt(0).toUpperCase() + mode.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="modeOption"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-neutral-800 border-neutral-700 text-neutral-200">
                          <SelectValue placeholder="Mode Option" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-neutral-800 border-neutral-700">
                        {mode === "words" ? (
                          <>
                            {wordOptions.map((option) => (
                              <SelectItem
                                key={option}
                                value={String(option)}
                                className="text-neutral-400 cursor-pointer"
                              >
                                {option} words
                              </SelectItem>
                            ))}
                          </>
                        ) : (
                          <>
                            {timeOptions.map((option) => (
                              <SelectItem
                                key={option}
                                value={String(option)}
                                className="text-neutral-400 cursor-pointer"
                              >
                                {option} seconds
                              </SelectItem>
                            ))}
                          </>
                        )}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="maxPlayers"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      placeholder="Max Players"
                      className="bg-neutral-700/50 border-neutral-600 text-gray-100 placeholder-gray-400"
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isPublic"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between rounded-lg border bg-neutral-700/50 border-neutral-600 text-gray-100 p-3 shadow-sm">
                  <div className="space-y-0.5">
                    <FormLabel>Public Room</FormLabel>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-emerald-500 to-emerald-700 hover:from-emerald-600 hover:to-emerald-800 text-white font-semibold py-2 px-4 rounded-md transition-all duration-300"
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  <span>Creating...</span>
                </>
              ) : (
                <>
                  <Plus className="w-5 h-5 mr-2" />
                  <span>Create Room</span>
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CreateRoom;
