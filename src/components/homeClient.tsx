"use client";

import { useTheme } from "next-themes";
import { useEffect } from "react";
import { Features } from "./features";
import Hero from "./hero";
import { TrendingRooms } from "./room/trending-rooms";

const HomeClient = () => {
  const { setTheme } = useTheme();

  useEffect(() => {
    setTheme("dark");
  }, [setTheme]);

  return (
    <>
      <Hero className="text-center" />
      <Features />
      <TrendingRooms />
    </>
  );
};

export default HomeClient;
