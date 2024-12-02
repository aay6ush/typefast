"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { motion } from "framer-motion";
import { DEFAULT_STATS } from "@/constants";

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
          <span className="underline underline-offset-8 decoration-emerald-500">
            Numbers
          </span>
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {DEFAULT_STATS.map((stat, index) => (
            <StatCard
              key={index}
              number={stat.number}
              label={stat.label}
              suffix={stat.suffix}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const StatCard = ({
  number,
  label,
  suffix,
}: {
  number: number;
  label: string;
  suffix?: string;
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = number / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= number) {
        clearInterval(timer);
        setCount(number);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [number]);

  return (
    <Card className="bg-neutral-900/50 border-neutral-800">
      <CardContent className="pt-5 text-center">
        <div className="text-4xl font-bold text-emerald-500 mb-2">
          {count.toLocaleString()}
          {suffix}
        </div>
        <CardDescription className="text-neutral-400">{label}</CardDescription>
      </CardContent>
    </Card>
  );
};

export default Stats;
