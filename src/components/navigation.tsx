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
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-background/95 supports-[backdrop-filter]:bg-background/60 border-b backdrop-blur"
    >
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/dashboard" className="flex items-center gap-2">
            <Mic className="text-primary h-6 w-6" />
            <span className="from-primary to-secondary bg-gradient-to-r bg-clip-text text-xl font-bold text-transparent">
              MicDrop
            </span>
          </Link>
        </div>

        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "hover:text-primary flex items-center gap-2 text-sm font-medium transition-colors",
                item.active ? "text-primary" : "text-muted-foreground",
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
      <div className="bg-background fixed right-0 bottom-0 left-0 z-50 border-t md:hidden">
        <div className="grid h-16 grid-cols-3">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "hover:text-primary flex flex-col items-center justify-center gap-1 text-xs font-medium transition-colors",
                item.active ? "text-primary" : "text-muted-foreground",
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
