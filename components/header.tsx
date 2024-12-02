"use client";

import { User, Crown, Zap, LogOut, Sword, Swords } from "lucide-react";
import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

export function Header() {
  const { data: session } = useSession();

  return (
    <header className="w-full max-w-5xl mx-auto flex items-center justify-between px-6 py-4">
      <Link
        href="/"
        className="text-2xl font-bold text-neutral-200 flex items-center space-x-1"
      >
        <Zap className="size-7 text-emerald-500" />
        <p>
          Type<span className="text-emerald-500">Fast</span>
        </p>
      </Link>
      <div className="flex space-x-1 items-center">
        <Link
          href="/leaderboard"
          className={cn(buttonVariants({ variant: "ghost", size: "icon" }))}
        >
          <Crown className="!size-6" />
        </Link>

        <Link
          href="/multiplayer"
          className={cn(buttonVariants({ variant: "ghost", size: "icon" }))}
        >
          <Swords className="!size-6" />
        </Link>

        <Link
          href="/profile"
          className={cn(buttonVariants({ variant: "ghost", size: "icon" }))}
        >
          <User className="!size-6" />
        </Link>

        {session && (
          <Button variant="ghost" size="icon" onClick={() => signOut()}>
            <LogOut className="!size-6" />
          </Button>
        )}
      </div>
    </header>
  );
}
