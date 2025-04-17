import { TypographyMuted } from "@/components/typography";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";
import { Calendar, Mic, Users } from "lucide-react";
import Link from "next/link";

interface PastRoom {
  id: string;
  title: string;
  description: string;
  date: string;
  participantsCount: number;
  duration: string;
  isHost: boolean;
}

interface PastRoomsProps {
  rooms: PastRoom[];
}

/**
 * PastRooms component displays a user's past room activity
 * Shows rooms they've hosted or participated in
 */
export function PastRooms({ rooms }: PastRoomsProps) {
  if (rooms.length === 0) {
    return (
      <div className="py-12 text-center">
        <TypographyMuted>No past rooms to display</TypographyMuted>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {rooms.map((room, index) => (
        <motion.div
          key={room.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <Card className="h-full">
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <CardTitle className="line-clamp-1 text-lg font-bold">
                  {room.title}
                </CardTitle>
                {room.isHost && (
                  <span className="bg-primary/10 text-primary rounded-full px-2 py-1 text-xs font-semibold">
                    Host
                  </span>
                )}
              </div>
              <CardDescription className="line-clamp-2">
                {room.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="text-muted-foreground flex items-center gap-4 text-sm">
                <div className="flex items-center">
                  <Calendar className="mr-1 h-4 w-4" />
                  <span>{room.date}</span>
                </div>
                <div className="flex items-center">
                  <Users className="mr-1 h-4 w-4" />
                  <span>{room.participantsCount}</span>
                </div>
                <div className="flex items-center">
                  <Mic className="mr-1 h-4 w-4" />
                  <span>{room.duration}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Link
                href={`/dashboard/room/${room.id}`}
                className="text-primary text-sm hover:underline"
              >
                View Recording
              </Link>
            </CardFooter>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
