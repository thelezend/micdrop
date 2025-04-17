import { TypographyMuted, TypographySmall } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserAvatar } from "@/components/user/avatar";
import { AnimatePresence, motion } from "framer-motion";
import { Send } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

interface ChatMessage {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  content: string;
  timestamp: Date;
}

interface ChatPanelProps {
  messages: ChatMessage[];
  onSendMessage: (content: string) => void;
}

/**
 * ChatPanel component displays a chat interface for room participants
 * Shows message history and allows sending new messages
 */
export function ChatPanel({ messages, onSendMessage }: ChatPanelProps) {
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      onSendMessage(newMessage);
      setNewMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Chat</CardTitle>
      </CardHeader>

      <CardContent className="max-h-screen overflow-auto">
        <AnimatePresence initial={false}>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="mb-4"
            >
              <div className="flex items-start gap-2">
                <Link
                  href="/profile/johnwick"
                  className="hover:scale-105 active:scale-95"
                >
                  <UserAvatar
                    src={message.userAvatar}
                    name={message.userName}
                    size="sm"
                  />
                </Link>
                <div>
                  <div className="flex items-baseline gap-2">
                    <Link
                      href="/profile/johnwick"
                      className="hover:scale-105 hover:underline active:scale-95"
                    >
                      <TypographySmall className="font-medium">
                        {message.userName}
                      </TypographySmall>
                    </Link>
                    <TypographyMuted>
                      {formatTime(message.timestamp)}
                    </TypographyMuted>
                  </div>
                  <p className="mt-1 text-sm">{message.content}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </CardContent>

      <CardFooter className="flex items-center gap-2">
        <Input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          className="flex-1"
        />
        <Button
          size="icon"
          onClick={handleSendMessage}
          disabled={!newMessage.trim()}
        >
          <Send className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}

// Helper function to format timestamp
function formatTime(date: Date): string {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}
