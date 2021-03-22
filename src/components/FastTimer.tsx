import React, { useEffect } from "react";

export const FastTimer = React.memo(({ idx }: { idx: number }) => {
  // TODO: replace w/ Overmind
  const fastNumber = 1;

  // Starts updating fastState every 16.66ms (60fps)
  useEffect(() => {
    setInterval(() => {
      // TODO: update fast number here
    }, 16.66);
  }, []);

  return <section>Fast: {fastNumber}</section>;
});
