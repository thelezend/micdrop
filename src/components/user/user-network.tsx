import { UserAvatar } from "@/components/user/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TypographyMuted } from "@/components/typography";
import Link from "next/link";
import { motion } from "framer-motion";

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
export function UserNetwork({ followers, following, onFollow }: UserNetworkProps) {
  return (
    <Tabs defaultValue="followers" className="w-full">
      <TabsList className="grid w-full grid-cols-2 mb-6">
        <TabsTrigger value="followers">
          Followers ({followers.length})
        </TabsTrigger>
        <TabsTrigger value="following">
          Following ({following.length})
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="followers" className="mt-0">
        {followers.length === 0 ? (
          <div className="text-center py-12">
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
      </TabsContent>
      
      <TabsContent value="following" className="mt-0">
        {following.length === 0 ? (
          <div className="text-center py-12">
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
function UserCard({ user, onFollow, index }: UserCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="flex items-center justify-between p-4 rounded-lg border bg-card"
    >
      <div className="flex items-center gap-3">
        <Link href={`/profile/${user.username}`}>
          <UserAvatar
            src={user.avatarUrl}
            name={user.displayName}
            size="md"
          />
        </Link>
        <div>
          <Link 
            href={`/profile/${user.username}`}
            className="font-medium hover:underline"
          >
            {user.displayName}
          </Link>
          <div className="text-sm text-muted-foreground">@{user.username}</div>
          <div className="text-sm line-clamp-1 max-w-xs mt-1">{user.bio}</div>
        </div>
      </div>
      
      <Button
        variant={user.isFollowing ? "outline" : "default"}
        size="sm"
        onClick={() => onFollow(user.id)}
      >
        {user.isFollowing ? "Following" : "Follow"}
      </Button>
    </motion.div>
  );
}
