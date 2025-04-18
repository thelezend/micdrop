"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  childFadeInView,
  fadeInView,
  parentContainerFadeInView,
} from "@/lib/animations";
import { motion } from "framer-motion";
import {
  Gamepad,
  MessageSquare,
  Mic,
  Music,
  Trophy,
  Users,
} from "lucide-react";
import { AnimatedIcon } from "./animated-icon";
import BrandText from "./brand-text";
import { TypographyH2 } from "./typography";

const features = [
  {
    title: "Live Voice Rooms",
    description:
      "Join or create audio rooms on any topic and connect with people in real-time conversations.",
    icon: Mic,
  },
  {
    title: "Community Building",
    description:
      "Find your tribe with topic-based rooms and build meaningful connections with like-minded people.",
    icon: Users,
  },
  {
    title: "Authentic Interactions",
    description:
      "Experience genuine conversations without the pressure of being recorded or permanent content.",
    icon: MessageSquare,
  },
  {
    title: "Topic-Based Rooms",
    description:
      "Discover and join rooms based on your interests, from tech and music to education and entertainment.",
    icon: Trophy,
  },
  {
    title: "Audio Spaces",
    description:
      "Create private or public audio spaces for focused discussions, brainstorming sessions, or casual hangouts.",
    icon: Gamepad,
  },
  {
    title: "Voice Filters & Effects",
    description:
      "Express yourself with voice modulation, background noise cancellation, and fun audio effects during conversations.",
    icon: Music,
  },
];

export function Features() {
  return (
    <section className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-gray-50 to-white py-20 dark:from-gray-900/50 dark:to-gray-900/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-16 text-center">
          <motion.div {...fadeInView}>
            <TypographyH2 className="border-none text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Why{" "}
              <BrandText className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl">
                MicDrop
              </BrandText>{" "}
              Rocks
            </TypographyH2>
          </motion.div>
          <motion.p
            {...fadeInView}
            transition={{ delay: 0.2 }}
            className="mt-4 text-gray-500 md:text-xl dark:text-gray-400"
          >
            Discover what makes MicDrop the ultimate voice-based social platform
          </motion.p>
        </div>

        <motion.div
          {...parentContainerFadeInView}
          className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feature, index) => (
            <motion.div key={index} {...childFadeInView}>
              <Card>
                <CardHeader>
                  <AnimatedIcon
                    icon={feature.icon}
                    containerClassName="mb-4"
                    size={24}
                  />
                  <CardTitle className="mb-2 text-xl">
                    {feature.title}
                  </CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Room for additional content if needed */}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
