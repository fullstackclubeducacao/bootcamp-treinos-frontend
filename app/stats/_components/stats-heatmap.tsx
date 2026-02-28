import dayjs from "dayjs";
import type { GetStats200ConsistencyByDay } from "@/app/_lib/api/fetch-generated";

interface StatsHeatmapProps {
  consistencyByDay: GetStats200ConsistencyByDay;
  today: dayjs.Dayjs;
}

interface WeekData {
  dates: dayjs.Dayjs[];
}

interface MonthGroup {
  label: string;
  weeks: WeekData[];
}

function getMonday(date: dayjs.Dayjs): dayjs.Dayjs {
  const day = date.day();
  if (day === 0) return date.subtract(6, "day");
  return date.subtract(day - 1, "day");
}

function buildMonthGroups(today: dayjs.Dayjs): MonthGroup[] {
  const startOfRange = today.subtract(2, "month").startOf("month");
  const endOfRange = today.endOf("month");

  const firstMonday = getMonday(startOfRange);
  const lastMonday = getMonday(endOfRange);
  const lastSunday = lastMonday.add(6, "day");

  const allWeeks: WeekData[] = [];
  let currentMonday = firstMonday;

  while (
    currentMonday.isBefore(lastSunday) ||
    currentMonday.isSame(lastSunday)
  ) {
    const dates = Array.from({ length: 7 }, (_, i) =>
      currentMonday.add(i, "day"),
    );
    allWeeks.push({ dates });
    currentMonday = currentMonday.add(7, "day");
  }

  const monthGroups: MonthGroup[] = [];
  const monthLabels = [
    "Jan",
    "Fev",
    "Mar",
    "Abr",
    "Mai",
    "Jun",
    "Jul",
    "Ago",
    "Set",
    "Out",
    "Nov",
    "Dez",
  ];

  for (const week of allWeeks) {
    const thursday = week.dates[3];
    const monthIndex = thursday.month();
    const monthLabel = monthLabels[monthIndex];

    const lastGroup = monthGroups[monthGroups.length - 1];
    if (lastGroup && lastGroup.label === monthLabel) {
      lastGroup.weeks.push(week);
    } else {
      monthGroups.push({ label: monthLabel, weeks: [week] });
    }
  }

  return monthGroups;
}

export function StatsHeatmap({
  consistencyByDay,
  today,
}: StatsHeatmapProps) {
  const monthGroups = buildMonthGroups(today);

  return (
    <div className="flex gap-1 overflow-x-auto rounded-xl border border-border p-5">
      {monthGroups.map((group) => (
        <div
          key={group.label}
          className="flex flex-col gap-1.5"
        >
          <p className="font-heading text-xs text-muted-foreground">
            {group.label}
          </p>
          <div className="flex gap-1">
            {group.weeks.map((week) => {
              const weekKey = week.dates[0].format("YYYY-MM-DD");
              return (
                <div key={weekKey} className="flex flex-col gap-1">
                  {week.dates.map((date) => {
                    const dateStr = date.format("YYYY-MM-DD");
                    const dayData = consistencyByDay[dateStr];

                    if (dayData?.workoutDayCompleted) {
                      return (
                        <div
                          key={dateStr}
                          className="size-5 rounded-md bg-primary"
                        />
                      );
                    }

                    if (dayData?.workoutDayStarted) {
                      return (
                        <div
                          key={dateStr}
                          className="size-5 rounded-md bg-primary/20"
                        />
                      );
                    }

                    return (
                      <div
                        key={dateStr}
                        className="size-5 rounded-md border border-border"
                      />
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
