import { Calculator, Calendar, Compass, Mail, Music } from "lucide-react";
import {
  Dock,
  DockIcon,
  DockItem,
  DockLabel,
} from "@/registry/default/ui/dock";

export default function DockDemo() {
  return (
    <div className="flex h-32 items-end justify-center">
      <Dock>
        <DockItem>
          <DockIcon>
            <Compass />
          </DockIcon>
          <DockLabel>Safari</DockLabel>
        </DockItem>

        <DockItem>
          <DockIcon>
            <Mail />
          </DockIcon>
          <DockLabel>Mail</DockLabel>
        </DockItem>

        <DockItem>
          <DockIcon>
            <Calendar />
          </DockIcon>
          <DockLabel>Calendar</DockLabel>
        </DockItem>

        <DockItem>
          <DockIcon>
            <Music />
          </DockIcon>
          <DockLabel>Music</DockLabel>
        </DockItem>

        <DockItem>
          <DockIcon>
            <Calculator />
          </DockIcon>
          <DockLabel>Calculator</DockLabel>
        </DockItem>
      </Dock>
    </div>
  );
}
