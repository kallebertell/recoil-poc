import React from "react";

import { Sidebar } from "./layout/Sidebar";
import { Button } from "@chakra-ui/react";
import { useLayoutDispatcher } from "./layout/layoutManager";
import { Video } from "./local-media/Video";
import { FastTimer } from "./FastTimer";
import { Section } from "./Section";
import { VideoControls } from "./local-media/VideoControls";
import {
  useRemoteBroadcastDispatcher,
  useRemoveBroadcastActive,
} from "./remote-broadcast/remoteBroadcastManager";

function App() {
  const { toggleSidebar } = useLayoutDispatcher();
  const remoteBroadcastActive = useRemoveBroadcastActive();
  const {
    startRemoteBroadcast,
    stopRemoteBroadcast,
  } = useRemoteBroadcastDispatcher();

  return (
    <Section>
      <Sidebar />
      <Section>
        <Video />
        <VideoControls />
      </Section>

      <Section>
        <Button onClick={toggleSidebar}>Toggle Sidebar</Button>
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
