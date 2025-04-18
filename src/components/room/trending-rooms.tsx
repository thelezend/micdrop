"use client";

import { TypographyH2 } from "@/components/typography";
import { fadeInView } from "@/lib/animations";
import { motion } from "framer-motion";
import BrandText from "../brand-text";
import { BackgroundBeams } from "../ui/background-beams";
import { InfiniteMovingCards } from "./infinite-moving-cards";

export const trendingRooms = [
  {
    id: "1",
    title: "Tech Talk: The Future of AI",
    description:
      "Join us for a discussion on the latest developments in artificial intelligence and what the future holds.",
    speakers: [
      {
        id: 1,
        name: "Alex Chen",
        image: "/avatars/1.jpg",
      },
      {
        id: 2,
        name: "Maya Patel",
        image: "/avatars/5.jpg",
      },
      {
        id: 3,
        name: "Sam Liu",
        image: "/avatars/9.jpg",
      },
    ],
    listenersCount: 42,
    isLive: true,
    tags: ["Technology", "AI", "Future"],
  },
  {
    id: "2",
    title: "Music Production Masterclass",
    description:
      "Learn tips and tricks from professional music producers on creating your next hit track.",
    speakers: [
      {
        id: 4,
        name: "Zoe Kim",
        image: "/avatars/2.jpg",
      },
      {
        id: 5,
        name: "Jay Park",
        image: "/avatars/7.jpg",
      },
    ],
    listenersCount: 28,
    isLive: true,
    tags: ["Music", "Production", "Creative"],
  },
  {
    id: "3",
    title: "Startup Funding Strategies",
    description:
      "Experienced VCs share insights on how to secure funding for your startup in today's competitive landscape.",
    speakers: [
      {
        id: 6,
        name: "Raj Mehta",
        image: "/avatars/3.jpg",
      },
      {
        id: 7,
        name: "Emma Lee",
        image: "/avatars/6.jpg",
      },
      {
        id: 8,
        name: "Rihanna Johnson",
        image: "/avatars/10.jpg",
      },
      {
        id: 9,
        name: "Priyanka Dutt",
        image: "/avatars/12.jpg",
      },
    ],
    listenersCount: 56,
    isLive: false,
    tags: ["Startup", "Business", "Funding"],
  },
  {
    id: "4",
    title: "Mindfulness & Meditation",
    description:
      "Daily guided meditation session for reducing stress and improving focus in your busy life.",
    speakers: [
      {
        id: 10,
        name: "Mia Wong",
        image: "/avatars/4.jpg",
      },
    ],
    listenersCount: 35,
    isLive: true,
    tags: ["Wellness", "Meditation", "Mental Health"],
  },
];

/**
 * TrendingRooms component displays a grid of trending voice rooms
 * Used on the home page to showcase popular rooms
 */
export function TrendingRooms() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-16 text-center">
          <motion.div {...fadeInView}>
            <TypographyH2 className="border-none text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Trending on{" "}
              <BrandText className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl">
                MicDrop
              </BrandText>
            </TypographyH2>
          </motion.div>
          <motion.p
            {...fadeInView}
            transition={{ delay: 0.2 }}
            className="mt-4 text-gray-500 md:text-xl dark:text-gray-400"
          >
            Join the hottest conversations and connect with passionate voices
            from around the world
          </motion.p>
        </div>

        <motion.div {...fadeInView}>
          <InfiniteMovingCards
            items={trendingRooms}
            direction="left"
            speed="normal"
          />
        </motion.div>
      </div>
      <BackgroundBeams />
    </section>
  );
}
