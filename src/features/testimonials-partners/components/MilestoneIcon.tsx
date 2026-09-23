import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";

const iconMap = Icons as unknown as Record<string, LucideIcon>;

interface MilestoneIconProps {
  name: string;
  className?: string;
}

export default function MilestoneIcon({ name, className }: MilestoneIconProps) {
  const IconComp = iconMap[name] ?? Icons.HelpCircle;
  return <IconComp className={className ?? "h-4 w-4"} />;
}
