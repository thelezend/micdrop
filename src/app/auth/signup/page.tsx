"use client";

import BrandText from "@/components/brand-text";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { childFadeInView, parentContainerFadeInView } from "@/lib/animations";
import { AnimatePresence, motion } from "framer-motion";
import { MicVocal } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

/**
 * Signup page component
 */
export default function SignupPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Handle form submission - just redirect to dashboard
  function handleCreateAccount(e: React.FormEvent) {
    e.preventDefault();
    console.log("Redirecting to dashboard");
    router.push("/dashboard");
  }

  return (
    <div className="container mx-auto max-w-md px-4 py-16">
      <motion.div
        className="mb-5 flex items-center justify-center text-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <MicVocal className="h-8 w-8 rotate-180" />
        <BrandText className="text-5xl lg:text-5xl">MicDrop</BrandText>
      </motion.div>

      <AnimatePresence>
        <motion.div {...parentContainerFadeInView(0.1)}>
          <Card>
            <CardHeader>
              <motion.div {...childFadeInView}>
                <CardTitle className="text-center text-2xl">
                  Create an Account
                </CardTitle>
                <CardDescription className="text-center">
                  Join MicDrop to start conversations that matter
                </CardDescription>
              </motion.div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreateAccount} className="space-y-4">
                <motion.div className="space-y-2" {...childFadeInView}>
                  <label htmlFor="username" className="text-sm font-medium">
                    Username
                  </label>
                  <Input
                    id="username"
                    placeholder="yourusername"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </motion.div>
                <motion.div className="space-y-2" {...childFadeInView}>
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <Input
                    id="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </motion.div>
                <motion.div className="space-y-2" {...childFadeInView}>
                  <label htmlFor="password" className="text-sm font-medium">
                    Password
                  </label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </motion.div>
                <motion.div className="space-y-2" {...childFadeInView}>
                  <label
                    htmlFor="confirmPassword"
                    className="text-sm font-medium"
                  >
                    Confirm Password
                  </label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </motion.div>
                <motion.div {...childFadeInView}>
                  <Button type="submit" className="mt-6 w-full">
                    Create Account
                  </Button>
                </motion.div>
              </form>
            </CardContent>
            <CardFooter className="flex flex-col space-y-2">
              <motion.div
                className="text-muted-foreground text-center text-sm"
                {...childFadeInView}
              >
                Already have an account?{" "}
                <Link
                  href="/dashboard"
                  className="text-primary hover:underline"
                >
                  Sign in
                </Link>
              </motion.div>
            </CardFooter>
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
