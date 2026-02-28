import { redirect } from "next/navigation";
import { authClient } from "@/app/_lib/auth-client";
import { headers } from "next/headers";
import { getWorkoutPlan } from "@/app/_lib/api/fetch-generated";
import Image from "next/image";
import Link from "next/link";
import { Goal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { BottomNav } from "@/app/_components/bottom-nav";
import { WorkoutDayCard } from "@/app/_components/workout-day-card";
import { RestDayCard } from "./_components/rest-day-card";

const WEEKDAY_ORDER = [
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
  "SUNDAY",
];

export default async function WorkoutPlanPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await authClient.getSession({
    fetchOptions: {
      headers: await headers(),
    },
  });

  if (!session.data?.user) redirect("/auth");

  const { id } = await params;
  const workoutPlanData = await getWorkoutPlan(id);

  if (workoutPlanData.status !== 200) redirect("/");

  const { name, workoutDays } = workoutPlanData.data;

  const sortedDays = [...workoutDays].sort(
    (a, b) =>
      WEEKDAY_ORDER.indexOf(a.weekDay) - WEEKDAY_ORDER.indexOf(b.weekDay),
  );

  return (
    <div className="flex min-h-svh flex-col bg-background pb-24">
      <div className="relative flex h-[296px] shrink-0 flex-col items-start justify-between overflow-hidden rounded-b-[20px] px-5 pb-10 pt-5">
        <div className="absolute inset-0" aria-hidden="true">
          <Image
            src="/workout-plan-banner.png"
            alt=""
            fill
            className="object-cover"
            priority
          />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(238deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.8) 100%)",
            }}
          />
        </div>

        <p
          className="relative text-[22px] uppercase leading-[1.15] text-background"
          style={{ fontFamily: "var(--font-anton)" }}
        >
          Fit.ai
        </p>

        <div className="relative flex w-full items-end justify-between">
          <div className="flex flex-col gap-3">
            <Badge className="gap-1 rounded-full px-2.5 py-1.5 font-heading text-xs font-semibold uppercase">
              <Goal className="size-4" />
              {name}
            </Badge>
            <h1 className="font-heading text-2xl font-semibold leading-[1.05] text-background">
              Plano de Treino
            </h1>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 p-5">
        {sortedDays.map((day) =>
          day.isRest ? (
            <RestDayCard key={day.id} weekDay={day.weekDay} />
          ) : (
            <Link
              key={day.id}
              href={`/workout-plans/${id}/days/${day.id}`}
            >
              <WorkoutDayCard
                name={day.name}
                weekDay={day.weekDay}
                estimatedDurationInSeconds={day.estimatedDurationInSeconds}
                exercisesCount={day.exercisesCount}
                coverImageUrl={day.coverImageUrl}
              />
            </Link>
          ),
        )}
      </div>

      <BottomNav activePage="calendar" />
    </div>
  );
}
