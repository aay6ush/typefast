"use client";

import { useState, useEffect, useTransition } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@repo/ui/components/ui/card";
import { motion } from "framer-motion";
import { LoaderPinwheel } from "lucide-react";

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 20,
      stiffness: 100,
    },
  },
};

const Stats = () => {
  const [stats, setStats] = useState<null | { name: string; value: number }[]>(
    null
  );
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(async () => {
      const response = await fetch("/api/stats");
      const data = await response.json();
      setStats(data);
    });
  }, []);

  return (
    <section className="py-20 relative">
      <div className="max-w-5xl mx-auto px-4 relative z-10">
        <motion.h2
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-neutral-200 mb-12"
        >
          TypeFast by{" "}
          <span className="underline underline-offset-8 decoration-emerald-400">
            Numbers
          </span>
        </motion.h2>
        <div className="flex justify-center gap-8">
          {isPending ? (
            <LoaderPinwheel className="animate-spin mx-auto size-10 text-yellow-400" />
          ) : (
            stats?.map((stat, index) => (
              <Card
                key={index}
                className="bg-neutral-900/50 border-neutral-800 w-full max-w-xs"
              >
                <CardContent className="p-5 text-center space-y-2">
                  <CardTitle className="text-emerald-400 text-4xl">
                    {stat.value}+
                  </CardTitle>
                  <CardDescription className="text-neutral-400 text-base">
                    {stat.name}
                  </CardDescription>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Stats;
