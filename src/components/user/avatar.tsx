import {
  AvatarFallback,
  AvatarImage,
  Avatar as UIAvatar,
} from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Mic, MicOff } from "lucide-react";

interface AvatarProps {
  src?: string;
  name: string;
  size?: "sm" | "md" | "lg";
  showStatus?: boolean;
  isMuted?: boolean;
  isRaisingHand?: boolean;
  isSpeaking?: boolean;
  className?: string;
}

/**
 * Avatar component for displaying user profile images
 * Includes optional status indicators for microphone state
 */
export function UserAvatar({
  src,
  name,
  size = "md",
  showStatus = false,
  isMuted = false,
  isRaisingHand = false,
  isSpeaking = false,
  className,
}: AvatarProps) {
  // Get initials from name
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .substring(0, 2);

  // Determine size classes
  const sizeClasses = {
    sm: "h-8 w-8 text-xs",
    md: "h-12 w-12 text-sm",
    lg: "h-20 w-20 text-lg",
  };

  return (
    <div className={cn("relative", className)}>
      <UIAvatar
        className={cn(
          sizeClasses[size],
          isSpeaking && "ring-primary ring-2 ring-offset-2",
        )}
      >
        <AvatarImage src={src} alt={name} className="object-cover" />
        <AvatarFallback className="bg-muted">{initials}</AvatarFallback>
      </UIAvatar>

      {showStatus && (
        <div className="bg-background absolute -right-1 -bottom-1 rounded-full p-0.5">
          {isMuted ? (
            <MicOff className="text-destructive h-4 w-4" />
          ) : (
            <Mic className="text-primary h-4 w-4" />
          )}
        </div>
      )}

      {isRaisingHand && (
        <div className="absolute -top-1 -right-1 h-4 w-4 animate-pulse rounded-full bg-yellow-500" />
      )}
    </div>
  );
}
