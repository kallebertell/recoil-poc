import React from "react";

import { Button } from "@chakra-ui/react";
import { Sidebar } from "./components/layout/Sidebar";
import { Video } from "./components/Video";
import { FastTimer } from "./components/FastTimer";
import { Section } from "./components/Section";
import { VideoControls } from "./components/VideoControls";
import { useActions } from "./overmind";

function App() {
  // TODO: replace w/ Overmind
  const sidebarExpanded = false;
  const remoteBroadcastActive = false;
  const startRemoteBroadcast = () => {};
  const stopRemoteBroadcast = () => {};

  const { layout: actions } = useActions();
  // TODO: why are actions not typed?
  const requestSidebarExpanded = (actions as any).requestSidebarExpanded;

  return (
    <Section>
      <Sidebar />
      <Section>
        <Video />
        <VideoControls />
      </Section>

      <Section>
        <Button onClick={() => requestSidebarExpanded(!sidebarExpanded)}>
          Toggle Sidebar
        </Button>
        <Button
          ml={3}
          onClick={startRemoteBroadcast}
          disabled={remoteBroadcastActive}
        >
          Start remote broadcast
        </Button>
        <Button
          ml={3}
          onClick={stopRemoteBroadcast}
          disabled={!remoteBroadcastActive}
        >
          Stop remote broadcast
        </Button>
      </Section>

      <FastTimer idx={1} />
      <FastTimer idx={2} />
    </Section>
  );
}

export default App;
