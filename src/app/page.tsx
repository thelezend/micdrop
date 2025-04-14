import Hero from "@/components/hero";
import { TrendingRooms } from "@/components/room/trending-rooms";

export default function Home() {
  return (
    <div className="container mx-auto px-4">
      <Hero className="text-center" />
      <TrendingRooms />
    </div>
  );
}
