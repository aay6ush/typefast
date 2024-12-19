import * as z from "zod";

export const signInSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

export const signUpSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

export const roomSchema = z.object({
  name: z.string().min(3, {
    message: "Room name must be at least 3 characters.",
  }),
  mode: z.string().min(1, {
    message: "Please select a mode.",
  }),
  modeOption: z.string().min(1, {
    message: "Please select a mode option.",
  }),
});

export const joinRoomSchema = z.object({
  code: z.string().min(6, {
    message: "Room code must be 6 characters long.",
  }),
});

export type SignInValues = z.infer<typeof signInSchema>;
export type SignUpValues = z.infer<typeof signUpSchema>;
export type RoomValues = z.infer<typeof roomSchema>;
export type JoinRoomValues = z.infer<typeof joinRoomSchema>;
