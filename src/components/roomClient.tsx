"use client";

import { ChatPanel } from "@/components/room/chat-panel";
import { ListenersList } from "@/components/room/listeners-list";
import { RoomControls } from "@/components/room/room-controls";
import { SpeakersGrid } from "@/components/room/speakers-grid";
import { TypographyH1, TypographyP } from "@/components/typography";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const RoomClient = ({
  classname,
  roomId,
}: {
  classname: string;
  roomId: string;
}) => {
  const router = useRouter();

  // User state
  const [isMuted, setIsMuted] = useState(true);
  const [isRaisingHand, setIsRaisingHand] = useState(false);
  const [isSpeaker, setIsSpeaker] = useState(false);
  const [currentUserId] = useState("current-user"); // Mock current user ID

  // Room data (mock)
  const [roomData, setRoomData] = useState({
    id: roomId,
    title: "Tech Talk: The Future of AI",
    description:
      "Join us for a discussion on the latest developments in artificial intelligence and what the future holds.",
    speakers: [
      {
        id: "speaker-1",
        name: "Alex Johnson",
        avatar: undefined,
        isMuted: false,
        isSpeaking: true,
        isHost: true,
      },
      {
        id: "speaker-2",
        name: "Maria Garcia",
        avatar: undefined,
        isMuted: true,
        isSpeaking: false,
        isHost: false,
      },
      {
        id: "speaker-3",
        name: "David Kim",
        avatar: undefined,
        isMuted: false,
        isSpeaking: false,
        isHost: false,
      },
    ],
    listeners: [
      {
        id: "listener-1",
        name: "Sarah Chen",
        avatar: undefined,
        isRaisingHand: true,
      },
      {
        id: "listener-2",
        name: "James Wilson",
        avatar: undefined,
        isRaisingHand: false,
      },
      {
        id: "listener-3",
        name: "Emma Brown",
        avatar: undefined,
        isRaisingHand: false,
      },
      {
        id: "listener-4",
        name: "Michael Davis",
        avatar: undefined,
        isRaisingHand: true,
      },
      {
        id: "current-user",
        name: "You",
        avatar: undefined,
        isRaisingHand: isRaisingHand,
      },
    ],
  });

  // Chat messages (mock)
  const [messages, setMessages] = useState([
    {
      id: "msg-1",
      userId: "speaker-1",
      userName: "Alex Johnson",
      userAvatar: undefined,
      content:
        "Welcome everyone to our discussion on AI! Feel free to raise your hand if you'd like to join as a speaker.",
      timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
    },
    {
      id: "msg-2",
      userId: "listener-2",
      userName: "James Wilson",
      userAvatar: undefined,
      content:
        "Thanks for hosting this! I'm looking forward to the discussion.",
      timestamp: new Date(Date.now() - 1000 * 60 * 10), // 10 minutes ago
    },
    {
      id: "msg-3",
      userId: "speaker-3",
      userName: "David Kim",
      userAvatar: undefined,
      content:
        "I'm excited to share some insights on recent developments in natural language processing.",
      timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
    },
  ]);

  // Handle toggle mute
  const handleToggleMute = () => {
    setIsMuted(!isMuted);

    toast(isMuted ? "Microphone unmuted" : "Microphone muted", {
      duration: 2000,
    });

    // Update current user in speakers list if they're a speaker
    if (isSpeaker) {
      setRoomData((prev) => ({
        ...prev,
        speakers: prev.speakers.map((speaker) =>
          speaker.id === currentUserId
            ? { ...speaker, isMuted: !isMuted }
            : speaker
        ),
      }));
    }
  };

  // Handle raise hand
  const handleRaiseHand = () => {
    setIsRaisingHand(!isRaisingHand);

    toast(isRaisingHand ? "Hand lowered" : "Hand raised", {
      description: isRaisingHand
        ? ""
        : "The host will be notified of your request to speak",
      duration: 3000,
    });

    // Update current user in listeners list
    setRoomData((prev) => ({
      ...prev,
      listeners: prev.listeners.map((listener) =>
        listener.id === currentUserId
          ? { ...listener, isRaisingHand: !isRaisingHand }
          : listener
      ),
    }));
  };

  // Handle leave room
  const handleLeaveRoom = () => {
    toast("Left the room", {
      duration: 2000,
    });

    // Navigate back to dashboard
    router.push("/dashboard");
  };

  // Handle approve raise hand
  const handleApproveRaiseHand = (listenerId: string) => {
    // Find the listener
    const listener = roomData.listeners.find((l) => l.id === listenerId);
    if (!listener) return;

    // Remove from listeners
    const updatedListeners = roomData.listeners.filter(
      (l) => l.id !== listenerId
    );

    // Add to speakers
    const newSpeaker = {
      id: listenerId,
      name: listener.name,
      avatar: listener.avatar,
      isMuted: true,
      isSpeaking: false,
      isHost: false,
    };

    setRoomData((prev) => ({
      ...prev,
      speakers: [...prev.speakers, newSpeaker],
      listeners: updatedListeners,
    }));

    toast(`${listener.name} is now a speaker`, {
      duration: 3000,
    });

    // If it was the current user, update their state
    if (listenerId === currentUserId) {
      setIsSpeaker(true);
      setIsRaisingHand(false);
    }
  };

  // Handle send message
  const handleSendMessage = (content: string) => {
    const newMessage = {
      id: `msg-${Date.now()}`,
      userId: currentUserId,
      userName: "You",
      userAvatar: undefined,
      content,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
  };

  // Simulate a new message coming in occasionally
  useEffect(() => {
    const messageInterval = setInterval(() => {
      const randomSpeakerId =
        roomData.speakers[Math.floor(Math.random() * roomData.speakers.length)]
          .id;
      const randomSpeaker = roomData.speakers.find(
        (s) => s.id === randomSpeakerId
      );

      if (randomSpeaker && randomSpeaker.id !== currentUserId) {
        const newMessage = {
          id: `msg-${Date.now()}`,
          userId: randomSpeaker.id,
          userName: randomSpeaker.name,
          userAvatar: randomSpeaker.avatar,
          content: getRandomMessage(),
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, newMessage]);
      }
    }, 45000); // Every 45 seconds

    return () => clearInterval(messageInterval);
  }, [roomData.speakers, currentUserId]);

  // Simulate speakers talking
  useEffect(() => {
    const speakingInterval = setInterval(() => {
      setRoomData((prev) => ({
        ...prev,
        speakers: prev.speakers.map((speaker) => ({
          ...speaker,
          isSpeaking:
            speaker.id !== currentUserId && !speaker.isMuted
              ? Math.random() > 0.7 // 30% chance of speaking if unmuted
              : false,
        })),
      }));
    }, 2000); // Every 2 seconds

    return () => clearInterval(speakingInterval);
  }, [currentUserId]);

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <TypographyH1 className="text-2xl md:text-3xl font-bold mb-2">
          {roomData.title}
        </TypographyH1>
        <TypographyP className="text-muted-foreground mb-6">
          {roomData.description}
        </TypographyP>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Speakers Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-card rounded-lg border shadow-sm overflow-hidden"
          >
            <div className="p-4 border-b">
              <h2 className="font-semibold">Speakers</h2>
            </div>
            <AnimatePresence>
              <SpeakersGrid speakers={roomData.speakers} />
            </AnimatePresence>
          </motion.div>

          {/* Room Controls */}
          <RoomControls
            isMuted={isMuted}
            isRaisingHand={isRaisingHand}
            isSpeaker={isSpeaker}
            onToggleMute={handleToggleMute}
            onRaiseHand={handleRaiseHand}
            onLeaveRoom={handleLeaveRoom}
          />
        </div>

        <div className="space-y-6">
          {/* Listeners Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <ListenersList
              listeners={roomData.listeners}
              onApproveRaiseHand={
                roomData.speakers.some(
                  (s) => s.id === currentUserId && s.isHost
                )
                  ? handleApproveRaiseHand
                  : undefined
              }
            />
          </motion.div>

          {/* Chat Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="h-[400px]"
          >
            <ChatPanel messages={messages} onSendMessage={handleSendMessage} />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// Helper function to generate random messages
const getRandomMessage = (): string => {
  const messages = [
    "I think AI will transform healthcare in the next decade.",
    "Has anyone looked into the latest research on transformer models?",
    "What are your thoughts on AI regulation?",
    "I'm curious about how AI will impact creative industries.",
    "The ethical implications of AI are something we need to discuss more.",
    "I've been working with GPT models recently and the progress is impressive.",
    "Does anyone have experience with reinforcement learning?",
    "I'd love to hear more about AI applications in sustainability.",
    "What do you all think about the future of work with increasing AI adoption?",
    "Are there any good resources you'd recommend for learning about AI safety?",
  ];

  return messages[Math.floor(Math.random() * messages.length)];
};

export default RoomClient;
