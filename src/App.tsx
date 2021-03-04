import React from "react";

import { Button } from "@chakra-ui/react";
import { Sidebar } from "./components/layout/Sidebar";
import { Video } from "./components/Video";
import { FastZustandTimer } from "./components/FastZustandTimer";
import { Section } from "./components/Section";
import { VideoControls } from "./components/VideoControls";
import {
  useRemoteBroadcastStore,
  useStartRemoteBroadcast,
  useStopRemoteBroadcast,
} from "./zustand-state/remote-broadcast-state";
import { useLayoutStore } from "./zustand-state/layout-state";

function App() {
  const { sidebarExpanded, requestSidebarExpanded } = useLayoutStore();
  const remoteBroadcastActive = useRemoteBroadcastStore(
    (state) => state.remoteBroadcastActive
  );
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

      <FastZustandTimer idx={2} />
    </Section>
  );
}

export default App;
