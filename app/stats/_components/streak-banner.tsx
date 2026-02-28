import Image from "next/image";
import { Flame } from "lucide-react";

interface StreakBannerProps {
  workoutStreak: number;
}

export function StreakBanner({ workoutStreak }: StreakBannerProps) {
  const isZero = workoutStreak === 0;

  return (
    <div className="relative flex flex-col items-center justify-center gap-6 overflow-hidden rounded-xl px-5 py-10">
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src="/stats-banner.png"
          alt=""
          fill
          className={`object-cover ${isZero ? "grayscale" : ""}`}
          priority
        />
      </div>
      <div className="relative flex flex-col items-center gap-3">
        <div className="rounded-full border border-background/12 bg-background/12 p-3 backdrop-blur-[4px]">
          <Flame className="size-8 text-background" />
        </div>
        <div className="flex flex-col items-center gap-1">
          <p className="font-heading text-5xl font-semibold leading-[0.95] text-background">
            {workoutStreak} dias
          </p>
          <p className="font-heading text-base leading-[1.15] text-background/60">
            Sequência Atual
          </p>
        </div>
      </div>
    </div>
  );
}
