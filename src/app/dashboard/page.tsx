"use client";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TypographyH1 } from "@/components/typography";
import { RoomCard } from "@/components/room/room-card";
import { useState } from "react";
import { Plus, TrendingUp, Clock, Users } from "lucide-react";
import Link from "next/link";

/**
 * Dashboard page component
 * Shows trending/live rooms with filtering options
 */
export default function DashboardPage() {
  const [filter, setFilter] = useState<"trending" | "new" | "following">("trending");
  
  // Mock data for rooms
  const rooms = [
    {
      id: "1",
      title: "Tech Talk: The Future of AI",
      description: "Join us for a discussion on the latest developments in artificial intelligence and what the future holds.",
      speakersCount: 3,
      listenersCount: 42,
      isLive: true,
      tags: ["Technology", "AI", "Future"]
    },
    {
      id: "2",
      title: "Music Production Masterclass",
      description: "Learn tips and tricks from professional music producers on creating your next hit track.",
      speakersCount: 2,
      listenersCount: 28,
      isLive: true,
      tags: ["Music", "Production", "Creative"]
    },
    {
      id: "3",
      title: "Startup Funding Strategies",
      description: "Experienced VCs share insights on how to secure funding for your startup in today's competitive landscape.",
      speakersCount: 4,
      listenersCount: 56,
      isLive: true,
      tags: ["Startup", "Business", "Funding"]
    },
    {
      id: "4",
      title: "Mindfulness & Meditation",
      description: "Daily guided meditation session for reducing stress and improving focus in your busy life.",
      speakersCount: 1,
      listenersCount: 35,
      isLive: true,
      tags: ["Wellness", "Meditation", "Mental Health"]
    },
    {
      id: "5",
      title: "Book Club: Monthly Discussion",
      description: "This month we're discussing 'The Midnight Library' by Matt Haig. Join us for an insightful conversation!",
      speakersCount: 2,
      listenersCount: 18,
      isLive: false,
      tags: ["Books", "Reading", "Discussion"]
    },
    {
      id: "6",
      title: "Crypto Market Analysis",
      description: "Expert traders analyze current market trends and make predictions for the coming weeks.",
      speakersCount: 3,
      listenersCount: 64,
      isLive: true,
      tags: ["Crypto", "Finance", "Trading"]
    },
    {
      id: "7",
      title: "Language Learning: Spanish for Beginners",
      description: "Interactive session for beginners to learn basic Spanish phrases and pronunciation.",
      speakersCount: 2,
      listenersCount: 31,
      isLive: false,
      tags: ["Language", "Learning", "Spanish"]
    },
    {
      id: "8",
      title: "Travel Stories: Hidden Gems in Europe",
      description: "Travelers share their experiences discovering lesser-known destinations across Europe.",
      speakersCount: 5,
      listenersCount: 47,
      isLive: true,
      tags: ["Travel", "Europe", "Adventure"]
    }
  ];

  // Filter rooms based on selected tab
  const filteredRooms = rooms.filter(room => {
    if (filter === "trending") return true; // All rooms for trending
    if (filter === "new") return room.id > "4"; // Just an example to show different rooms
    if (filter === "following") return ["1", "3", "5"].includes(room.id); // Example of followed rooms
    return true;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <TypographyH1 className="text-3xl font-bold mb-4 md:mb-0">Explore Rooms</TypographyH1>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Create Room
        </Button>
      </div>

      <Tabs defaultValue="trending" className="mb-8">
        <TabsList className="grid w-full grid-cols-3 mb-8">
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
        
        <TabsContent value="trending" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredRooms.map((room) => (
              <RoomCard key={room.id} {...room} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="new" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredRooms.map((room) => (
              <RoomCard key={room.id} {...room} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="following" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredRooms.map((room) => (
              <RoomCard key={room.id} {...room} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
