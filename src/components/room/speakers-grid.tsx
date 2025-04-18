import { TypographySmall } from "@/components/typography";
import { UserAvatar } from "@/components/user/avatar";
import { childFadeInView, parentContainerFadeInView } from "@/lib/animations";
import { motion } from "framer-motion";
import { Crown, Mic, MicOff, UserMinus, Volume2 } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Slider } from "../ui/slider";

interface Speaker {
  id: string;
  name: string;
  avatar?: string;
  isMuted: boolean;
  isSpeaking: boolean;
  isHost: boolean;
}

interface SpeakersGridProps {
  speakers: Speaker[];
  currentUserId?: string;
  isCurrentUserHost?: boolean;
  onToggleMute?: (speakerId: string) => void;
  onAdjustVolume?: (speakerId: string, volume: number) => void;
  onMakeCoHost?: (speakerId: string) => void;
  onRemoveFromStage?: (speakerId: string) => void;
}

/**
 * SpeakersGrid component displays a grid of speakers in a voice room
 * Shows speaker avatars with mic status and speaking indicators
 * Includes tap-to-control popover for speaker controls
 */
export function SpeakersGrid({
  speakers,
  currentUserId,
  isCurrentUserHost = false,
  onToggleMute,
  onAdjustVolume,
  onMakeCoHost,
  onRemoveFromStage,
}: SpeakersGridProps) {
  return (
    <motion.div
      {...parentContainerFadeInView(0.1)}
      className="grid grid-cols-2 gap-4 p-4 sm:grid-cols-3 md:grid-cols-4"
    >
      {speakers.map((speaker) => (
        <motion.div
          key={speaker.id}
          {...childFadeInView}
          className="flex flex-col items-center"
        >
          <Popover>
            <PopoverTrigger asChild>
              <div className="cursor-pointer hover:scale-105 active:scale-95">
                <UserAvatar
                  src={speaker.avatar}
                  name={speaker.name}
                  size="lg"
                  showStatus
                  isMuted={speaker.isMuted}
                  isSpeaking={speaker.isSpeaking}
                  className="mb-2"
                />
                <TypographySmall className="text-center font-medium">
                  {speaker.name}
                </TypographySmall>
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-56 p-3">
              <div className="flex flex-col gap-3">
                {/* Mute/Unmute Button */}
                <Button
                  variant="ghost"
                  className="flex w-full items-center justify-start gap-2"
                  onClick={() => onToggleMute?.(speaker.id)}
                >
                  {speaker.isMuted ? (
                    <>
                      <MicOff className="h-4 w-4" />
                      <span>Unmute</span>
                    </>
                  ) : (
                    <>
                      <Mic className="h-4 w-4" />
                      <span>Mute</span>
                    </>
                  )}
                </Button>

                {/* Volume Slider (host-only) */}
                {(isCurrentUserHost || speaker.id === currentUserId) && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Volume2 className="h-4 w-4" />
                      <span className="text-sm">Volume</span>
                    </div>
                    <Slider
                      defaultValue={[100]}
                      max={100}
                      step={1}
                      className="w-full"
                      onValueChange={(value: number[]) =>
                        onAdjustVolume?.(speaker.id, value[0])
                      }
                    />
                  </div>
                )}

                {/* Make Co-host (only shown if current user is host and target is not) */}
                {isCurrentUserHost &&
                  !speaker.isHost &&
                  speaker.id !== currentUserId && (
                    <Button
                      variant="ghost"
                      className="flex w-full items-center justify-start gap-2"
                      onClick={() => onMakeCoHost?.(speaker.id)}
                    >
                      <Crown className="h-4 w-4" />
                      <span>Make Co-host</span>
                    </Button>
                  )}

                {/* Remove from stage (only shown if current user is host and target is not) */}
                {isCurrentUserHost && speaker.id !== currentUserId && (
                  <Button
                    variant="ghost"
                    className="text-destructive hover:text-destructive flex w-full items-center justify-start gap-2"
                    onClick={() => onRemoveFromStage?.(speaker.id)}
                  >
                    <UserMinus className="h-4 w-4" />
                    <span>Remove from stage</span>
                  </Button>
                )}
              </div>
            </PopoverContent>
          </Popover>
          {speaker.isHost && <Badge className="mt-2">Host</Badge>}
        </motion.div>
      ))}
    </motion.div>
  );
}
