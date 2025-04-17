import { TypographySmall } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { UserAvatar } from "@/components/user/avatar";
import { motion } from "framer-motion";
import { Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import Link from "next/link";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20, scale: 0.9 },
  show: { opacity: 1, y: 0, scale: 1 },
};

interface Listener {
  id: string;
  name: string;
  avatar?: string;
  isRaisingHand: boolean;
}

interface ListenersListProps {
  listeners: Listener[];
  onApproveRaiseHand?: (listenerId: string) => void;
}

/**
 * ListenersList component displays a grid of listeners in a voice room
 * Shows listener avatars and indicates if they are raising their hand
 * Uses a grid layout similar to speakers grid for visual consistency
 */
export function ListenersList({
  listeners,
  onApproveRaiseHand,
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
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-2 gap-4 p-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6"
        >
          {sortedListeners.map((listener) => (
            <motion.div
              key={listener.id}
              variants={item}
              className="relative flex flex-col items-center"
            >
              <Link
                href="/profile/johnwick"
                className="hover:scale-105 hover:underline active:scale-95"
              >
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
              </Link>

              {listener.isRaisingHand && onApproveRaiseHand && (
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-2"
                  onClick={() => onApproveRaiseHand(listener.id)}
                >
                  Approve
                </Button>
              )}
            </motion.div>
          ))}
        </motion.div>
      </CardContent>
    </Card>
  );
}
