import React, { useEffect, useMemo, useState } from "react";
import "./App.css";
import { useRecoilState, useRecoilValue } from "recoil";
import { nameState, createFastNumberState } from "./atoms";
import { executeAction } from "./executeAction";

const logRerender = (name: string) =>
  console.log(`${name} re-render. ${new Date().getTime()}`);

const NameComponent = React.memo(() => {
  logRerender("NameComponent");
  const name = useRecoilValue(nameState);
  return <section>Name: {name}</section>;
});

const NameInputter = React.memo(() => {
  logRerender("NameInputter");
  const [name, setName] = useRecoilState(nameState);
  return (
    <section>
      Name input:{" "}
      <input onChange={(e) => setName(e.target.value)} value={name} />
    </section>
  );
});

const Counter = ({
  count,
  setCount,
}: {
  count: number;
  setCount: (val: number) => void;
}) => {
  logRerender("Counter");
  return (
    <section>
      Count: {count} <button onClick={() => setCount(count + 1)}>+1</button>
    </section>
  );
};

const FastTimer = React.memo(({ idx }: { idx: number }) => {
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

function App() {
  logRerender("App");
  const [count, setCount] = useState(10);

  return (
    <section className="App">
      <NameComponent />
      <NameInputter />
      <Counter count={count} setCount={setCount} />
      <button onClick={executeAction}>Execute async action</button>
      <FastTimer idx={1} />
      <FastTimer idx={2} />
      <FastTimer idx={3} />
      <FastTimer idx={4} />
      <FastTimer idx={5} />
      <FastTimer idx={6} />
    </section>
  );
}

export default App;
