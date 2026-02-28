import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  icon: LucideIcon;
  value: string;
  label: string;
}

export function StatCard({ icon: Icon, value, label }: StatCardProps) {
  return (
    <div className="flex flex-col items-center gap-5 rounded-xl bg-primary/8 p-5">
      <div className="rounded-full bg-primary/8 p-2.5">
        <Icon className="size-4 text-primary" />
      </div>
      <div className="flex flex-col items-center gap-1.5">
        <p className="font-heading text-2xl font-semibold leading-[1.15] text-foreground">
          {value}
        </p>
        <p className="font-heading text-xs text-muted-foreground">
          {label}
        </p>
      </div>
    </div>
  );
}
