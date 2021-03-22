import React, { useEffect } from "react";
import { useActions, useAppState } from "../overmind";

export const FastTimer = React.memo(({ idx }: { idx: number }) => {
  const appState = useAppState();
  const actions = useActions();

  // Starts updating fastState every 16.66ms (60fps)
  useEffect(() => {
    setInterval(() => {
      // TODO: we're losing types
      (actions.incrementFastNumber as Function)();
    }, 16.66);
  }, [actions]);

  return <section>Fast: {appState.fastNumber}</section>;
});
