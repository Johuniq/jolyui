import {
    Dock,
    DockIcon,
    DockItem,
    DockLabel,
} from "@/registry/default/ui/dock";
import {
    Facebook,
    Github,
    Instagram,
    Linkedin,
    Twitter,
    Youtube,
} from "lucide-react";

export default function DockSocialDemo() {
  return (
    <div className="flex h-32 items-end justify-center">
      <Dock
        magnification={60}
        distance={100}
        className="bg-transparent border-none shadow-none"
      >
        <DockItem className="bg-black/5 dark:bg-white/10">
          <DockIcon>
            <Github />
          </DockIcon>
          <DockLabel>GitHub</DockLabel>
        </DockItem>

        <DockItem className="bg-blue-500/10 text-blue-500">
          <DockIcon>
            <Twitter />
          </DockIcon>
          <DockLabel>Twitter</DockLabel>
        </DockItem>

        <DockItem className="bg-pink-500/10 text-pink-500">
          <DockIcon>
            <Instagram />
          </DockIcon>
          <DockLabel>Instagram</DockLabel>
        </DockItem>

        <DockItem className="bg-blue-700/10 text-blue-700">
          <DockIcon>
            <Linkedin />
          </DockIcon>
          <DockLabel>LinkedIn</DockLabel>
        </DockItem>

        <DockItem className="bg-blue-600/10 text-blue-600">
          <DockIcon>
            <Facebook />
          </DockIcon>
          <DockLabel>Facebook</DockLabel>
        </DockItem>

        <DockItem className="bg-red-600/10 text-red-600">
          <DockIcon>
            <Youtube />
          </DockIcon>
          <DockLabel>YouTube</DockLabel>
        </DockItem>
      </Dock>
    </div>
  );
}
