import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { motion } from "framer-motion";
import { Hand, LogOut, Mic, MicOff } from "lucide-react";

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

interface RoomControlsProps {
  isMuted: boolean;
  isRaisingHand: boolean;
  isSpeaker: boolean;
  onToggleMute: () => void;
  onRaiseHand: () => void;
  onLeaveRoom: () => void;
}

/**
 * RoomControls component provides control buttons for room interactions
 * Includes mute/unmute, raise hand, and leave room controls
 */
export function RoomControls({
  isMuted,
  isRaisingHand,
  isSpeaker,
  onToggleMute,
  onRaiseHand,
  onLeaveRoom,
}: RoomControlsProps) {
  return (
    <TooltipProvider>
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="flex items-center justify-center gap-4"
      >
        {/* Mute/Unmute button */}
        <motion.div variants={item}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={isMuted ? "outline" : "default"}
                size="icon"
                className="h-12 w-12 rounded-full duration-200 hover:-translate-y-1"
                onClick={onToggleMute}
              >
                {isMuted ? (
                  <MicOff className="h-5 w-5" />
                ) : (
                  <Mic className="h-5 w-5" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{isMuted ? "Unmute" : "Mute"}</p>
            </TooltipContent>
          </Tooltip>
        </motion.div>

        {/* Raise hand button (only for listeners) */}
        {!isSpeaker && (
          <motion.div variants={item}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={isRaisingHand ? "default" : "outline"}
                  size="icon"
                  className="h-12 w-12 rounded-full duration-200 hover:-translate-y-1"
                  onClick={onRaiseHand}
                >
                  <Hand className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{isRaisingHand ? "Lower Hand" : "Raise Hand"}</p>
              </TooltipContent>
            </Tooltip>
          </motion.div>
        )}

        {/* Leave room button */}
        <motion.div variants={item}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="destructive"
                size="icon"
                className="h-12 w-12 rounded-full duration-200 hover:-translate-y-1"
                onClick={onLeaveRoom}
              >
                <LogOut className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Leave Room</p>
            </TooltipContent>
          </Tooltip>
        </motion.div>
      </motion.div>
    </TooltipProvider>
  );
}
