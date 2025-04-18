"use client";

import { Button } from "@/components/ui/button";
import {
  childFadeInView,
  fadeInView,
  parentContainerFadeInView,
} from "@/lib/animations";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
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
    <motion.footer
      {...fadeInView}
      className={cn("w-full border-t-2 dark:bg-stone-950", className)}
    >
      <div className="container mx-auto flex flex-col items-center justify-center gap-4 py-6">
        <motion.div className="flex items-center">
          <MicVocal className="rotate-180" />
          <BrandText className="text-3xl lg:text-3xl">MicDrop</BrandText>
        </motion.div>

        <motion.div
          {...parentContainerFadeInView}
          className="flex items-center space-x-4"
        >
          {socialLinks.map((social, index) => {
            const Icon = social.icon;
            return (
              <motion.div key={index} {...childFadeInView}>
                <Button
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
              </motion.div>
            );
          })}
        </motion.div>

        <motion.span
          {...fadeInView}
          transition={{ delay: 0.8 }}
          className="text-center text-sm text-gray-500"
        >
          © 2025 Micdrop. All rights reserved. <br />
          Dropped by Navaneeth Dev 🎤
        </motion.span>
      </div>
    </motion.footer>
  );
};

export default Footer;
