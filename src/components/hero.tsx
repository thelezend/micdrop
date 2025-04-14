import { TypographyH1, TypographyH2, TypographyP } from "./typography";
import { Button } from "./ui/button";
import Link from "next/link";
import { Mic, Users, MessageSquare } from "lucide-react";

const Hero = ({ className }: { className?: string }) => {
  return (
    <div className={`flex flex-col items-center justify-center max-w-4xl mx-auto px-4 py-16 ${className}`}>
      <div className="mb-8 flex items-center justify-center gap-2">
        <Mic className="h-10 w-10 text-primary" />
        <TypographyH1 className="text-4xl md:text-6xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent font-bold">MicDrop</TypographyH1>
      </div>
      
      <TypographyH2 className="text-2xl md:text-3xl text-center mb-6">Voice-based social conversations in real-time</TypographyH2>
      
      <TypographyP className="text-center text-muted-foreground mb-12 max-w-2xl">
        Join live audio rooms, connect with like-minded people, and share your thoughts on topics that matter to you. 
        No recordings, no pressure - just authentic conversations.
      </TypographyP>
      
      <div className="flex flex-col sm:flex-row gap-4 mb-16">
        <Button asChild size="lg" className="px-8">
          <Link href="/auth/signup">Get Started</Link>
        </Button>
        <Button asChild variant="outline" size="lg" className="px-8">
          <Link href="/auth/login">Sign In</Link>
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
        <FeatureCard 
          icon={<Mic className="h-8 w-8 text-primary" />}
          title="Live Voice Rooms"
          description="Join or create audio rooms on any topic and connect with people in real-time conversations."
        />
        <FeatureCard 
          icon={<Users className="h-8 w-8 text-primary" />}
          title="Community Building"
          description="Find your tribe with topic-based rooms and build meaningful connections with like-minded people."
        />
        <FeatureCard 
          icon={<MessageSquare className="h-8 w-8 text-primary" />}
          title="Authentic Interactions"
          description="Experience genuine conversations without the pressure of being recorded or permanent content."
        />
      </div>
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
  return (
    <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-card shadow-sm">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

export default Hero;
