"use client";

import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";
import { FEATURES } from "@/constants";
import { FeatureCardProps } from "@repo/common/types";

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

const Features = () => {
  return (
    <section className="py-20 max-w-5xl mx-auto">
      <motion.h2
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12 text-neutral-200"
      >
        Why Choose{" "}
        <span className="underline underline-offset-8 decoration-emerald-400">
          TypeFast
        </span>
        ?
      </motion.h2>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-wrap justify-center gap-8"
      >
        {FEATURES.map((feature, index) => (
          <FeatureCard
            key={index}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </motion.div>
    </section>
  );
};

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
  return (
    <motion.div variants={itemVariants}>
      <Card className="bg-neutral-900/50 border-neutral-800 h-full max-w-xs">
        <CardHeader>
          <CardTitle className="flex items-center space-x-4 text-neutral-200 text-2xl">
            {icon}
            <span>{title}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-neutral-400 text-base">
            {description}
          </CardDescription>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default Features;
