import { cn } from "@/lib/utils";

const HeroText = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <span
      className={cn(
        "text-7xl lg:text-7xl font-black tracking-tight bg-gradient-to-r from-purple-600 via-pink-400 to-blue-600 bg-clip-text text-transparent animate-gradient select-none drop-shadow-lg",
        className
      )}
    >
      {children}
    </span>
  );
};

export default HeroText;
