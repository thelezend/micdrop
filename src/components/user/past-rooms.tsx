import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { TypographyMuted, TypographySmall } from "@/components/typography";
import { Mic, Users, Calendar } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

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
      <div className="text-center py-12">
        <TypographyMuted>No past rooms to display</TypographyMuted>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {rooms.map((room, index) => (
        <motion.div
          key={room.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <Card className="h-full">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg font-bold line-clamp-1">
                  {room.title}
                </CardTitle>
                {room.isHost && (
                  <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
                    Host
                  </span>
                )}
              </div>
              <CardDescription className="line-clamp-2">
                {room.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{room.date}</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                  <span>{room.participantsCount}</span>
                </div>
                <div className="flex items-center">
                  <Mic className="h-4 w-4 mr-1" />
                  <span>{room.duration}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Link 
                href={`/dashboard/room/${room.id}`}
                className="text-sm text-primary hover:underline"
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
