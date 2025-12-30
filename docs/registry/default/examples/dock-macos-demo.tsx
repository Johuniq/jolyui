import {
  Calculator,
  Calendar,
  Camera,
  ChromeIcon,
  Clock,
  Image,
  Mail,
  MessageSquare,
  Music,
  Notebook,
  Settings,
  Store,
  Terminal,
  Trash2,
} from "lucide-react";
import {
  Dock,
  DockIcon,
  DockItem,
  DockLabel,
  DockSeparator,
} from "@/registry/default/ui/dock";

export default function DockMacosDemo() {
  return (
    <div className="flex h-32 items-end justify-center">
      <Dock magnification={80} distance={150}>
        <DockItem>
          <DockIcon>
            <ChromeIcon />
          </DockIcon>
          <DockLabel>Chrome</DockLabel>
        </DockItem>
        <DockItem>
          <DockIcon>
            <Calendar />
          </DockIcon>
          <DockLabel>Calendar</DockLabel>
        </DockItem>

        <DockItem>
          <DockIcon>
            <Mail />
          </DockIcon>
          <DockLabel>Mail</DockLabel>
        </DockItem>

        <DockItem>
          <DockIcon>
            <MessageSquare />
          </DockIcon>
          <DockLabel>Messages</DockLabel>
        </DockItem>

        <DockItem>
          <DockIcon>
            <Music />
          </DockIcon>
          <DockLabel>Music</DockLabel>
        </DockItem>

        <DockItem>
          <DockIcon>
            <Image />
          </DockIcon>
          <DockLabel>Photos</DockLabel>
        </DockItem>

        <DockSeparator />

        <DockItem>
          <DockIcon>
            <Store />
          </DockIcon>
          <DockLabel>App Store</DockLabel>
        </DockItem>

        <DockItem>
          <DockIcon>
            <Calculator />
          </DockIcon>
          <DockLabel>Calculator</DockLabel>
        </DockItem>

        <DockItem>
          <DockIcon>
            <Clock />
          </DockIcon>
          <DockLabel>Clock</DockLabel>
        </DockItem>

        <DockItem>
          <DockIcon>
            <Notebook />
          </DockIcon>
          <DockLabel>Notes</DockLabel>
        </DockItem>

        <DockItem>
          <DockIcon>
            <Terminal />
          </DockIcon>
          <DockLabel>Terminal</DockLabel>
        </DockItem>

        <DockItem>
          <DockIcon>
            <Settings />
          </DockIcon>
          <DockLabel>System Settings</DockLabel>
        </DockItem>

        <DockSeparator />

        <DockItem>
          <DockIcon>
            <Camera />
          </DockIcon>
          <DockLabel>Camera</DockLabel>
        </DockItem>

        <DockItem>
          <DockIcon className="text-red-500">
            <Trash2 />
          </DockIcon>
          <DockLabel>Trash</DockLabel>
        </DockItem>
      </Dock>
    </div>
  );
}
