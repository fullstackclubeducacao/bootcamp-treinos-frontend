"use client";

import { Sparkles } from "lucide-react";
import { useQueryStates, parseAsBoolean, parseAsString } from "nuqs";
import { Button } from "@/components/ui/button";

export function ChatOpenButton() {
  const [, setChatParams] = useQueryStates({
    chat_open: parseAsBoolean.withDefault(false),
    chat_initial_message: parseAsString,
  });

  return (
    <Button
      size="icon"
      onClick={() => setChatParams({ chat_open: true })}
      className="size-14 rounded-full"
    >
      <Sparkles className="size-6" />
    </Button>
  );
}
