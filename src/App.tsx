import React, { useState } from "react";
import "./App.css";
import { useRecoilState, useRecoilValue } from "recoil";
import { nameState } from "./atoms";
import { executeAction } from "./executeAction";

const logRerender = (name: string) =>
  console.log(`${name} re-render. ${new Date().getTime()}`);

const NameComponent = React.memo(() => {
  logRerender("NameComponent");
  const name = useRecoilValue(nameState);
  return <div>Name: {name}</div>;
});

const NameInputter = React.memo(() => {
  logRerender("NameInputter");
  const [name, setName] = useRecoilState(nameState);
  return (
    <div>
      Name input:{" "}
      <input onChange={(e) => setName(e.target.value)} value={name} />
    </div>
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
    <div>
      Count: {count} <button onClick={() => setCount(count + 1)}>+1</button>
    </div>
  );
};

function App() {
  logRerender("App");
  const [count, setCount] = useState(10);

  return (
    <div className="App">
      <NameComponent />
      <NameInputter />
      <Counter count={count} setCount={setCount} />

      <button onClick={executeAction}>Execute action</button>
    </div>
  );
}

export default App;
