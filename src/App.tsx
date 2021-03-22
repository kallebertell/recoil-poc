import React from "react";

import { Button } from "@chakra-ui/react";
import { Sidebar } from "./components/layout/Sidebar";
import { Video } from "./components/Video";
import { FastTimer } from "./components/FastTimer";
import { Section } from "./components/Section";
import { VideoControls } from "./components/VideoControls";
import { useActions, useAppState } from "./overmind";

function App() {
  const {
    layout: { sidebarExpanded },
    remoteBroadcast: { remoteBroadcastActive },
  } = useAppState();

  // TODO: why are actions not typed?
  const {
    layout: { requestSidebarExpanded },
    remoteBroadcast: { startRemoteBroadcast, stopRemoteBroadcast },
  } = useActions() as any;

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

      {/* <FastTimer idx={1} /> */}
    </Section>
  );
}

export default App;
