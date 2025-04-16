"use client";

import { PastRooms } from "@/components/user/past-rooms";
import { ProfileHeader } from "@/components/user/profile-header";
import { UserNetwork } from "@/components/user/user-network";
import { useState } from "react";
import { toast } from "sonner";

/**
 * ProfileClient component
 * Client-side component that handles the profile page functionality
 * Shows user profile information, past rooms, and followers/following
 */
export default function ProfileClient({ username }: { username: string }) {
  const [activeTab, setActiveTab] = useState("rooms");
  const [isFollowing, setIsFollowing] = useState(false);

  // Mock user data
  const userData = {
    username,
    displayName:
      username === "johnwick"
        ? "John Wick"
        : `${username.charAt(0).toUpperCase()}${username.slice(1)}`,
    bio: "Silent type, but when I speak—people listen. Let’s talk tech, tactics, and truth on MicDrop. 🎤",
    avatarUrl: "/avatars/john-wick.png",
    followersCount: 128,
    followingCount: 95,
    isCurrentUser: username === "johnwick",
    socialLinks: {
      website: "https://johnwick.movie/",
      twitter: "the_lezend",
      instagram: "johnwickofficial",
      github: "thelezend",
    },
  };

  // Mock past rooms data
  const pastRooms = [
    {
      id: "room-1",
      title: "The Future of Remote Work",
      description:
        "Discussing how remote work is changing and what to expect in the coming years.",
      date: "Apr 10, 2025",
      participantsCount: 42,
      duration: "1h 15m",
      isHost: true,
    },
    {
      id: "room-2",
      title: "Design Systems in 2025",
      description:
        "Exploring modern design systems and how they're evolving with new tools and technologies.",
      date: "Apr 5, 2025",
      participantsCount: 28,
      duration: "45m",
      isHost: false,
    },
    {
      id: "room-3",
      title: "Startup Funding Strategies",
      description:
        "Expert advice on securing funding for early-stage startups in today's market.",
      date: "Mar 28, 2025",
      participantsCount: 56,
      duration: "2h",
      isHost: true,
    },
    {
      id: "room-4",
      title: "AI in Everyday Life",
      description:
        "How artificial intelligence is impacting our daily routines and what's coming next.",
      date: "Mar 15, 2025",
      participantsCount: 35,
      duration: "1h 30m",
      isHost: false,
    },
  ];

  // Mock followers data
  const followers = [
    {
      id: "user-1",
      username: "sarahchen",
      displayName: "Sarah Chen",
      avatarUrl: "/avatars/1.jpg",
      bio: "Product designer and voice room enthusiast",
      isFollowing: true,
    },
    {
      id: "user-2",
      username: "mikejohnson",
      displayName: "Mike Johnson",
      avatarUrl: "/avatars/3.jpg",
      bio: "Tech entrepreneur and podcast host",
      isFollowing: false,
    },
    {
      id: "user-3",
      username: "emmabrown",
      displayName: "Emma Brown",
      avatarUrl: "/avatars/4.jpg",
      bio: "UX researcher focused on voice interfaces",
      isFollowing: true,
    },
  ];

  // Mock following data
  const following = [
    {
      id: "user-4",
      username: "alexsmith",
      displayName: "Alex Smith",
      avatarUrl: "/avatars/5.jpg",
      bio: "AI researcher and tech writer",
      isFollowing: true,
    },
    {
      id: "user-5",
      username: "jameswilson",
      displayName: "James Wilson",
      avatarUrl: "/avatars/7.jpg",
      bio: "Startup founder and mentor",
      isFollowing: true,
    },
    {
      id: "user-6",
      username: "linapark",
      displayName: "Lina Park",
      avatarUrl: "/avatars/6.jpg",
      bio: "Voice artist and audio producer",
      isFollowing: true,
    },
  ];

  // Handle follow/unfollow
  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    toast(isFollowing ? "Unfollowed user" : "Following user");
  };

  // Handle follow/unfollow for network users
  const handleNetworkFollow = () => {
    // In a real app, this would update the state of the specific user
    toast(`User follow status updated`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <ProfileHeader
        username={userData.username}
        displayName={userData.displayName}
        bio={userData.bio}
        avatarUrl={userData.avatarUrl}
        followersCount={userData.followersCount}
        followingCount={userData.followingCount}
        isFollowing={isFollowing}
        isCurrentUser={userData.isCurrentUser}
        socialLinks={userData.socialLinks}
        onFollow={handleFollow}
        onActiveTabChange={setActiveTab}
        activeTab={activeTab}
      />

      <div className="mt-8">
        {activeTab === "rooms" ? (
          <PastRooms rooms={pastRooms} />
        ) : (
          <UserNetwork
            followers={followers}
            following={following}
            onFollow={handleNetworkFollow}
          />
        )}
      </div>
    </div>
  );
}
