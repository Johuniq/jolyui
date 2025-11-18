import { cn } from "@/lib/utils";
import {
  AvatarGroup as AvatarGroupPrimitive,
  type AvatarGroupProps,
} from "@jolyui/avatar-group";

// Re-export with cn utility integrated
export function AvatarGroup({
  className,
  ...props
}: React.ComponentProps<typeof AvatarGroupPrimitive>) {
  return <AvatarGroupPrimitive className={cn(className)} {...props} />;
}

export type { AvatarGroupProps };
