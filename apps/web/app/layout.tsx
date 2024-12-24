import type { Metadata } from "next";
import "@repo/ui/globals.css";
import { Geist_Mono } from "next/font/google";
import { Toaster } from "@repo/ui/components/ui/sonner";
import { SessionProvider } from "next-auth/react";
import { Header } from "@/components/header";

const geistMono = Geist_Mono({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TypeFast - Master Your Typing Skills",
  description:
    "Practice typing, challenge friends, and track improvements with real-time stats in a sleek, minimalist interface.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
      <html lang="en">
        <body
          className={`${geistMono.className} antialiased min-h-screen bg-gradient-to-b from-neutral-900 to-black text-neutral-400`}
        >
          <Header />
          {children}
          <Toaster richColors />
        </body>
      </html>
    </SessionProvider>
  );
}
