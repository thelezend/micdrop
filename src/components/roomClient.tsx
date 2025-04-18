"use client";

import { ChatPanel } from "@/components/room/chat-panel";
import { EmojiReactions } from "@/components/room/emoji-reactions";
import { HostStageBar } from "@/components/room/host-stage-bar";
import { ListenersList } from "@/components/room/listeners-list";
import { RoomControls } from "@/components/room/room-controls";
import { RoomSettingsData } from "@/components/room/room-settings-dialog";
import { SpeakersGrid } from "@/components/room/speakers-grid";
import { TypographyH1, TypographyP } from "@/components/typography";
import {
  approveRaisedHand,
  getMockMessages,
  getMockRoomData,
  getRandomMessage as getRandomMessageFromLib,
  makeSpeakerCoHost,
  removeSpeakerFromStage,
  toggleRaisedHand,
  toggleSpeakerMute,
  type Message,
  type RoomData,
} from "@/lib/room-data";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  fadeInFromLeft,
  fadeInFromRight,
  fadeInView,
  fadeInViewWithScale,
  popFromLeft,
} from "@/lib/animations";

// Type definition for emoji reaction events
type EmojiReaction = {
  id: string;
  userId: string;
  userName: string;
  emoji: string;
  timestamp: Date;
};

const RoomClient = ({
  classname,
  roomId,
}: {
  classname?: string;
  roomId: string;
}) => {
  const router = useRouter();

  // User state
  const [isMuted, setIsMuted] = useState(true);
  const [isRaisingHand, setIsRaisingHand] = useState(false);
  const [isSpeaker, setIsSpeaker] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [currentUserId] = useState("current-user"); // Mock current user ID

  // Room data (from mock data service)
  const [roomData, setRoomData] = useState<RoomData>(getMockRoomData(roomId));

  // Chat messages (from mock data service)
  const [messages, setMessages] = useState<Message[]>(getMockMessages());

  // Reactions (only needed for broadcasting to other users in a real app)
  // This state isn't directly used in our UI but would be used with WebSockets in a real app
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [reactions, setReactions] = useState<EmojiReaction[]>([]);

  // Handle toggle mute for current user
  const handleToggleMute = () => {
    setIsMuted(!isMuted);

    toast.success(isMuted ? "Microphone unmuted" : "Microphone muted", {
      duration: 2000,
    });

    // Update current user in speakers list if they're a speaker
    if (isSpeaker) {
      // Use the utility function from room-data.ts
      const { updatedRoomData } = toggleSpeakerMute(roomData, currentUserId);
      setRoomData(updatedRoomData);
    }
  };

  // Handle toggle mute for any speaker
  const handleToggleSpeakerMute = (speakerId: string) => {
    // Use the utility function from room-data.ts
    const { updatedRoomData, speaker, newMuteState } = toggleSpeakerMute(
      roomData,
      speakerId,
    );

    // If speaker not found, return early
    if (!speaker) return;

    // Update room data
    setRoomData(updatedRoomData);

    // Show toast notification
    toast.success(
      newMuteState
        ? `${speaker.name} has been muted`
        : `${speaker.name} has been unmuted`,
      { duration: 2000 },
    );

    // If this is the current user, also update the isMuted state
    if (speakerId === currentUserId) {
      setIsMuted(newMuteState);
    }
  };

  // Handle adjust volume for a speaker
  const handleAdjustSpeakerVolume = (speakerId: string, volume: number) => {
    // In a real app, this would adjust the audio volume for this speaker
    console.log(`Adjusting volume for ${speakerId} to ${volume}%`);

    // Show toast notification
    toast.success(`Volume adjusted to ${volume}%`, { duration: 1500 });
  };

  // Handle make co-host
  const handleMakeCoHost = (speakerId: string) => {
    // Use the utility function from room-data.ts
    const { updatedRoomData, speaker } = makeSpeakerCoHost(roomData, speakerId);

    // If speaker not found, return early
    if (!speaker) return;

    // Update room data
    setRoomData(updatedRoomData);

    // Show toast notification
    toast.success(`${speaker.name} is now a co-host`, { duration: 2000 });
  };

  // Handle remove from stage
  const handleRemoveFromStage = (speakerId: string) => {
    // Use the utility function from room-data.ts
    const { updatedRoomData, speaker } = removeSpeakerFromStage(
      roomData,
      speakerId,
    );

    // If speaker not found, return early
    if (!speaker) return;

    // Update room data
    setRoomData(updatedRoomData);

    // Show toast notification
    toast.success(`${speaker.name} has been moved to the audience`, {
      duration: 2000,
    });
  };

  // Handle raise hand
  const handleRaiseHand = () => {
    setIsRaisingHand(!isRaisingHand);

    toast.success(isRaisingHand ? "Hand lowered" : "Hand raised", {
      description: isRaisingHand
        ? ""
        : "The host will be notified of your request to speak",
      duration: 3000,
    });

    // Find the current user in the listeners list and toggle their raised hand status
    const { updatedRoomData } = toggleRaisedHand(roomData, currentUserId);
    setRoomData(updatedRoomData);
  };

  // Handle leave room
  const handleLeaveRoom = () => {
    toast.success("Left the room", {
      duration: 2000,
    });

    // Navigate back to dashboard
    router.push("/dashboard");
  };

  // Handle mute all (host only)
  const handleMuteAll = () => {
    // Update all speakers to be muted
    const updatedSpeakers = roomData.speakers.map((speaker) => ({
      ...speaker,
      isMuted: true,
    }));

    setRoomData({
      ...roomData,
      speakers: updatedSpeakers,
    });

    // Update current user's mute state if they're a speaker
    if (isSpeaker) {
      setIsMuted(true);
    }

    toast.success("All speakers have been muted", {
      duration: 2000,
    });
  };

  // Handle invite listener to stage
  const handleInviteListener = () => {
    // In a real app, this would open a modal to select listeners or generate an invite link
    toast.success("Invitation functionality", {
      description:
        "This would open a selection modal or generate a sharable link",
      duration: 3000,
    });
  };

  // Handle toggle room recording
  const handleToggleRecording = () => {
    setIsRecording(!isRecording);

    toast.success(isRecording ? "Recording stopped" : "Recording started", {
      duration: 2000,
    });
  };

  // Handle save room settings
  const handleSaveRoomSettings = (settings: RoomSettingsData) => {
    // Update room data with new settings
    setRoomData({
      ...roomData,
      title: settings.title,
      description: settings.description,
    });

    // Set recording state if it changed
    if (settings.recordingEnabled !== isRecording) {
      setIsRecording(settings.recordingEnabled);
    }

    toast.success("Room settings updated", {
      description: "Your changes have been saved",
      duration: 3000,
    });
  };

  // Handle approve raise hand
  const handleApproveRaiseHand = (listenerId: string) => {
    // Use the utility function from room-data.ts
    const { updatedRoomData, listener } = approveRaisedHand(
      roomData,
      listenerId,
    );

    // If listener not found, return early
    if (!listener) return;

    // Update room data
    setRoomData(updatedRoomData);

    toast.success(`${listener.name} is now a speaker`, {
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
      userName: "johnwick",
      userAvatar: "/avatars/john-wick.png",
      content,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
  };

  // Handle sending emoji reactions
  const handleSendReaction = (emoji: string) => {
    // Find the current user's name
    let userName = "johnwick";
    const userInSpeakers = roomData.speakers.find(
      (s) => s.id === currentUserId,
    );
    const userInListeners = roomData.listeners.find(
      (l) => l.id === currentUserId,
    );

    if (userInSpeakers) {
      userName = userInSpeakers.name;
    } else if (userInListeners) {
      userName = userInListeners.name;
    }

    // Create the reaction object
    const newReaction: EmojiReaction = {
      id: `reaction-${Date.now()}`,
      userId: currentUserId,
      userName,
      emoji,
      timestamp: new Date(),
    };

    // Add to reactions (in a real app, this would be broadcast to other users)
    setReactions((prev) => [...prev, newReaction]);

    // In a real app with WebSockets, you would broadcast this reaction to all users
    // For now, we'll just use the local display handled by the EmojiReactions component
  };

  // Simulate a new message coming in occasionally
  useEffect(() => {
    const messageInterval = setInterval(() => {
      const randomSpeakerId =
        roomData.speakers[Math.floor(Math.random() * roomData.speakers.length)]
          .id;
      const randomSpeaker = roomData.speakers.find(
        (s) => s.id === randomSpeakerId,
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
    <div className={cn("container mx-auto py-8", classname)}>
      {/* Show host stage bar if current user is a host */}
      {roomData.speakers.some((s) => s.id === currentUserId && s.isHost) && (
        <HostStageBar
          isRecording={isRecording}
          roomTitle={roomData.title}
          roomDescription={roomData.description}
          onMuteAll={handleMuteAll}
          onInviteListener={handleInviteListener}
          onToggleRecording={handleToggleRecording}
          onSaveRoomSettings={handleSaveRoomSettings}
        />
      )}

      <motion.div {...fadeInView()}>
        <TypographyH1 className="mb-2 text-2xl font-bold md:text-3xl">
          {roomData.title}
        </TypographyH1>
        <TypographyP className="text-muted-foreground mb-6">
          {roomData.description}
        </TypographyP>
      </motion.div>

      <div className="flex flex-col gap-6 md:flex-row">
        <div className="flex flex-2/3 flex-col gap-6">
          {/* Speakers Section */}
          <motion.div {...fadeInFromLeft(0.3)}>
            <Card>
              <CardHeader className="border-b">
                <CardTitle>Speakers</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <AnimatePresence>
                  <SpeakersGrid
                    speakers={roomData.speakers}
                    currentUserId={currentUserId}
                    isCurrentUserHost={roomData.speakers.some(
                      (s) => s.id === currentUserId && s.isHost,
                    )}
                    onToggleMute={handleToggleSpeakerMute}
                    onAdjustVolume={handleAdjustSpeakerVolume}
                    onMakeCoHost={handleMakeCoHost}
                    onRemoveFromStage={handleRemoveFromStage}
                  />
                </AnimatePresence>

                {/* Controls row - contains room controls and emoji reactions */}
                <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                  {/* Emoji Reactions */}
                  <motion.div {...popFromLeft(1)}>
                    <EmojiReactions onSendReaction={handleSendReaction} />
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
              </CardContent>
            </Card>
          </motion.div>

          {/* Listeners Section */}
          <motion.div {...fadeInViewWithScale(0.3)}>
            <ListenersList
              listeners={roomData.listeners}
              currentUserId={currentUserId}
              isCurrentUserHost={roomData.speakers.some(
                (s) => s.id === currentUserId && s.isHost,
              )}
              onApproveRaiseHand={
                roomData.speakers.some(
                  (s) => s.id === currentUserId && s.isHost,
                )
                  ? handleApproveRaiseHand
                  : undefined
              }
            />
          </motion.div>
        </div>

        {/* Chat Section */}
        <motion.div
          {...fadeInFromRight(0.3)}
          className="flex-1/3 space-y-6 overflow-auto"
        >
          <ChatPanel messages={messages} onSendMessage={handleSendMessage} />
        </motion.div>
      </div>
    </div>
  );
};

// Helper function to generate random messages - using imported function from room-data.ts
const getRandomMessage = () => {
  return getRandomMessageFromLib();
};

export default RoomClient;
