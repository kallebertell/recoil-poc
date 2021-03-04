import React, { useEffect, useMemo } from "react";
import { atom, useRecoilState } from "recoil";

export const createFastNumberState = (idx: number) =>
  atom({
    key: `fastNumberState-${idx}`,
    default: 0,
  });

export const FastTimer = React.memo(({ idx }: { idx: number }) => {
  const atom = useMemo(() => createFastNumberState(idx), [idx]);
  const [fastNumber, setFastNumber] = useRecoilState(atom);

  // Starts updating fastState every 16.66ms (60fps)
  useEffect(() => {
    setInterval(() => {
      setFastNumber(new Date().getTime());
    }, 16.66);
  }, [setFastNumber]);

  return <section>Fast: {fastNumber}</section>;
});
