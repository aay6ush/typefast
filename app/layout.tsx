import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TypeFast",
  description:
    "Sharpen your typing skills with our engaging and competitive game! Race against time, challenge friends, and track your improvement with real-time stats in a sleek, minimalist interface.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
