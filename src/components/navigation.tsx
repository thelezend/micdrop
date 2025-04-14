"use client";

import { Button } from "@/components/ui/button";
import { UserAvatar } from "@/components/user/avatar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Mic, User, Settings, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

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
      href: "/profile/you",
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
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/dashboard" className="flex items-center gap-2">
            <Mic className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              MicDrop
            </span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary",
                item.active ? "text-primary" : "text-muted-foreground"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.name}
            </Link>
          ))}

          <Button variant="ghost" size="icon" asChild>
            <Link href="/">
              <LogOut className="h-4 w-4" />
              <span className="sr-only">Log out</span>
            </Link>
          </Button>
        </nav>

        <div className="flex items-center gap-4">
          <Button variant="default" size="sm" className="hidden md:flex">
            <Mic className="mr-2 h-4 w-4" />
            New Room
          </Button>

          <Link href="/profile/you">
            <UserAvatar name="Your Name" size="sm" />
          </Link>
        </div>
      </div>

      {/* Mobile navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 border-t bg-background z-50">
        <div className="grid grid-cols-3 h-16">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center gap-1 text-xs font-medium transition-colors hover:text-primary",
                item.active ? "text-primary" : "text-muted-foreground"
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
