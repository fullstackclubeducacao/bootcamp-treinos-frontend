"use client";

import { Sparkles } from "lucide-react";
import { useQueryStates, parseAsBoolean, parseAsString } from "nuqs";

export function ChatOpenButton() {
  const [, setChatParams] = useQueryStates({
    chat_open: parseAsBoolean.withDefault(false),
    chat_initial_message: parseAsString,
  });

  return (
    <button
      onClick={() => setChatParams({ chat_open: true })}
      className="rounded-full bg-primary p-4"
    >
      <Sparkles className="size-6 text-primary-foreground" />
    </button>
  );
}
