"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { TypographyH1, TypographyP } from "@/components/typography";
import { UserAvatar } from "@/components/user/avatar";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "sonner";
import { useTheme } from "next-themes";
import * as z from "zod";
import { motion } from "framer-motion";

/**
 * Form schema for profile settings
 */
const profileFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters" })
    .max(20, { message: "Username must be less than 20 characters" })
    .regex(/^[a-zA-Z0-9_]+$/, { message: "Username can only contain letters, numbers, and underscores" }),
  displayName: z
    .string()
    .min(2, { message: "Display name must be at least 2 characters" })
    .max(30, { message: "Display name must be less than 30 characters" }),
  bio: z
    .string()
    .max(160, { message: "Bio must be less than 160 characters" })
    .optional(),
  website: z
    .string()
    .url({ message: "Please enter a valid URL" })
    .or(z.literal(""))
    .optional(),
  twitter: z
    .string()
    .max(15, { message: "Twitter handle must be less than 15 characters" })
    .or(z.literal(""))
    .optional(),
  instagram: z
    .string()
    .max(30, { message: "Instagram handle must be less than 30 characters" })
    .or(z.literal(""))
    .optional(),
  github: z
    .string()
    .max(39, { message: "GitHub handle must be less than 39 characters" })
    .or(z.literal(""))
    .optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

/**
 * Settings page component
 * Allows users to update profile information, notification preferences, and theme
 */
export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [notificationSettings, setNotificationSettings] = useState({
    roomInvites: true,
    newFollowers: true,
    roomUpdates: false,
    appUpdates: true,
  });
  
  // Initialize form with default values
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      username: "yourusername",
      displayName: "Your Name",
      bio: "Voice enthusiast and conversation starter. Join my rooms to discuss technology, design, and the future of social media.",
      website: "https://example.com",
      twitter: "twitterhandle",
      instagram: "instagramhandle",
      github: "githubhandle",
    },
  });

  // Handle profile form submission
  function onSubmit(data: ProfileFormValues) {
    console.log("Profile form submitted:", data);
    toast("Profile updated successfully");
  }

  // Handle notification toggle
  function handleNotificationToggle(key: keyof typeof notificationSettings) {
    setNotificationSettings(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
    toast(`${key} notifications ${notificationSettings[key] ? "disabled" : "enabled"}`);
  }

  // Handle theme change
  function handleThemeChange(newTheme: string) {
    setTheme(newTheme);
    toast(`Theme changed to ${newTheme}`);
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <TypographyH1 className="text-3xl font-bold mb-6">Settings</TypographyH1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          {/* Profile Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  Update your profile information visible to other users
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="flex items-center gap-4 mb-6">
                      <UserAvatar
                        name={form.getValues("displayName")}
                        size="lg"
                      />
                      <Button variant="outline" type="button">
                        Change Avatar
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                              <Input placeholder="username" {...field} />
                            </FormControl>
                            <FormDescription>
                              Your unique username on the platform
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="displayName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Display Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Your Name" {...field} />
                            </FormControl>
                            <FormDescription>
                              Your name as shown to others
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="bio"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Bio</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Tell others about yourself"
                              className="resize-none"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Brief description for your profile (max 160 characters)
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Separator />
                    
                    <TypographyP className="font-medium">Social Links</TypographyP>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="website"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Website</FormLabel>
                            <FormControl>
                              <Input placeholder="https://example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="twitter"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Twitter</FormLabel>
                            <FormControl>
                              <Input placeholder="username" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="instagram"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Instagram</FormLabel>
                            <FormControl>
                              <Input placeholder="username" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="github"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>GitHub</FormLabel>
                            <FormControl>
                              <Input placeholder="username" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <Button type="submit">Save Changes</Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </motion.div>
          
          {/* Notification Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>
                  Manage how and when you receive notifications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Room Invites</h4>
                      <p className="text-sm text-muted-foreground">
                        Get notified when someone invites you to a room
                      </p>
                    </div>
                    <Switch
                      checked={notificationSettings.roomInvites}
                      onCheckedChange={() => handleNotificationToggle("roomInvites")}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">New Followers</h4>
                      <p className="text-sm text-muted-foreground">
                        Get notified when someone follows you
                      </p>
                    </div>
                    <Switch
                      checked={notificationSettings.newFollowers}
                      onCheckedChange={() => handleNotificationToggle("newFollowers")}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Room Updates</h4>
                      <p className="text-sm text-muted-foreground">
                        Get notified about updates to rooms you've joined
                      </p>
                    </div>
                    <Switch
                      checked={notificationSettings.roomUpdates}
                      onCheckedChange={() => handleNotificationToggle("roomUpdates")}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">App Updates</h4>
                      <p className="text-sm text-muted-foreground">
                        Get notified about new features and updates
                      </p>
                    </div>
                    <Switch
                      checked={notificationSettings.appUpdates}
                      onCheckedChange={() => handleNotificationToggle("appUpdates")}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
        
        {/* Theme Settings */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>
                Customize how MicDrop looks for you
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-3">Theme</h4>
                  <div className="grid grid-cols-3 gap-2">
                    <Button
                      variant={theme === "light" ? "default" : "outline"}
                      className="w-full"
                      onClick={() => handleThemeChange("light")}
                    >
                      Light
                    </Button>
                    <Button
                      variant={theme === "dark" ? "default" : "outline"}
                      className="w-full"
                      onClick={() => handleThemeChange("dark")}
                    >
                      Dark
                    </Button>
                    <Button
                      variant={theme === "system" ? "default" : "outline"}
                      className="w-full"
                      onClick={() => handleThemeChange("system")}
                    >
                      System
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
