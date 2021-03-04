import React, { useEffect } from "react";
import create from "zustand";

type State = {
  count: number;
  increment: () => void;
};

const useStore = create<State>((set) => ({
  count: 0,
  increment() {
    set((state) => ({
      count: new Date().getTime(),
    }));
  },
}));

export const FastZustandTimer = React.memo(({ idx }: { idx: number }) => {
  const count = useStore((state) => state.count);
  const increment = useStore((state) => state.increment);

  // Starts updating fastState every 16.66ms (60fps)
  useEffect(() => {
    setInterval(() => {
      increment();
    }, 16.66);
  }, [increment]);

  return <section>Fast Zustand: {count}</section>;
});
