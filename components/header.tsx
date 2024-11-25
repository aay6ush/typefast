"use client";

import { User, Crown, Zap } from "lucide-react";
import Link from "next/link";

export function Header() {
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
      <div className="flex space-x-6">
        <Link
          href="/leaderboard"
          className="text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/50"
        >
          <Crown />
        </Link>
        <Link
          href="/profile"
          className="text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/50"
        >
          <User />
        </Link>
      </div>
    </header>
  );
}
