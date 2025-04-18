import { TypographySmall } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { UserAvatar } from "@/components/user/avatar";
import { motion } from "framer-motion";
import {
  Flag,
  MessageSquare,
  User,
  UserPlus,
  Users,
  VolumeX,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { childFadeInView, parentContainerFadeInView } from "@/lib/animations";

interface Listener {
  id: string;
  name: string;
  avatar?: string;
  isRaisingHand: boolean;
}

interface ListenersListProps {
  listeners: Listener[];
  onApproveRaiseHand?: (listenerId: string) => void;
  isCurrentUserHost?: boolean;
  currentUserId?: string;
}

/**
 * ListenersList component displays a grid of listeners in a voice room
 * Shows listener avatars and indicates if they are raising their hand
 * Uses a grid layout similar to speakers grid for visual consistency
 */
export function ListenersList({
  listeners,
  onApproveRaiseHand,
  isCurrentUserHost = false,
  currentUserId,
}: ListenersListProps) {
  // Sort listeners to show those raising hands first
  const sortedListeners = [...listeners].sort((a, b) => {
    if (a.isRaisingHand && !b.isRaisingHand) return -1;
    if (!a.isRaisingHand && b.isRaisingHand) return 1;
    return 0;
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="text-muted-foreground h-5 w-5" />
          Listeners ({listeners.length})
        </CardTitle>
      </CardHeader>

      <CardContent>
        <motion.div
          {...parentContainerFadeInView(0.1)}
          className="grid grid-cols-2 gap-4 p-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6"
        >
          {sortedListeners.map((listener) => (
            <motion.div
              key={listener.id}
              {...childFadeInView}
              className="relative flex flex-col items-center"
            >
              <Popover>
                <PopoverTrigger asChild>
                  <div className="cursor-pointer hover:scale-105 active:scale-95">
                    <UserAvatar
                      src={listener.avatar}
                      name={listener.name}
                      size="lg"
                      isRaisingHand={listener.isRaisingHand}
                      className="mb-2"
                    />
                    <TypographySmall className="text-center font-medium">
                      {listener.name}
                    </TypographySmall>
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-56 p-3">
                  <div className="flex flex-col gap-3">
                    {/* View Profile */}
                    <Link href="/profile/johnwick" className="w-full" passHref>
                      <Button
                        variant="ghost"
                        className="flex w-full items-center justify-start gap-2"
                      >
                        <User className="h-4 w-4" />
                        <span>View Profile</span>
                      </Button>
                    </Link>

                    {/* Direct Message */}
                    <Button
                      variant="ghost"
                      className="flex w-full items-center justify-start gap-2"
                      onClick={() => {
                        toast.info(`Starting chat with ${listener.name}`, {
                          duration: 2000,
                        });
                        // In a real app, this would open the DM interface
                      }}
                    >
                      <MessageSquare className="h-4 w-4" />
                      <span>Direct Message</span>
                    </Button>

                    {/* Invite to Stage - only show for hosts or moderators and for users raising hand */}
                    {isCurrentUserHost &&
                      listener.isRaisingHand &&
                      onApproveRaiseHand && (
                        <Button
                          variant="ghost"
                          className="flex w-full items-center justify-start gap-2"
                          onClick={() => onApproveRaiseHand(listener.id)}
                        >
                          <UserPlus className="h-4 w-4" />
                          <span>Invite to Stage</span>
                        </Button>
                      )}

                    {/* Mute Listener - only show for hosts or moderators */}
                    {isCurrentUserHost && listener.id !== currentUserId && (
                      <Button
                        variant="ghost"
                        className="flex w-full items-center justify-start gap-2"
                        onClick={() => {
                          toast.success(`${listener.name} has been muted`, {
                            duration: 2000,
                          });
                          // In a real app, this would mute the listener
                        }}
                      >
                        <VolumeX className="h-4 w-4" />
                        <span>Mute Listener</span>
                      </Button>
                    )}

                    {/* Report User - available for everyone */}
                    <Button
                      variant="ghost"
                      className="text-destructive hover:text-destructive flex w-full items-center justify-start gap-2"
                      onClick={() => {
                        toast.success(`Report submitted`, {
                          description: `Thank you for helping to keep the community safe`,
                          duration: 3000,
                        });
                        // In a real app, this would open a report dialog
                      }}
                    >
                      <Flag className="h-4 w-4" />
                      <span>Report User</span>
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>

              {/* Show a visible badge for users raising hand */}
              {listener.isRaisingHand && (
                <Badge variant="outline" className="mt-2">
                  Raised Hand
                </Badge>
              )}
            </motion.div>
          ))}
        </motion.div>
      </CardContent>
    </Card>
  );
}
