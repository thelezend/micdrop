import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

/**
 * EmojiReactionsProps interface
 * @property className - Optional CSS class name
 * @property onSendReaction - Callback function when an emoji is clicked
 */

interface ReactionEmoji {
  id: string;
  emoji: string;
  buttonIndex: number; // Index of the button that triggered the reaction
}

interface EmojiReactionsProps {
  className?: string;
  onSendReaction?: (emoji: string) => void;
}

/**
 * EmojiReactions component for displaying floating emoji reactions
 * and providing controls to send new reactions
 * 
 * Displays a row of emoji buttons that, when clicked, trigger animations
 * of emojis floating upward from each button.
 */
export function EmojiReactions({
  className,
  onSendReaction,
}: EmojiReactionsProps) {
  // Emoji options for quick reactions
  const emojiOptions = ["🔥", "👏", "❤️", "😂", "🎉"];
  
  // Local reactions state for display
  const [activeReactions, setActiveReactions] = useState<ReactionEmoji[]>([]);

  // Handle clicking on an emoji option
  const handleEmojiClick = (emoji: string, buttonIndex: number) => {
    if (onSendReaction) {
      onSendReaction(emoji);
    }
    
    // Also add to local display
    addReaction(emoji, buttonIndex);
  };

  // Add a reaction to the display
  const addReaction = (emoji: string, buttonIndex: number) => {
    const newReaction: ReactionEmoji = {
      id: `reaction-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      emoji,
      buttonIndex,
    };
    
    setActiveReactions((prev) => [...prev, newReaction]);
    
    // Remove reaction after animation completes
    setTimeout(() => {
      setActiveReactions((prev) => 
        prev.filter((reaction) => reaction.id !== newReaction.id)
      );
    }, 3000); // Match animation duration
  };

  return (
    <div className={cn("relative", className)}>
      {/* Emoji reaction controls with their floating emojis */}
      <div className="flex items-center justify-center">
        <div className="bg-background/10 border border-border/50 flex items-center justify-center gap-2 rounded-full p-2">
        {emojiOptions.map((emoji, index) => (
          <div key={emoji} className="relative">
            {/* Floating reactions from this button */}
            <div className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 w-20 h-80 overflow-hidden">
              <AnimatePresence>
                {activeReactions
                  .filter(reaction => reaction.buttonIndex === index && reaction.emoji === emoji)
                  .map((reaction) => (
                    <motion.div
                      key={reaction.id}
                      initial={{ opacity: 0, y: 0, scale: 1 }}
                      animate={{ 
                        opacity: [0, 1, 0.8, 0], 
                        y: -150, 
                        scale: 1.5,
                        x: Math.random() * 20 - 10, // Small random horizontal movement
                      }}
                      transition={{
                        duration: 2.5,
                        ease: "easeOut",
                      }}
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 text-3xl"
                    >
                      {reaction.emoji}
                    </motion.div>
                  ))}
              </AnimatePresence>
            </div>
            
            {/* Button */}
            <button
              onClick={() => handleEmojiClick(emoji, index)}
              className="hover:scale-125 focus:outline-none transition-transform duration-200 h-10 w-10 flex items-center justify-center text-xl rounded-full"
            >
              {emoji}
            </button>
          </div>
        ))}
        </div>
      </div>
    </div>
  );
}
