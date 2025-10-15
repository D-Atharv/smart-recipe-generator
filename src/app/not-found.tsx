"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Apple, Carrot, ChefHat, Pizza } from "lucide-react";
import { Card } from "@/components/ui/card";

const containerVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
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
      stiffness: 100,
    },
  },
};

const foodIcons = [
  { icon: Apple, className: "top-1/4 left-1/4" },
  { icon: Carrot, className: "top-1/3 right-1/4" },
  { icon: Pizza, className: "bottom-1/3 left-1/3" },
  { icon: Pizza, className: "bottom-1/4 right-1/3" },
];

export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-10rem)] flex-col items-center justify-center text-center px-4">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative"
      >
        <Card className="p-8 sm:p-12 md:p-16 relative overflow-hidden bg-secondary/30">
          <div className="relative z-10 flex flex-col items-center">
            <motion.div variants={itemVariants}>
              <ChefHat
                className="h-24 w-24 sm:h-32 sm:w-32 text-primary/80"
                strokeWidth={1}
                style={{ transform: "rotate(-30deg)" }}
              />
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="mt-4 text-7xl sm:text-8xl md:text-9xl font-bold tracking-tighter text-primary font-headline"
            >
              404
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="mt-2 text-lg font-semibold text-foreground"
            >
              Oops! Kitchen Mishap!
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="mt-2 max-w-sm text-base text-muted-foreground"
            >
              It looks like this page has been chopped, diced, and is now
              nowhere to be found.
            </motion.p>

            <motion.div variants={itemVariants} className="mt-8">
              <Link href="/">
                <Button size="lg">Back to the Kitchen</Button>
              </Link>
            </motion.div>
          </div>

          {/* Bouncing food items */}
          <div className="absolute inset-0">
            {foodIcons.map((food, index) => (
              <motion.div
                key={index}
                className={`absolute ${food.className}`}
                initial={{ y: -200, opacity: 0 }}
                animate={{ y: 0, opacity: 1, rotate: Math.random() * 360 }}
                transition={{
                  delay: 0.5 + index * 0.2,
                  type: "spring",
                  stiffness: 50,
                  damping: 8,
                }}
              >
                <motion.div
                  animate={{
                    y: [0, 20, 0, -10, 0],
                    x: [0, -15, 0, 15, 0],
                    rotate: [0, 20, -20, 0],
                  }}
                  transition={{
                    duration: Math.random() * 4 + 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <food.icon
                    className="h-10 w-10 sm:h-12 sm:w-12 text-primary/30"
                    strokeWidth={1.5}
                  />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
