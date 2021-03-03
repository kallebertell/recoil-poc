import React from "react";
import { executeAction } from "./executeAction";
import {
  useAudioEnabled,
  useLocalMediaDispatcher,
  useLocalMediaPermissionStatus,
} from "./local-media/mediaManager";
import { Sidebar } from "./layout/Sidebar";
import { Button } from "@chakra-ui/react";
import { useLayoutDispatcher } from "./layout/layoutManager";
import { Video } from "./Video";
import { FastTimer } from "./FastTimer";

const Section: React.FC = ({ children }) => (
  <section
    style={{ padding: "2rem", margin: "2rem", border: "1px dashed #61dafb " }}
  >
    {children}
  </section>
);

function App() {
  const { requestPermission, toggleAudio } = useLocalMediaDispatcher();
  const permissionStatus = useLocalMediaPermissionStatus();
  const audioEnabled = useAudioEnabled();

  const { toggleSidebar } = useLayoutDispatcher();

  return (
    <Section>
      <Sidebar />
      <Section>
        <Video />
      </Section>
      <Section>
        <div>Permission: {permissionStatus}</div>
        <div>Audio enabled: {String(audioEnabled)}</div>
        <Button
          onClick={requestPermission}
          disabled={permissionStatus !== "INITIAL"}
        >
          Request Video
        </Button>
        <Button ml={3} onClick={toggleAudio}>
          Toggle Audio
        </Button>
      </Section>
      <Section>
        <Button onClick={toggleSidebar}>Toggle Sidebar</Button>
      </Section>
      <Section>
        <Button onClick={executeAction}>Execute async action</Button>
      </Section>
      <FastTimer idx={1} />
      <FastTimer idx={2} />
    </Section>
  );
}

export default App;
