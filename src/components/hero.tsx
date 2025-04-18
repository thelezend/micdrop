"use client";

import { fadeIn, popIn } from "@/lib/animations";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ArrowRight, MicVocal } from "lucide-react";
import Link from "next/link";
import BrandText from "./brand-text";
import { TypographyH1, TypographyH2, TypographyP } from "./typography";
import { Button } from "./ui/button";
import { ShootingStars } from "./ui/shooting-stars";
import { Spotlight } from "./ui/spotlight-new";
import { StarsBackground } from "./ui/stars-background";

const Hero = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "relative isolate flex min-h-screen flex-col items-center justify-center gap-8 lg:gap-10",
        className,
      )}
    >
      {/* Brand Text */}
      <div className="flex items-center justify-center gap-1">
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{
            opacity: 1,
            x: [null, 20, -10, 5, 0],
          }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="flex items-center gap-1"
        >
          <motion.div
            animate={{ rotate: [0, -120, -80, -90] }}
            transition={{ delay: 1.2, duration: 1.2, ease: "easeInOut" }}
          >
            <MicVocal className="text-primary h-12 w-12 rotate-270 transform" />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{
            opacity: 1,
            x: [null, 20, -10, 5, 0],
          }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <TypographyH1>
            <BrandText>Mic</BrandText>
          </TypographyH1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: [null, 10, 0, 5, 0] }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 1.2 }}
        >
          <TypographyH1>
            <BrandText>Drop</BrandText>
          </TypographyH1>
        </motion.div>
      </div>

      {/* Sub heading */}
      <motion.div {...fadeIn(2)}>
        <TypographyH2 className="border-b-0 text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          Voice based social conversations in real time
        </TypographyH2>
      </motion.div>

      {/* Description */}
      <motion.div {...fadeIn(2.3)}>
        <TypographyP className="text-muted-foreground max-w-2xl text-center">
          Join live audio rooms, connect with like-minded people, and share your
          thoughts on topics that matter to you. No pressure - just authentic
          conversations.
        </TypographyP>
      </motion.div>

      {/* Button */}
      <motion.div {...popIn(2.5)}>
        <Button asChild size="lg" className="px-8">
          <Link href="/auth/signup" className="flex items-center gap-2">
            Get Started
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{
                repeat: Infinity,
                duration: 1.2,
                ease: "easeInOut",
              }}
            >
              <ArrowRight className="h-5 w-5" />
            </motion.div>
          </Link>
        </Button>
      </motion.div>

      <div className="-z-10">
        <StarsBackground />
        <ShootingStars />
        <Spotlight />
      </div>
    </div>
  );
};

export default Hero;
