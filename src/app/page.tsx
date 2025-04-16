import { Features } from "@/components/features";
import Hero from "@/components/hero";
import { TrendingRooms } from "@/components/room/trending-rooms";

export default function Home() {
  return (
    <>
      <Hero className="text-center" />
      <Features />
      <TrendingRooms />
    </>
  );
}
