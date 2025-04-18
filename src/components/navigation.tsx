"use client";

import { Button } from "@/components/ui/button";
import { UserAvatar } from "@/components/user/avatar";
import { popFromTop } from "@/lib/animations";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Home, LogOut, MicVocal, Settings, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import BrandText from "./brand-text";

/**
 * Main navigation component for the app
 * Shows navigation links and user profile
 */
export function Navigation() {
  const pathname = usePathname();

  // Don't show navigation on public pages and auth pages
  if (pathname === "/" || pathname.startsWith("/auth")) {
    return null;
  }

  const navItems = [
    {
      name: "Home",
      href: "/dashboard",
      icon: Home,
      active:
        pathname === "/dashboard" || pathname.startsWith("/dashboard/room"),
    },
    {
      name: "Profile",
      href: "/profile/johnwick",
      icon: User,
      active: pathname.startsWith("/profile"),
    },
    {
      name: "Settings",
      href: "/settings",
      icon: Settings,
      active: pathname === "/settings",
    },
  ];

  return (
    <motion.div
      {...popFromTop()}
      className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur"
    >
      <div className="container mx-auto flex h-16 items-center justify-between">
        <div className="flex items-center gap-2 transition-transform hover:scale-105 active:scale-95">
          <Link href="/dashboard" className="flex items-center">
            <MicVocal className="rotate-180" />
            <BrandText className="text-2xl lg:text-2xl">MicDrop</BrandText>
          </Link>
        </div>

        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <Button
              key={item.href}
              asChild
              variant="link"
              className={item.active ? "text-primary" : "text-muted-foreground"}
            >
              <Link
                href={item.href}
                className={cn(
                  "hover:text-primary flex items-center gap-2 text-sm font-medium transition-colors",
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </Link>
            </Button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Button className="" asChild size="icon">
            <Link href="/profile/you">
              <UserAvatar name="John Wick" src="/avatars/john-wick.png" />
            </Link>
          </Button>
          <Button variant="ghost" asChild className="text-sm font-medium">
            <Link href="/">
              <LogOut className="h-4 w-4" />
              <span className="hover:text-primary text-muted-foreground transition-colors">
                Log out
              </span>
            </Link>
          </Button>
        </div>
      </div>

      {/* Mobile navigation */}
      <div className="bg-background fixed right-0 bottom-0 left-0 z-50 border-t md:hidden">
        <div className="grid h-16 grid-cols-4 items-center">
          {navItems.map((item) => (
            <Button
              key={item.href}
              asChild
              variant="link"
              className={item.active ? "text-primary" : "text-muted-foreground"}
            >
              <Link
                href={item.href}
                className={cn(
                  "hover:text-primary flex flex-col items-center justify-center gap-1 text-xs font-medium transition-colors",
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </Link>
            </Button>
          ))}
          <Button asChild variant="link">
            <Link
              href={"/"}
              className={cn(
                "hover:text-primary flex flex-col items-center justify-center gap-1 text-xs font-medium transition-colors",
              )}
            >
              <LogOut className="h-5 w-5" />
              Log out
            </Link>
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
