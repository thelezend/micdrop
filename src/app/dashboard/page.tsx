"use client";

import { RoomCard } from "@/components/room/room-card";
import { TypographyH1 } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { Clock, Plus, Search, TrendingUp, Users } from "lucide-react";
import { useState } from "react";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3, // Add delay before starting children animations
    },
  },
};

/**
 * Dashboard page component
 * Shows trending/live rooms with filtering options
 */
export default function DashboardPage() {
  const [filter, setFilter] = useState<"trending" | "new" | "following">(
    "trending",
  );
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data for rooms
  const rooms = [
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
      ],
      listenersCount: 56,
      isLive: true,
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
    {
      id: "5",
      title: "Book Club: Monthly Discussion",
      description:
        "This month we're discussing 'The Midnight Library' by Matt Haig. Join us for an insightful conversation!",
      speakers: [
        {
          id: 11,
          name: "David Johnson",
          image: "/avatars/8.jpg",
        },
        {
          id: 12,
          name: "Sarah Williams",
          image: "/avatars/11.jpg",
        },
      ],
      listenersCount: 18,
      isLive: false,
      tags: ["Books", "Reading", "Discussion"],
    },
    {
      id: "6",
      title: "Crypto Market Analysis",
      description:
        "Expert traders analyze current market trends and make predictions for the coming weeks.",
      speakers: [
        {
          id: 13,
          name: "Michael Chang",
          image: "/avatars/13.jpg",
        },
        {
          id: 14,
          name: "Olivia Martinez",
          image: "/avatars/1.jpg",
        },
        {
          id: 15,
          name: "Daniel Kim",
          image: "/avatars/2.jpg",
        },
      ],
      listenersCount: 64,
      isLive: true,
      tags: ["Crypto", "Finance", "Trading"],
    },
    {
      id: "7",
      title: "Language Learning: Spanish for Beginners",
      description:
        "Interactive session for beginners to learn basic Spanish phrases and pronunciation.",
      speakers: [
        {
          id: 16,
          name: "Isabella Rodriguez",
          image: "/avatars/3.jpg",
        },
        {
          id: 17,
          name: "Carlos Vega",
          image: "/avatars/4.jpg",
        },
      ],
      listenersCount: 31,
      isLive: false,
      tags: ["Language", "Learning", "Spanish"],
    },
    {
      id: "8",
      title: "Travel Stories: Hidden Gems in Europe",
      description:
        "Travelers share their experiences discovering lesser-known destinations across Europe.",
      speakers: [
        {
          id: 18,
          name: "Sophie Laurent",
          image: "/avatars/5.jpg",
        },
        {
          id: 19,
          name: "Marco Rossi",
          image: "/avatars/6.jpg",
        },
        {
          id: 20,
          name: "Anna Schmidt",
          image: "/avatars/7.jpg",
        },
      ],
      listenersCount: 47,
      isLive: true,
      tags: ["Travel", "Europe", "Adventure"],
    },
  ];

  // Filter rooms based on selected tab and search query
  const filteredRooms = rooms.filter((room) => {
    // First apply tab filter
    let passesTabFilter = true;
    if (filter === "trending")
      passesTabFilter = true; // All rooms for trending
    else if (filter === "new")
      passesTabFilter = room.id > "4"; // Just an example to show different rooms
    else if (filter === "following")
      passesTabFilter = ["1", "3", "5"].includes(room.id); // Example of followed rooms

    // If search query exists, check if room title or tags match the query
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      const titleMatch = room.title.toLowerCase().includes(query);
      const tagMatch = room.tags.some((tag) =>
        tag.toLowerCase().includes(query),
      );
      return passesTabFilter && (titleMatch || tagMatch);
    }

    return passesTabFilter;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex flex-col items-center justify-between gap-2 md:flex-row">
        <TypographyH1 className="text-3xl font-bold md:mb-0">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Explore Rooms
          </motion.span>
        </TypographyH1>
        <div className="flex items-center gap-2">
          <Search />
          <Input
            className="w-80"
            placeholder="Search rooms by name or tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 15,
            delay: 0.3,
          }}
          viewport={{ once: true }}
        >
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Create Room
          </Button>
        </motion.div>
      </div>

      <Tabs defaultValue="trending" className="mb-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 15,
          }}
          viewport={{ once: true }}
        >
          <TabsList className="mb-8 grid w-full grid-cols-3">
            <TabsTrigger
              value="trending"
              onClick={() => setFilter("trending")}
              className="flex items-center gap-2"
            >
              <TrendingUp className="h-4 w-4" />
              <span className="hidden sm:inline">Trending</span>
            </TabsTrigger>
            <TabsTrigger
              value="new"
              onClick={() => setFilter("new")}
              className="flex items-center gap-2"
            >
              <Clock className="h-4 w-4" />
              <span className="hidden sm:inline">New</span>
            </TabsTrigger>
            <TabsTrigger
              value="following"
              onClick={() => setFilter("following")}
              className="flex items-center gap-2"
            >
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Following</span>
            </TabsTrigger>
          </TabsList>
        </motion.div>

        <TabsContent value="trending" className="mt-0">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {filteredRooms.map((room) => (
              <RoomCard key={room.id} {...room} />
            ))}
          </motion.div>
        </TabsContent>
        <TabsContent value="new" className="mt-0">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {filteredRooms.map((room) => (
              <RoomCard key={room.id} {...room} />
            ))}
          </motion.div>
        </TabsContent>
        <TabsContent value="following" className="mt-0">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {filteredRooms.map((room) => (
              <RoomCard key={room.id} {...room} />
            ))}
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
