import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MicVocal } from "lucide-react";
import Link from "next/link";
import BrandText from "./brand-text";
import { GitHubIcon, InstagramIcon, XIcon, YouTubeIcon } from "./logos";

/**
 * Footer component with social media links
 * @param className - Additional CSS classes to apply to the footer
 */
const Footer = ({ className }: { className?: string }) => {
  // Social media links configuration
  const socialLinks = [
    { icon: XIcon, href: "https://x.com/the_lezend", label: "X" },
    { icon: GitHubIcon, href: "https://github.com/thelezend", label: "GitHub" },
    { icon: YouTubeIcon, label: "YouTube" },
    { icon: InstagramIcon, label: "Instagram" },
  ];

  return (
    <footer className={cn("w-full border-t-2 bg-stone-950", className)}>
      <div className="container mx-auto flex flex-col items-center justify-center gap-4 py-6">
        <div className="flex items-center">
          <MicVocal className="rotate-180 transform" />
          <BrandText className="text-3xl lg:text-3xl">MicDrop</BrandText>
        </div>
        <div className="flex items-center space-x-4">
          {socialLinks.map((social, index) => {
            const Icon = social.icon;
            return (
              <Button
                key={index}
                variant="outline"
                size="icon"
                className="rounded-full duration-200 hover:-translate-y-1"
                asChild
                aria-label={social.label}
              >
                <Link
                  href={social.href || ""}
                  target={social.href ? "_blank" : "_self"}
                  rel="noopener noreferrer"
                >
                  <Icon className="h-5 w-5" />
                </Link>
              </Button>
            );
          })}
        </div>

        <span className="text-center text-sm text-gray-500">
          © 2025 Micdrop. All rights reserved. <br />
          Dropped by Navaneeth Dev 🎤
        </span>
      </div>
    </footer>
  );
};

export default Footer;
