"use client";

import { motion } from "framer-motion";
import {
  ChefHat,
  ScanLine,
  BrainCircuit,
  Sparkles,
  Heart,
  Recycle,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export default function AboutPage() {
  return (
    <div>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="container mx-auto max-w-5xl px-4 py-16 md:py-24 text-center"
      >
        <motion.div variants={itemVariants}>
          <ChefHat className="mx-auto h-16 w-16 text-primary fill-primary" />
        </motion.div>
        <motion.h1
          variants={itemVariants}
          className="mt-4 font-headline text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl"
        >
          Our Story
        </motion.h1>
        <motion.p
          variants={itemVariants}
          className="mx-auto mt-6 max-w-3xl text-lg text-muted-foreground md:text-xl"
        >
          Recipe Snap was born from a simple idea: what if we could end the
          daily indecision of "what's for dinner?" and reduce food waste at the
          same time? We combine a passion for food with the power of AI to
          transform your kitchen's leftovers into culinary opportunities.
        </motion.p>
      </motion.div>

      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
        className="bg-secondary/30 py-20 md:py-32"
      >
        <div className="container mx-auto max-w-5xl px-4">
          <motion.h2
            variants={itemVariants}
            className="text-center font-headline text-3xl font-bold tracking-tighter sm:text-5xl"
          >
            The Magic Behind the Snap
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="mx-auto mt-4 max-w-[900px] text-center text-muted-foreground md:text-xl/relaxed"
          >
            Our process is simple for you, but powered by complex technology.
          </motion.p>
          <div className="relative mt-16">
            <div
              className="absolute left-0 right-0 mx-auto w-0.5 h-full bg-border md:left-1/2 md:right-auto md:mx-0"
              aria-hidden="true"
            />
            <div className="space-y-16">
              {[
                {
                  icon: ScanLine,
                  title: "1. You Snap",
                  description:
                    "You upload a photo of your ingredients. Our AI Vision model scans the image, identifying everything from arugula to zucchini with incredible precision.",
                },
                {
                  icon: BrainCircuit,
                  title: "2. We Think",
                  description:
                    "The list of ingredients is sent to our core AI chef. It analyzes what you have, considers your dietary preferences, and cross-references a massive database of culinary knowledge.",
                },
                {
                  icon: Sparkles,
                  title: "3. AI Creates",
                  description:
                    "The AI doesn't just find a recipe; it generates a brand new one tailored to you. It creates the recipe name, instructions, and even an appetizing description.",
                },
              ].map((step, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.5 }}
                  variants={{
                    hidden: { opacity: 0, x: index % 2 === 0 ? -100 : 100 },
                    visible: {
                      opacity: 1,
                      x: 0,
                      transition: { duration: 0.8, ease: "easeOut" },
                    },
                  }}
                  className="relative flex items-start md:w-1/2 md:ml-auto md:pl-8"
                >
                  <div
                    className={`flex w-full items-start ${
                      index % 2 === 0
                        ? "md:flex-row-reverse md:ml-[-100%] md:text-right md:pl-0 md:pr-8"
                        : ""
                    }`}
                  >
                    <div className="absolute left-0 -ml-4 flex h-8 w-8 items-center justify-center rounded-full bg-primary ring-8 ring-background md:static md:ml-0 md:mr-8 md:flex-shrink-0">
                      <step.icon className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <div className="pl-12 md:pl-0">
                      <h3 className="font-headline text-2xl font-bold">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-muted-foreground">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
        className="w-full py-20 md:py-32"
      >
        <div className="container grid items-center justify-center gap-8 px-4 text-center md:px-6">
          <div className="space-y-3">
            <motion.h2
              variants={itemVariants}
              className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline"
            >
              More Than an App
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed"
            >
              We believe in a future where technology helps us live more
              sustainably and creatively.
            </motion.p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              {
                icon: Recycle,
                title: "A Greener Planet",
                description:
                  "Every meal made with Recipe Snap is a small victory against food waste. We're proud to help you save money and contribute to a healthier planet.",
              },
              {
                icon: Sparkles,
                title: "Culinary Creativity",
                description:
                  "We want to break the routine. Our AI is designed to surprise and delight you with new combinations and cuisines you might have never tried.",
              },
              {
                icon: Heart,
                title: "Made for Everyone",
                description:
                  "Whether you're a seasoned chef or a kitchen novice, our app is built to be intuitive, helpful, and fun for all skill levels.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="flex flex-col items-center gap-4 p-6 bg-card rounded-lg shadow-sm"
              >
                <div className="p-3 bg-primary/10 rounded-full">
                  <feature.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold font-headline">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={itemVariants}
        className="w-full py-20 md:py-32 bg-primary/5 text-center"
      >
        <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-primary">
          Join the Culinary Revolution
        </h2>
        <p className="mx-auto mt-4 max-w-[600px] text-muted-foreground md:text-xl">
          Ready to transform your kitchen? Your next masterpiece is just a photo
          away.
        </p>
        <div className="mt-8">
          <Link href="/snap">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button size="lg">Get Started Now</Button>
            </motion.div>
          </Link>
        </div>
      </motion.section>
    </div>
  );
}
