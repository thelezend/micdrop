import { UserAvatar } from "@/components/user/avatar";
import { TypographyH1, TypographyP } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Globe, Twitter, Instagram, Github, Users, Calendar } from "lucide-react";
import { motion } from "framer-motion";

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
        className="flex flex-col md:flex-row gap-6 items-center md:items-start"
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
          <TypographyH1 className="text-2xl md:text-3xl font-bold">
            {displayName}
          </TypographyH1>
          <TypographyP className="text-muted-foreground mb-4">
            @{username}
          </TypographyP>
          
          <TypographyP className="mb-4 max-w-md">
            {bio}
          </TypographyP>
          
          <div className="flex flex-wrap gap-4 justify-center md:justify-start mb-4">
            {socialLinks.website && (
              <a 
                href={socialLinks.website} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
              >
                <Globe className="h-4 w-4" />
                <span className="text-sm">Website</span>
              </a>
            )}
            
            {socialLinks.twitter && (
              <a 
                href={`https://twitter.com/${socialLinks.twitter}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
              >
                <Twitter className="h-4 w-4" />
                <span className="text-sm">Twitter</span>
              </a>
            )}
            
            {socialLinks.instagram && (
              <a 
                href={`https://instagram.com/${socialLinks.instagram}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
              >
                <Instagram className="h-4 w-4" />
                <span className="text-sm">Instagram</span>
              </a>
            )}
            
            {socialLinks.github && (
              <a 
                href={`https://github.com/${socialLinks.github}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
              >
                <Github className="h-4 w-4" />
                <span className="text-sm">GitHub</span>
              </a>
            )}
          </div>
          
          <div className="flex items-center gap-6 justify-center md:justify-start">
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">{followersCount} followers</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">{followingCount} following</span>
            </div>
          </div>
        </div>
        
        <div>
          {isCurrentUser ? (
            <Button variant="outline" asChild>
              <a href="/settings">Edit Profile</a>
            </Button>
          ) : (
            <Button 
              variant={isFollowing ? "outline" : "default"}
              onClick={onFollow}
            >
              {isFollowing ? "Following" : "Follow"}
            </Button>
          )}
        </div>
      </motion.div>
      
      <Tabs defaultValue={activeTab} className="w-full" onValueChange={onActiveTabChange}>
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
      </Tabs>
    </div>
  );
}
