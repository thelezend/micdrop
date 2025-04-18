import { TypographyMuted } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserAvatar } from "@/components/user/avatar";
import {
  fadeInViewWithScale,
  popFromLeft,
  popFromRight,
  popIn,
} from "@/lib/animations";
import { motion } from "framer-motion";
import Link from "next/link";
import { Card, CardContent } from "../ui/card";

interface User {
  id: string;
  username: string;
  displayName: string;
  avatarUrl?: string;
  bio: string;
  isFollowing: boolean;
}

interface UserNetworkProps {
  followers: User[];
  following: User[];
  onFollow: (userId: string) => void;
}

/**
 * UserNetwork component displays followers and following users
 * Allows toggling between followers and following views
 */
export function UserNetwork({
  followers,
  following,
  onFollow,
}: UserNetworkProps) {
  return (
    <Tabs defaultValue="following" className="w-full">
      <motion.div {...popIn()}>
        <TabsList className="mb-6 grid w-full grid-cols-2">
          <TabsTrigger value="following">
            Following ({following.length})
          </TabsTrigger>
          <TabsTrigger value="followers">
            Followers ({followers.length})
          </TabsTrigger>
        </TabsList>
      </motion.div>

      <TabsContent value="following" className="mt-0">
        <motion.div {...fadeInViewWithScale()}>
          {following.length === 0 ? (
            <div className="py-12 text-center">
              <TypographyMuted>Not following anyone yet</TypographyMuted>
            </div>
          ) : (
            <div className="space-y-4">
              {following.map((user, index) => (
                <UserCard
                  key={user.id}
                  user={user}
                  onFollow={onFollow}
                  index={index}
                />
              ))}
            </div>
          )}
        </motion.div>
      </TabsContent>

      <TabsContent value="followers" className="mt-0">
        <motion.div {...fadeInViewWithScale()}>
          {followers.length === 0 ? (
            <div className="py-12 text-center">
              <TypographyMuted>No followers yet</TypographyMuted>
            </div>
          ) : (
            <div className="space-y-4">
              {followers.map((user, index) => (
                <UserCard
                  key={user.id}
                  user={user}
                  onFollow={onFollow}
                  index={index}
                />
              ))}
            </div>
          )}
        </motion.div>
      </TabsContent>
    </Tabs>
  );
}

interface UserCardProps {
  user: User;
  onFollow: (userId: string) => void;
  index: number;
}

/**
 * UserCard component displays a single user in the network list
 * Shows user avatar, name, bio, and follow button
 */
function UserCard({ user, onFollow }: UserCardProps) {
  return (
    <Card>
      <CardContent className="flex items-center justify-between">
        <motion.div {...popFromLeft(0.3)} className="flex items-center gap-3">
          <Link
            href={`/profile/${user.username}`}
            className="transition-transform hover:scale-105 active:scale-95"
          >
            <UserAvatar
              src={user.avatarUrl}
              name={user.displayName}
              size="md"
            />
          </Link>
          <div>
            <Link
              href={`/profile/${user.username}`}
              className="font-medium transition-transform hover:scale-105 hover:underline active:scale-95"
            >
              {user.displayName}
            </Link>
            <div className="text-muted-foreground text-sm">
              @{user.username}
            </div>
            <div className="mt-1 line-clamp-1 max-w-xs text-sm">{user.bio}</div>
          </div>
        </motion.div>

        <motion.div {...popFromRight(0.6)}>
          <Button
            variant={user.isFollowing ? "outline" : "default"}
            size="sm"
            onClick={() => onFollow(user.id)}
          >
            {user.isFollowing ? "Following" : "Follow"}
          </Button>
        </motion.div>
      </CardContent>
    </Card>
  );
}
