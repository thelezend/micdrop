import { Button } from "@/components/ui/button";
import { RoomSettingsDialog, RoomSettingsData } from "@/components/room/room-settings-dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { motion } from "framer-motion";
import { Camera, Mic, Plus } from "lucide-react";

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

interface HostStageBarProps {
  isRecording: boolean;
  roomTitle: string;
  roomDescription: string;
  onMuteAll: () => void;
  onInviteListener: () => void;
  onToggleRecording: () => void;
  onSaveRoomSettings: (settings: RoomSettingsData) => void;
}

/**
 * HostStageBar component provides host-only controls for managing the room
 * Includes mute all, invite listener, record room, and room settings
 */
export function HostStageBar({
  isRecording,
  roomTitle,
  roomDescription,
  onMuteAll,
  onInviteListener,
  onToggleRecording,
  onSaveRoomSettings,
}: HostStageBarProps) {
  return (
    <TooltipProvider>
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="fixed bottom-6 left-1/2 z-10 flex -translate-x-1/2 items-center justify-center gap-4 rounded-full bg-background p-2 shadow-lg"
      >
        {/* Mute All button */}
        <motion.div variants={item}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="h-12 w-12 rounded-full duration-200 hover:-translate-y-1"
                onClick={onMuteAll}
              >
                <Mic className="h-5 w-5 text-destructive" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Mute All (One-tap Silence)</p>
            </TooltipContent>
          </Tooltip>
        </motion.div>

        {/* Invite Listener button */}
        <motion.div variants={item}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="h-12 w-12 rounded-full duration-200 hover:-translate-y-1"
                onClick={onInviteListener}
              >
                <Plus className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Invite Listener to Stage / DM Link</p>
            </TooltipContent>
          </Tooltip>
        </motion.div>

        {/* Record Room toggle */}
        <motion.div variants={item}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={isRecording ? "default" : "outline"}
                size="icon"
                className="h-12 w-12 rounded-full duration-200 hover:-translate-y-1"
                onClick={onToggleRecording}
              >
                <Camera className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{isRecording ? "Stop Recording" : "Record Room"}</p>
            </TooltipContent>
          </Tooltip>
        </motion.div>

        {/* Room Settings Dialog */}
        <motion.div variants={item}>
          <Tooltip>
            <TooltipTrigger asChild>
              <span>  {/* Wrapper span since DialogTrigger already provides a button */}
                <RoomSettingsDialog
                  initialSettings={{
                    title: roomTitle,
                    description: roomDescription,
                    isPrivate: false,
                    maxSpeakers: 10,
                    recordingEnabled: isRecording,
                  }}
                  onSaveSettings={onSaveRoomSettings}
                />
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <p>Room Settings (Title, Privacy, etc.)</p>
            </TooltipContent>
          </Tooltip>
        </motion.div>
      </motion.div>
    </TooltipProvider>
  );
}
