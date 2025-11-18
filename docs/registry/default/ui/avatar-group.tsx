import { AvatarGroup as AvatarGroupPrimitive } from "@jolyui/avatar-group";
import { cn } from "@/lib/utils";

// Re-export with cn utility integrated
export function AvatarGroup({ className, ...props }: React.ComponentProps<typeof AvatarGroupPrimitive>) {
  return <AvatarGroupPrimitive className={cn(className)} {...props} />;
}

export type { AvatarGroupProps } from "@jolyui/avatar-group";
