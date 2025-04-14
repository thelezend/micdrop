import { UserAvatar } from "@/components/user/avatar";
import { TypographySmall } from "@/components/typography";
import { motion } from "framer-motion";

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
}

/**
 * SpeakersGrid component displays a grid of speakers in a voice room
 * Shows speaker avatars with mic status and speaking indicators
 */
export function SpeakersGrid({ speakers }: SpeakersGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4">
      {speakers.map((speaker) => (
        <motion.div
          key={speaker.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col items-center"
        >
          <UserAvatar
            src={speaker.avatar}
            name={speaker.name}
            size="lg"
            showStatus
            isMuted={speaker.isMuted}
            isSpeaking={speaker.isSpeaking}
            className="mb-2"
          />
          <TypographySmall className="font-medium text-center">
            {speaker.name}
            {speaker.isHost && (
              <span className="ml-1 px-1.5 py-0.5 bg-primary/10 text-primary text-xs rounded-full">
                Host
              </span>
            )}
          </TypographySmall>
        </motion.div>
      ))}
    </div>
  );
}
