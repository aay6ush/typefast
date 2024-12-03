"use server";

import { signInSchema } from "@/lib/schemas";
import { getUserByEmail } from "@/db/user";
import { AuthError } from "next-auth";
import bcrypt from "bcryptjs";
import { z } from "zod";

export const login = async (values: z.infer<typeof signInSchema>) => {
  const validation = signInSchema.safeParse(values);

  if (!validation.success) {
    return { success: false, message: "Invalid Credentials" };
  }

  const { email, password } = validation.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { success: false, message: "User does not exist" };
  }

  if (!existingUser.emailVerified) {
    return { success: false, message: "Email not verified" };
  }

  try {
    const passwordsMatch = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!passwordsMatch) {
      return { success: false, message: "Invalid credentials" };
    }

    return { success: true, message: "Logged in successfully!" };
  } catch (error) {
    return { success: false, message: "Internal server error!" };
  }
};
