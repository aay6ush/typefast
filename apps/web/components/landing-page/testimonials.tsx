"use client";

import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
} from "@repo/ui/components/ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@repo/ui/components/ui/avatar";
import { TestimonialCardProps } from "@repo/common/types";
import { TESTIMONIALS } from "@/constants";
import { BadgeCheck } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const Testimonials = () => {
  return (
    <section className="py-20">
      <div className="max-w-5xl mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-4xl md:text-5xl text-neutral-200 font-bold text-center mb-12"
        >
          What Our{" "}
          <span className="underline underline-offset-8 decoration-emerald-400">
            Users
          </span>{" "}
          Say
        </motion.h2>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap gap-8 justify-center"
        >
          {TESTIMONIALS.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              name={testimonial.name}
              username={testimonial.username}
              image={testimonial.image}
              tweet={testimonial.tweet}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;

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

export const TestimonialCard = ({
  name,
  username,
  image,
  tweet,
}: TestimonialCardProps) => {
  return (
    <motion.div variants={itemVariants}>
      <Card className="bg-neutral-900/50 border-neutral-800 max-w-md">
        <CardContent className="p-5">
          <div className="flex items-center gap-x-3">
            <Avatar className="size-8">
              <AvatarImage src={image} />
              <AvatarFallback>{name.split(" ")?.[0]?.[0]}</AvatarFallback>
            </Avatar>
            <div className="flex gap-x-1 items-center">
              <span className="font-bold text-neutral-200">{name}</span>
              <BadgeCheck className="text-emerald-400 size-5" />
            </div>
            <span className="text-neutral-500">@{username}</span>
          </div>
          <CardDescription className="ml-10 pt-1 text-neutral-300 text-base">
            {tweet}
          </CardDescription>
        </CardContent>
      </Card>
    </motion.div>
  );
};
