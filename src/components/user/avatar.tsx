import { cn } from "@/lib/utils";
import { Avatar as UIAvatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
      <UIAvatar className={cn(sizeClasses[size], isSpeaking && "ring-2 ring-primary ring-offset-2")}>
        <AvatarImage src={src} alt={name} />
        <AvatarFallback className="bg-muted">{initials}</AvatarFallback>
      </UIAvatar>
      
      {showStatus && (
        <div className="absolute -bottom-1 -right-1 rounded-full bg-background p-0.5">
          {isMuted ? (
            <MicOff className="h-4 w-4 text-destructive" />
          ) : (
            <Mic className="h-4 w-4 text-primary" />
          )}
        </div>
      )}
      
      {isRaisingHand && (
        <div className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-yellow-500 animate-pulse" />
      )}
    </div>
  );
}
