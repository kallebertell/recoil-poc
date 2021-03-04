import React from "react";

import { Button } from "@chakra-ui/react";
import { Sidebar } from "./components/layout/Sidebar";
import { Video } from "./components/Video";
import { FastTimer } from "./components/FastTimer";
import { Section } from "./components/Section";
import { VideoControls } from "./components/VideoControls";
import {
  useRemoveBroadcastActive,
  useStartRemoteBroadcast,
  useStopRemoteBroadcast,
} from "./global-state/remote-broadcast-state";
import {
  useRequestSidebarExpanded,
  useSidebarExpanded,
} from "./global-state/layout-state";

function App() {
  const sidebarExpanded = useSidebarExpanded();
  const requestSidebarExpanded = useRequestSidebarExpanded();
  const remoteBroadcastActive = useRemoveBroadcastActive();
  const startRemoteBroadcast = useStartRemoteBroadcast();
  const stopRemoteBroadcast = useStopRemoteBroadcast();

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
