import { Sun, Moon, Thermometer, Wind, Power, Settings2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Device {
    id: string;
    name: string;
    status: "on" | "off";
    value?: number;
    unit?: string;
    icon: React.ReactNode;
}

interface Scene {
    id: string;
    name: string;
    icon: React.ReactNode;
    isActive: boolean;
}

interface Card06Props {
    roomName?: string;
    temperature?: number;
    devices?: Device[];
    scenes?: Scene[];
}

export default function Card06({
    roomName = "Living Room",
    temperature = 22.5,
    devices = [
        {
            id: "1",
            name: "Main Light",
            status: "on",
            value: 80,
            unit: "%",
            icon: <Sun className="w-4 h-4" />,
        },
        {
            id: "2",
            name: "AC",
            status: "off",
            value: 22,
            unit: "°C",
            icon: <Wind className="w-4 h-4" />,
        },
    ],
    scenes = [
        {
            id: "1",
            name: "Day",
            icon: <Sun className="w-4 h-4" />,
            isActive: false,
        },
        {
            id: "2",
            name: "Night",
            icon: <Moon className="w-4 h-4" />,
            isActive: true,
        },
    ],
}: Card06Props) {
    return (
        <div className="w-full max-w-sm mx-auto">
            <div
                className={cn(
                    "relative overflow-hidden",
                    "bg-white dark:bg-zinc-900",
                    "rounded-3xl",
                    "transition-all duration-300",
                    "hover:shadow-xl hover:shadow-zinc-200/20 dark:hover:shadow-zinc-900/20",
                    "border border-zinc-200 dark:border-zinc-800"
                )}
            >
                {/* Header */}
                <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                                {roomName}
                            </h3>
                            <div className="flex items-center gap-1.5 mt-1">
                                <Thermometer className="w-4 h-4 text-amber-500" />
                                <span className="text-sm text-zinc-500 dark:text-zinc-400">
                                    {temperature}°C
                                </span>
                            </div>
                        </div>
                        <button
                            type="button"
                            className={cn(
                                "p-2.5 rounded-xl",
                                "bg-zinc-100 dark:bg-zinc-800",
                                "hover:bg-zinc-200 dark:hover:bg-zinc-700",
                                "transition-colors duration-200"
                            )}
                        >
                            <Settings2 className="w-5 h-5 text-zinc-500 dark:text-zinc-400" />
                        </button>
                    </div>

                    {/* Devices */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        {devices.map((device) => (
                            <div
                                key={device.id}
                                className={cn(
                                    "p-4 rounded-2xl",
                                    "bg-zinc-50 dark:bg-zinc-800/50",
                                    "border border-zinc-200 dark:border-zinc-700",
                                    "group",
                                    "transition-all duration-200",
                                    device.status === "on" &&
                                        "bg-blue-50/50 dark:bg-blue-900/20",
                                    device.status === "on" &&
                                        "border-blue-200 dark:border-blue-800"
                                )}
                            >
                                <div className="flex items-start justify-between mb-3">
                                    <div className="space-y-1">
                                        <div
                                            className={cn(
                                                "p-2 rounded-lg w-fit",
                                                "bg-white dark:bg-zinc-800",
                                                "border border-zinc-200 dark:border-zinc-700",
                                                device.status === "on" &&
                                                    "text-blue-500"
                                            )}
                                        >
                                            {device.icon}
                                        </div>
                                        <h4 className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                                            {device.name}
                                        </h4>
                                    </div>
                                    <button
                                        type="button"
                                        className={cn(
                                            "relative w-11 h-6 rounded-full",
                                            "transition-colors duration-200",
                                            device.status === "on"
                                                ? "bg-blue-500"
                                                : "bg-zinc-200 dark:bg-zinc-700"
                                        )}
                                    >
                                        <span
                                            className={cn(
                                                "absolute w-5 h-5 rounded-full",
                                                "bg-white",
                                                "shadow-xs",
                                                "transition-transform duration-200",
                                                "top-0.5 left-0.5",
                                                device.status === "on" &&
                                                    "translate-x-5"
                                            )}
                                        />
                                    </button>
                                </div>
                                {device.value && (
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-zinc-500 dark:text-zinc-400">
                                            {device.value}
                                            {device.unit}
                                        </span>
                                        <Power
                                            className={cn(
                                                "w-4 h-4",
                                                device.status === "on"
                                                    ? "text-blue-500"
                                                    : "text-zinc-400"
                                            )}
                                        />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="space-y-3">
                        <h4 className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                            Scenes
                        </h4>
                        <div className="grid grid-cols-2 gap-3">
                            {scenes.map((scene) => (
                                <button
                                    type="button"
                                    key={scene.id}
                                    className={cn(
                                        "flex items-center gap-2.5",
                                        "p-3 rounded-xl",
                                        "transition-all duration-200",
                                        scene.isActive
                                            ? "bg-blue-50 dark:bg-blue-900/20 text-blue-500"
                                            : "bg-zinc-50 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400",
                                        "hover:bg-blue-50 dark:hover:bg-blue-900/20",
                                        "hover:text-blue-500"
                                    )}
                                >
                                    {scene.icon}
                                    <span className="text-sm font-medium">
                                        {scene.name}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
