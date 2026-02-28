"use server";

import { revalidatePath } from "next/cache";
import {
  startWorkoutSession,
  updateWorkoutSession,
} from "@/app/_lib/api/fetch-generated";

export async function startWorkoutAction(
  workoutPlanId: string,
  workoutDayId: string,
) {
  await startWorkoutSession(workoutPlanId, workoutDayId);
  revalidatePath(`/workout-plans/${workoutPlanId}/days/${workoutDayId}`);
}

export async function completeWorkoutAction(
  workoutPlanId: string,
  workoutDayId: string,
  sessionId: string,
) {
  await updateWorkoutSession(workoutPlanId, workoutDayId, sessionId, {
    completedAt: new Date().toISOString(),
  });
  revalidatePath(`/workout-plans/${workoutPlanId}/days/${workoutDayId}`);
}
