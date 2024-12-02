"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { DEFAULT_TESTIMONIALS } from "@/constants";
import { motion } from "framer-motion";

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

const Testimonials = () => {
  return (
    <section className="py-20">
      <div className="max-w-5xl mx-auto px-4">
        <motion.h2
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="text-3xl sm:text-4xl md:text-5xl text-neutral-200 font-bold text-center mb-12"
        >
          What Our{" "}
          <span className="underline underline-offset-8 decoration-emerald-500">
            Users
          </span>{" "}
          Say
        </motion.h2>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {DEFAULT_TESTIMONIALS.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              quote={testimonial.quote}
              author={testimonial.author}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const TestimonialCard = ({
  quote,
  author,
}: {
  quote: string;
  author: string;
}) => {
  return (
    <motion.div variants={itemVariants}>
      <Card className="bg-neutral-900/50 border-neutral-800">
        <CardHeader>
          <CardDescription className="text-lg italic text-neutral-400">
            &quot;{quote}&quot;
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm font-semibold text-emerald-500">- {author}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default Testimonials;
