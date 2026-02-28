interface ConsistencySquareProps {
  completed: boolean;
  started: boolean;
  isToday: boolean;
}

export function ConsistencySquare({
  completed,
  started,
  isToday,
}: ConsistencySquareProps) {
  if (completed) {
    return <div className="size-5 rounded-md bg-primary" />;
  }

  if (started) {
    return <div className="size-5 rounded-md bg-primary/20" />;
  }

  if (isToday) {
    return <div className="size-5 rounded-md border-[1.6px] border-primary" />;
  }

  return <div className="size-5 rounded-md border border-border" />;
}
