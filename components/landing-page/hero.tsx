"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

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

const Hero = () => {
  return (
    <section className="container mx-auto px-4 py-20 text-center relative">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
        <motion.h1
          variants={itemVariants}
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-none text-neutral-200"
        >
          Master Your Typing Skills <br />
          with <span className="text-emerald-500">TypeFast</span>
        </motion.h1>
        <motion.p
          variants={itemVariants}
          className="text-xl text-neutral-400 max-w-3xl mx-auto leading-relaxed"
        >
          Practice typing, challenge friends, and track improvements with
          real-time stats in a sleek, minimalist interface.
        </motion.p>
        <motion.div variants={itemVariants}>
          <Button
            size="lg"
            asChild
            className="bg-emerald-500 hover:bg-emerald-600 text-black font-semibold"
          >
            <Link href="/auth">
              Start Typing Now <ArrowRight className="ml-2" />
            </Link>
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
