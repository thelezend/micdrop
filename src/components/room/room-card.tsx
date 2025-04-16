import { TypographySmall } from "@/components/typography";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Mic, Users } from "lucide-react";
import Link from "next/link";
import { Badge } from "../ui/badge";
import { MultiTooltip } from "../ui/multi-tooltip";

interface RoomCardProps {
  id: string;
  title: string;
  description: string;
  speakers: {
    id: number;
    name: string;
    image: string;
  }[];
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
  speakers,
  listenersCount,
  isLive,
  tags = [],
}: RoomCardProps) {
  return (
    <Card className="h-full w-full overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <CardTitle className="line-clamp-2 text-lg font-bold">
            {title}
          </CardTitle>
          {isLive && (
            <span className="flex items-center rounded-full bg-red-500 px-2 py-1 text-xs font-semibold text-white">
              <span className="mr-1 h-2 w-2 animate-pulse rounded-full bg-white"></span>
              LIVE
            </span>
          )}
        </div>
        <CardDescription className="line-clamp-2 text-sm">
          {description}
        </CardDescription>
      </CardHeader>

      <CardContent className="pb-2">
        <div className="mb-2 flex space-x-2">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>

      <CardFooter className="flex justify-between pt-0">
        <div className="flex items-center gap-6">
          <div className="flex items-center">
            <Mic className="text-primary mr-1 h-4 w-4" />
            <MultiTooltip items={speakers} />
          </div>
          <div className="flex items-center">
            <Users className="text-primary mr-1 h-4 w-4" />
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
