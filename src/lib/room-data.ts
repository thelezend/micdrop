/**
 * Room data types and mock data for the MicDrop application
 * Contains interfaces, mock data, and helper functions for room management
 */

// Speaker interface
export interface Speaker {
  id: string;
  name: string;
  avatar?: string;
  isMuted: boolean;
  isSpeaking: boolean;
  isHost: boolean;
}

// Listener interface
export interface Listener {
  id: string;
  name: string;
  avatar?: string;
  isRaisingHand: boolean;
}

// Message interface
export interface Message {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  content: string;
  timestamp: Date;
}

// Room data interface
export interface RoomData {
  id: string;
  title: string;
  description: string;
  speakers: Speaker[];
  listeners: Listener[];
}

/**
 * Generate mock room data for a given room ID
 * @param roomId The ID of the room
 * @returns Mock room data
 */
export function getMockRoomData(roomId: string): RoomData {
  return {
    id: roomId,
    title: "Tech Talk: The Future of AI",
    description:
      "Join us for a discussion on the latest developments in artificial intelligence and what the future holds.",
    speakers: [
      {
        id: "current-user",
        name: "John Wick",
        avatar: "/avatars/john-wick.png",
        isMuted: false,
        isSpeaking: true,
        isHost: true,
      },
      {
        id: "speaker-2",
        name: "Maria Garcia",
        avatar: "/avatars/1.jpg",
        isMuted: true,
        isSpeaking: false,
        isHost: false,
      },
      {
        id: "speaker-3",
        name: "David Kim",
        avatar: "/avatars/3.jpg",
        isMuted: false,
        isSpeaking: false,
        isHost: false,
      },
    ],
    listeners: [
      {
        id: "listener-1",
        name: "Sarah Chen",
        avatar: "/avatars/4.jpg",
        isRaisingHand: true,
      },
      {
        id: "listener-2",
        name: "James Wilson",
        avatar: "/avatars/5.jpg",
        isRaisingHand: false,
      },
      {
        id: "listener-3",
        name: "Emma Brown",
        avatar: "/avatars/6.jpg",
        isRaisingHand: false,
      },
      {
        id: "listener-4",
        name: "Michael Davis",
        avatar: "/avatars/7.jpg",
        isRaisingHand: true,
      },
      {
        id: "listener-5",
        name: "Alex Johnson",
        avatar: "/avatars/2.jpg",
        isRaisingHand: false,
      },
    ],
  };
}

/**
 * Generate mock messages for a room
 * @returns Array of mock messages
 */
export function getMockMessages(): Message[] {
  return [
    {
      id: "msg-1",
      userId: "speaker-1",
      userName: "Alex Johnson",
      userAvatar: "/avatars/2.jpg",
      content:
        "Welcome everyone to our discussion on AI! Feel free to raise your hand if you'd like to join as a speaker.",
      timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
    },
    {
      id: "msg-2",
      userId: "listener-2",
      userName: "James Wilson",
      userAvatar: "/avatars/5.jpg",
      content:
        "Thanks for hosting this! I'm looking forward to the discussion.",
      timestamp: new Date(Date.now() - 1000 * 60 * 10), // 10 minutes ago
    },
    {
      id: "msg-3",
      userId: "speaker-3",
      userName: "David Kim",
      userAvatar: "/avatars/3.jpg",
      content:
        "I'm excited to share some insights on recent developments in natural language processing.",
      timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
    },
  ];
}

/**
 * Helper function to generate a random message for testing
 * @returns A random message string
 */
export function getRandomMessage(): string {
  const messages = [
    "I think the future of AI is going to be fascinating!",
    "Has anyone read the latest paper on transformer models?",
    "What are your thoughts on AI regulation?",
    "I'm curious about how AI will impact job markets in the next decade.",
    "The progress in generative models has been incredible lately.",
    "Do you think we'll achieve AGI in our lifetime?",
    "I'm working on a project using reinforcement learning.",
    "What frameworks are you all using for your AI projects?",
    "The ethical implications of AI are something we need to discuss more.",
    "I'm excited about the potential of AI in healthcare.",
  ];

  return messages[Math.floor(Math.random() * messages.length)];
}

/**
 * Room management functions
 */

/**
 * Toggle mute status for a speaker
 * @param roomData Current room data
 * @param speakerId ID of the speaker to toggle mute for
 * @returns Updated room data with toggled mute status
 */
export function toggleSpeakerMute(
  roomData: RoomData,
  speakerId: string,
): {
  updatedRoomData: RoomData;
  speaker: Speaker | undefined;
  newMuteState: boolean;
} {
  // Find the speaker
  const speaker = roomData.speakers.find((s) => s.id === speakerId);
  if (!speaker)
    return {
      updatedRoomData: roomData,
      speaker: undefined,
      newMuteState: false,
    };

  // Toggle mute state
  const newMuteState = !speaker.isMuted;

  // Update speaker in the list
  const updatedRoomData = {
    ...roomData,
    speakers: roomData.speakers.map((s) =>
      s.id === speakerId ? { ...s, isMuted: newMuteState } : s,
    ),
  };

  return { updatedRoomData, speaker, newMuteState };
}

/**
 * Make a speaker a co-host
 * @param roomData Current room data
 * @param speakerId ID of the speaker to make co-host
 * @returns Updated room data with the speaker as co-host
 */
export function makeSpeakerCoHost(
  roomData: RoomData,
  speakerId: string,
): {
  updatedRoomData: RoomData;
  speaker: Speaker | undefined;
} {
  // Find the speaker
  const speaker = roomData.speakers.find((s) => s.id === speakerId);
  if (!speaker) return { updatedRoomData: roomData, speaker: undefined };

  // Update speaker in the list to be a host
  const updatedRoomData = {
    ...roomData,
    speakers: roomData.speakers.map((s) =>
      s.id === speakerId ? { ...s, isHost: true } : s,
    ),
  };

  return { updatedRoomData, speaker };
}

/**
 * Remove a speaker from the stage and move them to the audience
 * @param roomData Current room data
 * @param speakerId ID of the speaker to remove
 * @returns Updated room data with the speaker moved to listeners
 */
export function removeSpeakerFromStage(
  roomData: RoomData,
  speakerId: string,
): {
  updatedRoomData: RoomData;
  speaker: Speaker | undefined;
} {
  // Find the speaker
  const speaker = roomData.speakers.find((s) => s.id === speakerId);
  if (!speaker) return { updatedRoomData: roomData, speaker: undefined };

  // Remove from speakers
  const updatedSpeakers = roomData.speakers.filter((s) => s.id !== speakerId);

  // Add to listeners
  const newListener = {
    id: speakerId,
    name: speaker.name,
    avatar: speaker.avatar,
    isRaisingHand: false,
  };

  const updatedRoomData = {
    ...roomData,
    speakers: updatedSpeakers,
    listeners: [...roomData.listeners, newListener],
  };

  return { updatedRoomData, speaker };
}

/**
 * Approve a listener's raised hand and move them to speakers
 * @param roomData Current room data
 * @param listenerId ID of the listener to approve
 * @returns Updated room data with the listener moved to speakers
 */
export function approveRaisedHand(
  roomData: RoomData,
  listenerId: string,
): {
  updatedRoomData: RoomData;
  listener: Listener | undefined;
} {
  // Find the listener
  const listener = roomData.listeners.find((l) => l.id === listenerId);
  if (!listener) return { updatedRoomData: roomData, listener: undefined };

  // Remove from listeners
  const updatedListeners = roomData.listeners.filter(
    (l) => l.id !== listenerId,
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

  const updatedRoomData = {
    ...roomData,
    listeners: updatedListeners,
    speakers: [...roomData.speakers, newSpeaker],
  };

  return { updatedRoomData, listener };
}

/**
 * Toggle raised hand status for a listener
 * @param roomData Current room data
 * @param listenerId ID of the listener to toggle raised hand for
 * @returns Updated room data with toggled raised hand status
 */
export function toggleRaisedHand(
  roomData: RoomData,
  listenerId: string,
): {
  updatedRoomData: RoomData;
  newRaisedHandState: boolean;
} {
  // Find the listener
  const listener = roomData.listeners.find((l) => l.id === listenerId);
  if (!listener)
    return { updatedRoomData: roomData, newRaisedHandState: false };

  // Toggle raised hand state
  const newRaisedHandState = !listener.isRaisingHand;

  // Update listener in the list
  const updatedRoomData = {
    ...roomData,
    listeners: roomData.listeners.map((l) =>
      l.id === listenerId ? { ...l, isRaisingHand: newRaisedHandState } : l,
    ),
  };

  return { updatedRoomData, newRaisedHandState };
}
