import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import { createOvermind } from "overmind";
import { Provider } from "overmind-react";
import { config } from "./overmind";

const overmind = createOvermind(config);

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <Provider value={overmind}>
        <App />
      </Provider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
