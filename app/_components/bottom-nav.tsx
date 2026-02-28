import Link from "next/link";
import {
  House,
  Calendar,
  Sparkles,
  ChartNoAxesColumn,
  UserRound,
} from "lucide-react";

export function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-center gap-6 rounded-t-[20px] border border-border bg-background px-6 py-4">
      <Link href="/" className="p-3">
        <House className="size-6 text-foreground" />
      </Link>
      <button className="p-3">
        <Calendar className="size-6 text-foreground" />
      </button>
      <button className="rounded-full bg-primary p-4">
        <Sparkles className="size-6 text-primary-foreground" />
      </button>
      <button className="p-3">
        <ChartNoAxesColumn className="size-6 text-foreground" />
      </button>
      <button className="p-3">
        <UserRound className="size-6 text-foreground" />
      </button>
    </nav>
  );
}
