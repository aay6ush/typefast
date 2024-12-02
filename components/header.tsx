"use client";

import { Zap, LogOut } from "lucide-react";
import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { NAVLINKS } from "@/constants";

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
      <nav className="flex space-x-1.5 items-center">
        <TooltipProvider>
          {NAVLINKS.map((link) => (
            <Tooltip key={link.id}>
              <TooltipTrigger>
                <Link
                  href={link.href}
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "icon" })
                  )}
                >
                  <link.icon className="!size-6" />
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>{link.name}</p>
              </TooltipContent>
            </Tooltip>
          ))}

          {session && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" onClick={() => signOut()}>
                  <LogOut className="!size-6" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Sign Out</p>
              </TooltipContent>
            </Tooltip>
          )}
        </TooltipProvider>
      </nav>
    </header>
  );
}
