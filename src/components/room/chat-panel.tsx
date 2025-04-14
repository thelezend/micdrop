import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { UserAvatar } from "@/components/user/avatar";
import { TypographySmall, TypographyMuted } from "@/components/typography";
import { useState } from "react";
import { Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
    <div className="flex flex-col h-full bg-card rounded-lg border shadow-sm">
      <div className="p-3 border-b">
        <TypographySmall className="font-medium">Chat</TypographySmall>
      </div>
      
      <ScrollArea className="flex-1 p-3">
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
                <UserAvatar
                  src={message.userAvatar}
                  name={message.userName}
                  size="sm"
                />
                <div>
                  <div className="flex items-baseline gap-2">
                    <TypographySmall className="font-medium">
                      {message.userName}
                    </TypographySmall>
                    <TypographyMuted>
                      {formatTime(message.timestamp)}
                    </TypographyMuted>
                  </div>
                  <p className="text-sm mt-1">{message.content}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </ScrollArea>
      
      <div className="p-3 border-t">
        <div className="flex gap-2">
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
        </div>
      </div>
    </div>
  );
}

// Helper function to format timestamp
function formatTime(date: Date): string {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}
