"use client";

import { motion } from "framer-motion";
import { Lock, Plus } from "lucide-react";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { popIn } from "@/lib/animations";

/**
 * Interface for room creation data
 */
interface RoomData {
  title: string;
  description: string;
  tags: string[];
  isPrivate: boolean;
}

/**
 * CreateRoomDialog component
 * Dialog for creating new rooms with private room functionality
 */
export function CreateRoomDialog() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");

  // Handle form submission
  const handleCreateRoom = () => {
    // Create room data object
    const roomData: RoomData = {
      title,
      description,
      tags,
      isPrivate,
    };

    toast.success(`${roomData.title} room created successfully!`);

    // Reset form and close dialog
    setTitle("");
    setDescription("");
    setIsPrivate(false);
    setTags([]);
    setOpen(false);
  };

  // Handle adding tags
  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput.trim() !== "") {
      e.preventDefault();
      if (!tags.includes(tagInput.trim()) && tags.length < 5) {
        setTags([...tags, tagInput.trim()]);
        setTagInput("");
      }
    }
  };

  // Handle removing tags
  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <motion.div {...popIn(0.3)}>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Create Room
          </Button>
        </motion.div>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Create a New Room
          </DialogTitle>
          <DialogDescription>
            Fill in the details below to create your voice room. Make it
            engaging!
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <Label htmlFor="title">Room Title</Label>
            <Input
              id="title"
              placeholder="Enter an engaging title for your room"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <p className="text-muted-foreground text-sm">
              This will be displayed as the main title of your room.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="What will you be talking about in this room?"
              className="resize-none"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <p className="text-muted-foreground text-sm">
              A brief description to help others understand what your room is
              about.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags">Tags</Label>
            <Input
              id="tags"
              placeholder="Add tags (press Enter after each tag)"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleAddTag}
            />
            <p className="text-muted-foreground text-sm">
              Add up to 5 tags to categorize your room (optional).
            </p>

            {tags.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="hover:bg-muted ml-1 rounded-full p-0.5"
                    >
                      <span className="sr-only">Remove</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M18 6 6 18" />
                        <path d="m6 6 12 12" />
                      </svg>
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
            <div className="space-y-0.5">
              <Label htmlFor="isPrivate" className="flex items-center gap-2">
                <Lock className="h-4 w-4" />
                Private Room
              </Label>
              <p className="text-muted-foreground text-sm">
                Private rooms are only accessible by invitation.
              </p>
            </div>
            <Switch
              id="isPrivate"
              checked={isPrivate}
              onCheckedChange={setIsPrivate}
            />
          </div>

          <DialogFooter className="pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="button" onClick={handleCreateRoom}>
              Create Room
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
