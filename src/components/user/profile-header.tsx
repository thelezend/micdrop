import { GitHubIcon, InstagramIcon, XIcon } from "@/components/logos";
import { TypographyH1, TypographyP } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserAvatar } from "@/components/user/avatar";
import { motion } from "framer-motion";
import { Calendar, Globe, Users } from "lucide-react";
import Link from "next/link";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

interface ProfileHeaderProps {
  username: string;
  displayName: string;
  bio: string;
  avatarUrl?: string;
  followersCount: number;
  followingCount: number;
  isFollowing: boolean;
  isCurrentUser: boolean;
  socialLinks?: {
    website?: string;
    twitter?: string;
    instagram?: string;
    github?: string;
  };
  onFollow: () => void;
  onActiveTabChange: (tab: string) => void;
  activeTab: string;
}

/**
 * ProfileHeader component displays user profile information
 * Includes avatar, bio, social links, and follow button
 */
export function ProfileHeader({
  username,
  displayName,
  bio,
  avatarUrl,
  followersCount,
  followingCount,
  isFollowing,
  isCurrentUser,
  socialLinks = {},
  onFollow,
  onActiveTabChange,
  activeTab,
}: ProfileHeaderProps) {
  return (
    <div className="space-y-6">
      <motion.div
        className="flex flex-col items-center gap-6 md:flex-row md:items-start"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <UserAvatar
          src={avatarUrl}
          name={displayName}
          size="lg"
          className="h-24 w-24 md:h-32 md:w-32"
        />

        <div className="flex-1 text-center md:text-left">
          <TypographyH1 className="text-2xl font-bold md:text-3xl">
            {displayName}
          </TypographyH1>
          <TypographyP className="text-muted-foreground mb-4">
            @{username}
          </TypographyP>

          <TypographyP className="mb-4 max-w-md">{bio}</TypographyP>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mb-4 flex items-center justify-center space-x-3 md:justify-start"
          >
            {socialLinks.website && (
              <motion.div variants={item}>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full duration-200 hover:-translate-y-1"
                  asChild
                  aria-label="Website"
                >
                  <Link
                    href={socialLinks.website}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Globe className="h-4 w-4" />
                  </Link>
                </Button>
              </motion.div>
            )}

            {socialLinks.twitter && (
              <motion.div variants={item}>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full duration-200 hover:-translate-y-1"
                  asChild
                  aria-label="Twitter"
                >
                  <Link
                    href={`https://twitter.com/${socialLinks.twitter}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <XIcon className="h-4 w-4" />
                  </Link>
                </Button>
              </motion.div>
            )}

            {socialLinks.instagram && (
              <motion.div variants={item}>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full duration-200 hover:-translate-y-1"
                  aria-label="Instagram"
                  onClick={(e) => e.preventDefault()}
                >
                  <InstagramIcon className="h-4 w-4" />
                </Button>
              </motion.div>
            )}

            {socialLinks.github && (
              <motion.div variants={item}>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full duration-200 hover:-translate-y-1"
                  asChild
                  aria-label="GitHub"
                >
                  <Link
                    href={`https://github.com/${socialLinks.github}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <GitHubIcon className="h-4 w-4" />
                  </Link>
                </Button>
              </motion.div>
            )}
          </motion.div>

          <div className="flex items-center justify-center gap-6 md:justify-start">
            <div className="flex items-center gap-1">
              <Users className="text-muted-foreground h-4 w-4" />
              <span className="text-sm font-medium">
                {followersCount} followers
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="text-muted-foreground h-4 w-4" />
              <span className="text-sm font-medium">
                {followingCount} following
              </span>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 15,
            delay: 0.3,
          }}
        >
          {isCurrentUser ? (
            <Button variant="outline" asChild>
              <Link href="/settings">Edit Profile</Link>
            </Button>
          ) : (
            <Button
              variant={isFollowing ? "outline" : "default"}
              onClick={onFollow}
            >
              {isFollowing ? "Following" : "Follow"}
            </Button>
          )}
        </motion.div>
      </motion.div>

      <Tabs
        defaultValue={activeTab}
        className="w-full"
        onValueChange={onActiveTabChange}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 15,
          }}
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="rooms" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Rooms
            </TabsTrigger>
            <TabsTrigger value="followers" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Network
            </TabsTrigger>
          </TabsList>
        </motion.div>
      </Tabs>
    </div>
  );
}
