"use server";

import bcrypt from "bcryptjs";
import { getUserByEmail } from "@/db/user";
import { sendVerificationEmail } from "@/lib/resend";
import { signUpSchema, SignUpValues } from "@repo/common/schemas";
import prisma from "@repo/db/client";
import { generateVerificationToken } from "@/lib/utils";

export const register = async (values: SignUpValues) => {
  const validation = signUpSchema.safeParse(values);

  if (!validation.success) {
    return { success: false, message: "Invalid Credentials" };
  }

  const { name, email, password } = validation.data;

  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { success: false, message: "User already exists" };
  }

  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  const verificationToken = await generateVerificationToken(email);
  await sendVerificationEmail(verificationToken.email, verificationToken.token);

  return { success: true, message: "Confirmation email sent" };
};
