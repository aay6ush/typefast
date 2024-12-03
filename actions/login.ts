"use server";

import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/constants";
import { getUserByEmail } from "@/db/user";
import { signInSchema } from "@/lib/schemas";
import { AuthError } from "next-auth";
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
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
    return { success: true, message: "Logged in successfully!" };
  } catch (error) {
    console.error("Login error:", error);
    if (error instanceof AuthError) {
      console.error("AuthError type:", error.type);
      switch (error.type) {
        case "CredentialsSignin":
          return { success: false, message: "Invalid Credentials" };
        default:
          return { success: false, message: "Something went wrong" };
      }
    }

    throw error;
  }
};
