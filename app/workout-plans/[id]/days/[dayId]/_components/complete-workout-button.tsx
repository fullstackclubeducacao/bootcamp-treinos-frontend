"use client";

import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { completeWorkoutAction } from "../_actions";

interface CompleteWorkoutButtonProps {
  workoutPlanId: string;
  workoutDayId: string;
  sessionId: string;
}

export function CompleteWorkoutButton({
  workoutPlanId,
  workoutDayId,
  sessionId,
}: CompleteWorkoutButtonProps) {
  const [isPending, startTransition] = useTransition();

  const handleComplete = () => {
    startTransition(async () => {
      await completeWorkoutAction(workoutPlanId, workoutDayId, sessionId);
    });
  };

  return (
    <Button
      variant="outline"
      onClick={handleComplete}
      disabled={isPending}
      className="w-full rounded-full py-3 font-heading text-sm font-semibold"
    >
      Marcar como concluído
    </Button>
  );
}
