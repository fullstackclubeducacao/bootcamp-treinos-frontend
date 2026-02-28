import dayjs from "dayjs";
import type { GetHomeData200ConsistencyByDay } from "@/app/_lib/api/fetch-generated";
import { ConsistencySquare } from "./consistency-square";

const WEEKDAY_SHORT = ["S", "T", "Q", "Q", "S", "S", "D"];

function getWeekDates(today: dayjs.Dayjs) {
  const monday =
    today.day() === 0
      ? today.subtract(6, "day")
      : today.subtract(today.day() - 1, "day");

  return Array.from({ length: 7 }, (_, i) => monday.add(i, "day"));
}

interface ConsistencyTrackerProps {
  consistencyByDay: GetHomeData200ConsistencyByDay;
  today: dayjs.Dayjs;
}

export function ConsistencyTracker({
  consistencyByDay,
  today,
}: ConsistencyTrackerProps) {
  const weekDates = getWeekDates(today);
  const todayStr = today.format("YYYY-MM-DD");

  return (
    <div className="flex items-center justify-between">
      {weekDates.map((date, index) => {
        const dateStr = date.format("YYYY-MM-DD");
        const dayData = consistencyByDay[dateStr];
        return (
          <div key={dateStr} className="flex flex-col items-center gap-1.5">
            <ConsistencySquare
              completed={dayData?.workoutDayCompleted ?? false}
              started={dayData?.workoutDayStarted ?? false}
              isToday={dateStr === todayStr}
            />
            <span className="font-heading text-xs text-muted-foreground">
              {WEEKDAY_SHORT[index]}
            </span>
          </div>
        );
      })}
    </div>
  );
}
