import {
  RoomSettingsData,
  RoomSettingsDialog,
} from "@/components/room/room-settings-dialog";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { fadeInViewWithScale } from "@/lib/animations";
import { motion } from "framer-motion";
import { Camera, Mic, Plus } from "lucide-react";

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
        {...fadeInViewWithScale(1.5)}
        className="bg-background fixed bottom-6 left-1/2 z-10 flex -translate-x-1/2 items-center justify-center gap-4 rounded-full p-2 shadow-lg"
      >
        {/* Mute All button */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="h-12 w-12 rounded-full duration-200 hover:-translate-y-1"
              onClick={onMuteAll}
            >
              <Mic className="text-destructive h-5 w-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Mute All (One-tap Silence)</p>
          </TooltipContent>
        </Tooltip>

        {/* Invite Listener button */}
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

        {/* Record Room toggle */}
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

        {/* Room Settings Dialog */}
        <Tooltip>
          <TooltipTrigger asChild>
            <span>
              {" "}
              {/* Wrapper span since DialogTrigger already provides a button */}
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
    </TooltipProvider>
  );
}
