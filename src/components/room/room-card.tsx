import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { TypographyMuted, TypographySmall } from "@/components/typography";
import { Mic, Users } from "lucide-react";
import Link from "next/link";

interface RoomCardProps {
  id: string;
  title: string;
  description: string;
  speakersCount: number;
  listenersCount: number;
  isLive: boolean;
  tags?: string[];
}

/**
 * RoomCard component displays information about a voice room
 * Used on the home and dashboard pages to show trending or live rooms
 */
export function RoomCard({
  id,
  title,
  description,
  speakersCount,
  listenersCount,
  isLive,
  tags = [],
}: RoomCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-bold line-clamp-1">{title}</CardTitle>
          {isLive && (
            <span className="px-2 py-1 bg-red-500 text-white text-xs font-semibold rounded-full flex items-center">
              <span className="mr-1 h-2 w-2 rounded-full bg-white animate-pulse"></span>
              LIVE
            </span>
          )}
        </div>
        <CardDescription className="line-clamp-2 text-sm">{description}</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex space-x-2 mb-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 bg-muted text-muted-foreground rounded-full text-xs"
            >
              {tag}
            </span>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-0">
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <Mic className="h-4 w-4 mr-1 text-primary" />
            <TypographySmall>{speakersCount}</TypographySmall>
          </div>
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-1 text-primary" />
            <TypographySmall>{listenersCount}</TypographySmall>
          </div>
        </div>
        <Button asChild size="sm">
          <Link href={`/dashboard/room/${id}`}>Join</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
