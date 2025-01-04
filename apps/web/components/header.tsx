"use client";

import { Zap, LogOut } from "lucide-react";
import Link from "next/link";
import { Button } from "@repo/ui/components/ui/button";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { NAVLINKS } from "@/constants";

export const Header = () => {
  const { data: session } = useSession();

  return (
    <header className="w-full max-w-5xl mx-auto flex items-center justify-between px-6 py-4">
      <Link
        href="/"
        className="text-2xl font-bold text-neutral-200 flex items-center space-x-1"
      >
        <Zap className="size-6 text-emerald-400" />
        <p>
          Type<span className="text-emerald-400">Fast</span>
        </p>
      </Link>
      <nav className="flex items-center gap-x-6">
        {NAVLINKS.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className="flex items-center gap-x-2.5 hover:text-white transition-colors duration-300"
          >
            <link.icon />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        ))}

        {session && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => signOut()}
            className="hover:bg-red-500 hover:text-white transition-colors duration-300"
          >
            <LogOut className="!size-6" />
          </Button>
        )}
      </nav>
    </header>
  );
};
