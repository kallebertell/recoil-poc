import React from "react";

import { Button } from "@chakra-ui/react";
import { Section } from "../Section";
import {
  useAudioEnabled,
  useLocalMediaDispatcher,
  useLocalMediaPermissionStatus,
  useVideoEnabled,
} from "./localMediaManager";
import { useRemoveBroadcastActive } from "../remote-broadcast/remoteBroadcastManager";

export const VideoControls = () => {
  const permissionStatus = useLocalMediaPermissionStatus();
  const videoEnabled = useVideoEnabled();
  const audioEnabled = useAudioEnabled();
  const {
    requestPermission,
    requestAudioEnabled,
    requestVideoEnabled,
  } = useLocalMediaDispatcher();

  const remoteBroadcastActive = useRemoveBroadcastActive();

  return (
    <Section>
      <div>Permission: {permissionStatus}</div>
      <div>Video enabled: {String(videoEnabled)}</div>
      <div>Audio enabled: {String(audioEnabled)}</div>
      <div style={{ position: "relative" }}>
        {remoteBroadcastActive && (
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
              zIndex: 1,
              background: "rgba(0, 0, 0, 0.5)",
              color: "white",
              textAlign: "center",
              fontSize: 20,
              lineHeight: 1.8,
            }}
          >
            Disabled during broadcast
          </div>
        )}
        <Button
          onClick={requestPermission}
          disabled={permissionStatus !== "INITIAL"}
        >
          Request Video
        </Button>
        <Button ml={3} onClick={() => requestAudioEnabled(!audioEnabled)}>
          Toggle Audio
        </Button>
        <Button ml={3} onClick={() => requestVideoEnabled(!videoEnabled)}>
          Toggle Video
        </Button>
      </div>
    </Section>
  );
};
