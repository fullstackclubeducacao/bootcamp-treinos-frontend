import { redirect } from "next/navigation";
import { authClient } from "@/app/_lib/auth-client";
import { headers } from "next/headers";
import { getWorkoutDay } from "@/app/_lib/api/fetch-generated";
import Image from "next/image";
import { Calendar, Timer, Dumbbell, CircleHelp, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BottomNav } from "@/app/_components/bottom-nav";
import { BackButton } from "./_components/back-button";
import { StartWorkoutButton } from "./_components/start-workout-button";
import { CompleteWorkoutButton } from "./_components/complete-workout-button";

const WEEKDAY_LABELS: Record<string, string> = {
  MONDAY: "SEGUNDA",
  TUESDAY: "TERÇA",
  WEDNESDAY: "QUARTA",
  THURSDAY: "QUINTA",
  FRIDAY: "SEXTA",
  SATURDAY: "SÁBADO",
  SUNDAY: "DOMINGO",
};

const WEEKDAY_TITLE_LABELS: Record<string, string> = {
  MONDAY: "Segunda",
  TUESDAY: "Terça",
  WEDNESDAY: "Quarta",
  THURSDAY: "Quinta",
  FRIDAY: "Sexta",
  SATURDAY: "Sábado",
  SUNDAY: "Domingo",
};

export default async function WorkoutDayPage({
  params,
}: {
  params: Promise<{ id: string; dayId: string }>;
}) {
  const session = await authClient.getSession({
    fetchOptions: {
      headers: await headers(),
    },
  });

  if (!session.data?.user) redirect("/auth");

  const { id: workoutPlanId, dayId } = await params;
  const workoutDayData = await getWorkoutDay(workoutPlanId, dayId);

  if (workoutDayData.status !== 200) redirect("/");

  const {
    name,
    weekDay,
    estimatedDurationInSeconds,
    exercises,
    sessions,
    coverImageUrl,
  } = workoutDayData.data;

  const durationInMinutes = Math.round(estimatedDurationInSeconds / 60);

  const inProgressSession = sessions.find(
    (s) => s.startedAt && !s.completedAt,
  );
  const completedSession = sessions.find((s) => s.completedAt);
  const hasInProgressSession = !!inProgressSession;
  const hasCompletedSession = !!completedSession;

  return (
    <div className="flex min-h-svh flex-col bg-background pb-24">
      <div className="flex items-center justify-between px-5 py-4">
        <BackButton />
        <h1 className="font-heading text-lg font-semibold text-foreground">
          {hasInProgressSession || hasCompletedSession
            ? "Treino de Hoje"
            : WEEKDAY_TITLE_LABELS[weekDay]}
        </h1>
        <div className="size-6" />
      </div>

      <div className="px-5">
        <div className="relative flex h-[200px] w-full flex-col items-start justify-between overflow-hidden rounded-xl p-5">
          {coverImageUrl && (
            <Image
              src={coverImageUrl}
              alt={name}
              fill
              className="pointer-events-none object-cover"
            />
          )}
          <div className="absolute inset-0 bg-foreground/40" />

          <div className="relative">
            <div className="flex items-center gap-1 rounded-full bg-background/16 px-2.5 py-1.5 backdrop-blur-sm">
              <Calendar className="size-3.5 text-background" />
              <span className="font-heading text-xs font-semibold uppercase text-background">
                {WEEKDAY_LABELS[weekDay]}
              </span>
            </div>
          </div>

          <div className="relative flex w-full items-end justify-between">
            <div className="flex flex-col gap-2">
              <h2 className="font-heading text-2xl font-semibold leading-[1.05] text-background">
                {name}
              </h2>
              <div className="flex items-start gap-2">
                <div className="flex items-center gap-1">
                  <Timer className="size-3.5 text-background/70" />
                  <span className="font-heading text-xs text-background/70">
                    {durationInMinutes}min
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Dumbbell className="size-3.5 text-background/70" />
                  <span className="font-heading text-xs text-background/70">
                    {exercises.length} exercícios
                  </span>
                </div>
              </div>
            </div>

            {!hasInProgressSession && !hasCompletedSession && (
              <StartWorkoutButton
                workoutPlanId={workoutPlanId}
                workoutDayId={dayId}
              />
            )}
            {hasCompletedSession && (
              <Button
                variant="ghost"
                disabled
                className="rounded-full px-4 py-2 font-heading text-sm font-semibold text-background/70 hover:bg-transparent hover:text-background/70"
              >
                Concluído!
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 px-5 pt-5">
        {exercises
          .sort((a, b) => a.order - b.order)
          .map((exercise) => (
            <div
              key={exercise.id}
              className="flex flex-col gap-3 rounded-xl border border-border p-5"
            >
              <div className="flex items-center justify-between">
                <span className="font-heading text-base font-semibold text-foreground">
                  {exercise.name}
                </span>
                <Button variant="ghost" size="icon">
                  <CircleHelp className="size-5 text-muted-foreground" />
                </Button>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="rounded-full bg-muted px-2.5 py-1 font-heading text-xs font-semibold uppercase text-muted-foreground">
                  {exercise.sets} séries
                </span>
                <span className="rounded-full bg-muted px-2.5 py-1 font-heading text-xs font-semibold uppercase text-muted-foreground">
                  {exercise.reps} reps
                </span>
                <span className="flex items-center gap-1 rounded-full bg-muted px-2.5 py-1 font-heading text-xs font-semibold uppercase text-muted-foreground">
                  <Zap className="size-3.5" />
                  {exercise.restTimeInSeconds}s
                </span>
              </div>
            </div>
          ))}
      </div>

      {hasInProgressSession && inProgressSession && (
        <div className="px-5 pt-5">
          <CompleteWorkoutButton
            workoutPlanId={workoutPlanId}
            workoutDayId={dayId}
            sessionId={inProgressSession.id}
          />
        </div>
      )}

      <BottomNav activePage="calendar" />
    </div>
  );
}
