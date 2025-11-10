import React from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Palette,
    Image,
    Sun,
    User,
    Monitor
} from "lucide-react";

interface VideoSettings {
    style: string;
    backgroundColor: string;
    lighting: string;
    pose: string;
    aspectRatio: string;
}

interface SettingsProps {
    settings: VideoSettings;
    onSettingsChange: (settings: VideoSettings) => void;
}

export const SettingsGeneration = ({
    settings,
    onSettingsChange,
}: SettingsProps) => {
    return (
        <div className="space-y-4 p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/50">
            {/* Style Select */}
            <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                    <Palette className="w-4 h-4 text-zinc-500" />
                    <span className="text-sm text-zinc-500">Style</span>
                </div>
                <Select
                    value={settings.style}
                    onValueChange={(value) =>
                        onSettingsChange({ ...settings, style: value })
                    }
                >
                    <SelectTrigger className="w-[140px] h-8 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="professional">
                            Professional
                        </SelectItem>
                        <SelectItem value="artistic">Artistic</SelectItem>
                        <SelectItem value="casual">Casual</SelectItem>
                        <SelectItem value="vintage">Vintage</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Background Select */}
            <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                    <Image className="w-4 h-4 text-zinc-500" />
                    <span className="text-sm text-zinc-500">Background</span>
                </div>
                <Select
                    value={settings.backgroundColor}
                    onValueChange={(value) =>
                        onSettingsChange({
                            ...settings,
                            backgroundColor: value,
                        })
                    }
                >
                    <SelectTrigger className="w-[140px] h-8 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="studio">Studio</SelectItem>
                        <SelectItem value="gradient">Gradient</SelectItem>
                        <SelectItem value="solid">Solid Color</SelectItem>
                        <SelectItem value="transparent">Transparent</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Lighting Select */}
            <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                    <Sun className="w-4 h-4 text-zinc-500" />
                    <span className="text-sm text-zinc-500">Lighting</span>
                </div>
                <Select
                    value={settings.lighting}
                    onValueChange={(value) =>
                        onSettingsChange({ ...settings, lighting: value })
                    }
                >
                    <SelectTrigger className="w-[140px] h-8 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="soft">Soft</SelectItem>
                        <SelectItem value="dramatic">Dramatic</SelectItem>
                        <SelectItem value="natural">Natural</SelectItem>
                        <SelectItem value="studio">Studio</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Pose Select */}
            <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-zinc-500" />
                    <span className="text-sm text-zinc-500">Pose</span>
                </div>
                <Select
                    value={settings.pose}
                    onValueChange={(value) =>
                        onSettingsChange({ ...settings, pose: value })
                    }
                >
                    <SelectTrigger className="w-[140px] h-8 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="headshot">Headshot</SelectItem>
                        <SelectItem value="half-body">Half Body</SelectItem>
                        <SelectItem value="full-body">Full Body</SelectItem>
                        <SelectItem value="profile">Profile</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Quality Select */}
            <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                    <Monitor className="w-4 h-4 text-zinc-500" />
                    <span className="text-sm text-zinc-500">Quality</span>
                </div>
                <span className="text-sm text-zinc-900 dark:text-zinc-100">
                    720p
                </span>
            </div>
        </div>
    );
};
