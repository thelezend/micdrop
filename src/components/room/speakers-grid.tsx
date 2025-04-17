import { TypographySmall } from "@/components/typography";
import { UserAvatar } from "@/components/user/avatar";
import { motion } from "framer-motion";
import Link from "next/link";
import { Badge } from "../ui/badge";

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
  hidden: { opacity: 0, scale: 0.5 },
  show: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.5 },
};

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
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="grid grid-cols-2 gap-4 p-4 sm:grid-cols-3 md:grid-cols-4"
    >
      {speakers.map((speaker) => (
        <motion.div
          key={speaker.id}
          variants={item}
          className="flex flex-col items-center"
        >
          <Link
            href="/profile/johnwick"
            className="hover:scale-105 hover:underline active:scale-95"
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
            <TypographySmall className="text-center font-medium">
              {speaker.name}
            </TypographySmall>
          </Link>
          {speaker.isHost && <Badge className="mt-2">Host</Badge>}
        </motion.div>
      ))}
    </motion.div>
  );
}
