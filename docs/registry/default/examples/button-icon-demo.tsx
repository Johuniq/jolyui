import { ChevronRight } from "lucide-react";
import { Button } from "@/registry/default/ui/button";

export default function ButtonIconDemo() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Button>
        <ChevronRight />
        With Icon
      </Button>
      <Button size="icon">
        <ChevronRight />
      </Button>
    </div>
  );
}
