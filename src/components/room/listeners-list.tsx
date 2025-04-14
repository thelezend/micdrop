import { UserAvatar } from "@/components/user/avatar";
import { TypographySmall } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";
import { Users } from "lucide-react";

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
 * ListenersList component displays a list of listeners in a voice room
 * Shows listener avatars and indicates if they are raising their hand
 */
export function ListenersList({ listeners, onApproveRaiseHand }: ListenersListProps) {
  const raisingHands = listeners.filter(listener => listener.isRaisingHand);
  const regularListeners = listeners.filter(listener => !listener.isRaisingHand);

  return (
    <div className="bg-card rounded-lg border shadow-sm p-4">
      <div className="flex items-center gap-2 mb-4">
        <Users className="h-5 w-5 text-muted-foreground" />
        <TypographySmall className="font-medium">
          Listeners ({listeners.length})
        </TypographySmall>
      </div>

      <ScrollArea className="h-[300px] pr-4">
        {raisingHands.length > 0 && (
          <div className="mb-4">
            <TypographySmall className="text-muted-foreground mb-2">
              Raising Hand
            </TypographySmall>
            <div className="space-y-3">
              {raisingHands.map((listener) => (
                <motion.div
                  key={listener.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <UserAvatar
                      src={listener.avatar}
                      name={listener.name}
                      size="sm"
                      isRaisingHand={true}
                    />
                    <TypographySmall>{listener.name}</TypographySmall>
                  </div>
                  {onApproveRaiseHand && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onApproveRaiseHand(listener.id)}
                    >
                      Approve
                    </Button>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        )}

        <div>
          <TypographySmall className="text-muted-foreground mb-2">
            In Room
          </TypographySmall>
          <div className="space-y-3">
            {regularListeners.map((listener) => (
              <motion.div
                key={listener.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-2"
              >
                <UserAvatar
                  src={listener.avatar}
                  name={listener.name}
                  size="sm"
                />
                <TypographySmall>{listener.name}</TypographySmall>
              </motion.div>
            ))}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
