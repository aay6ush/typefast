import type { Metadata } from "next";
import "./globals.css";
import { Geist_Mono } from "next/font/google";
import { Header } from "@/components/header";

const geistMono = Geist_Mono({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "TypeFast",
  description:
    "Sharpen your typing skills with our engaging and competitive app! Race against time, challenge friends, and track your improvement with real-time stats in a sleek, minimalist interface.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistMono.className} antialiased min-h-screen bg-gradient-to-b from-neutral-900 to-black text-neutral-400`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
