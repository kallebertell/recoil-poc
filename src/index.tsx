import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { RecoilRoot } from "recoil";
import { RecoilPortal, setRecoilExternalState } from "./RecoilPortal";
import { nameState } from "./atoms";

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <App />
      <RecoilPortal />
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// @ts-ignore
window.extTest = () => {
  setRecoilExternalState(nameState, new Date().toISOString());
};
