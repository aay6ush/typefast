"use client";

import { modes, timeOptions, wordOptions } from "@/constants";
import { cn } from "@/lib/utils";
import { ModesProps } from "@repo/common/types";
import { motion } from "framer-motion";
import { Hourglass, Type } from "lucide-react";

const Modes = ({ mode, setMode, modeOption, setModeOption }: ModesProps) => {
  const handleModeChange = (mode: string) => {
    if (mode === "time") {
      setMode(mode);
      setModeOption(timeOptions[0]!);
    } else if (mode === "words") {
      setMode(mode);
      setModeOption(wordOptions[0]!);
    }
  };

  return (
    <div className="mb-8">
      <motion.div
        className="mx-auto w-fit flex items-center justify-center space-x-3 bg-neutral-900/50 p-2 rounded-full shadow-lg"
        layout
      >
        {modes.map((m) => (
          <motion.button
            key={m}
            onClick={() => handleModeChange(m)}
            className={cn(
              "rounded-full px-4 py-2 flex items-center transition-colors duration-200",
              mode === m
                ? "bg-neutral-800 text-neutral-200"
                : "text-neutral-400 hover:bg-neutral-800/50 hover:text-neutral-300"
            )}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {m === "time" && <Hourglass className="mr-2" />}
            {m === "words" && <Type className="mr-2" />}
            {m}
          </motion.button>
        ))}
        <motion.div className="h-7 w-px bg-neutral-700" layout />
        {mode === "time" &&
          timeOptions.map((t) => (
            <motion.button
              key={t}
              onClick={() => setModeOption(t)}
              className={cn(
                "rounded-full px-3 py-1 min-w-[2rem] transition-colors duration-200",
                modeOption === t
                  ? "bg-neutral-800 text-neutral-200"
                  : "text-neutral-400 hover:bg-neutral-800/50 hover:text-neutral-300"
              )}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t}
            </motion.button>
          ))}
        {mode === "words" &&
          wordOptions.map((w) => (
            <motion.button
              key={w}
              onClick={() => setModeOption(w)}
              className={cn(
                "rounded-full px-3 py-1 min-w-[2rem] transition-colors duration-200",
                modeOption === w
                  ? "bg-neutral-800 text-neutral-200"
                  : "text-neutral-400 hover:bg-neutral-800/50 hover:text-neutral-300"
              )}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {w}
            </motion.button>
          ))}
      </motion.div>
    </div>
  );
};

export default Modes;
