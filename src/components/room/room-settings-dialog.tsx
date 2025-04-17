import { useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Settings } from "lucide-react";
import { toast } from "sonner";

export interface RoomSettingsData {
  title: string;
  description: string;
  isPrivate: boolean;
  maxSpeakers: string;
  recordingEnabled: boolean;
}

interface RoomSettingsDialogProps {
  initialSettings: {
    title: string;
    description: string;
    isPrivate?: boolean;
    maxSpeakers?: number;
    recordingEnabled?: boolean;
  };
  onSaveSettings: (settings: RoomSettingsData) => void;
}

/**
 * RoomSettingsDialog component
 * Provides a dialog to edit room settings
 */
export function RoomSettingsDialog({
  initialSettings,
  onSaveSettings,
}: RoomSettingsDialogProps) {
  const [open, setOpen] = useState(false);
  const [settings, setSettings] = useState<RoomSettingsData>({
    title: initialSettings.title || "",
    description: initialSettings.description || "",
    isPrivate: initialSettings.isPrivate || false,
    maxSpeakers: initialSettings.maxSpeakers?.toString() || "10",
    recordingEnabled: initialSettings.recordingEnabled || false,
  });

  const handleSave = () => {
    onSaveSettings(settings);
    setOpen(false);
    toast.success("Room settings updated", {
      description: "Your changes have been saved",
      duration: 3000,
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="h-12 w-12 rounded-full duration-200 hover:-translate-y-1"
        >
          <Settings className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl">Room Settings</DialogTitle>
          <DialogDescription>
            Customize your room&apos;s settings. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="room-title">Room Title</Label>
            <Input
              id="room-title"
              value={settings.title}
              onChange={(e) =>
                setSettings({ ...settings, title: e.target.value })
              }
              placeholder="Enter room title"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="room-description">Room Description</Label>
            <Textarea
              id="room-description"
              value={settings.description}
              onChange={(e) =>
                setSettings({ ...settings, description: e.target.value })
              }
              placeholder="Enter room description"
              className="min-h-[80px]"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="privacy-setting">Privacy Setting</Label>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                Make this room private
              </span>
              <Switch
                id="privacy-setting"
                checked={settings.isPrivate}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, isPrivate: checked })
                }
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="max-speakers">Maximum Speakers</Label>
            <Select
              value={settings.maxSpeakers}
              onValueChange={(value: string) =>
                setSettings({ ...settings, maxSpeakers: value })
              }
            >
              <SelectTrigger id="max-speakers">
                <SelectValue placeholder="Select maximum number of speakers" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5 speakers</SelectItem>
                <SelectItem value="10">10 speakers</SelectItem>
                <SelectItem value="15">15 speakers</SelectItem>
                <SelectItem value="20">20 speakers</SelectItem>
                <SelectItem value="unlimited">Unlimited</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="recording-enabled">Recording</Label>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                Enable room recording
              </span>
              <Switch
                id="recording-enabled"
                checked={settings.recordingEnabled}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, recordingEnabled: checked })
                }
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
