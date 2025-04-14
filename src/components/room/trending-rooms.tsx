import { TypographyH2 } from "@/components/typography";
import { RoomCard } from "./room-card";

/**
 * TrendingRooms component displays a grid of trending voice rooms
 * Used on the home page to showcase popular rooms
 */
export function TrendingRooms() {
  // Mock data for trending rooms
  const trendingRooms = [
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
      isLive: false,
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
    }
  ];

  return (
    <div className="py-12">
      <TypographyH2 className="text-2xl font-bold mb-6 text-center border-none">
        Trending Conversations
      </TypographyH2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {trendingRooms.map((room) => (
          <RoomCard key={room.id} {...room} />
        ))}
      </div>
    </div>
  );
}
