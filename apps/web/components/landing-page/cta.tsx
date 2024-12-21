"use client";

import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@repo/ui/components/ui/button";
import Link from "next/link";

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

const CTA = () => {
  return (
    <section className="container mx-auto px-4 py-20 text-center relative">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8 relative z-10"
      >
        <motion.h2
          variants={itemVariants}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-neutral-200 tracking-tight"
        >
          Ready to Become a{" "}
          <span className="underline underline-offset-8 decoration-emerald-400">
            Typing Pro
          </span>
          ?
        </motion.h2>
        <motion.p
          variants={itemVariants}
          className="text-xl text-neutral-400 max-w-2xl mx-auto leading-relaxed"
        >
          Join thousands of users who have improved their typing speed and
          accuracy with TypeFast.
        </motion.p>
        <motion.div variants={itemVariants}>
          <Button size="lg" asChild>
            <Link href="/type">
              Get Started for Free
              <ArrowRight />
            </Link>
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default CTA;
