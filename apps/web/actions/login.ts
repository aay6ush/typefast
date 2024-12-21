"use server";

import { signInSchema, SignInValues } from "@repo/common/schemas";
import { getUserByEmail } from "@/db/user";
import bcrypt from "bcryptjs";

export const login = async (values: SignInValues) => {
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
