import React, { useEffect, useRef } from "react";
import { useRemoteBroadcastStore } from "../zustand-state/remote-broadcast-state";
import { useLocalMediaStore } from "../zustand-state/local-media-state";

export const Video = React.memo(() => {
  const ref = useRef<HTMLVideoElement>(null);
  const mediaStream = useLocalMediaStore((state) => state.mediaStream);
  const remoteBroadcastActive = useRemoteBroadcastStore(
    (state) => state.remoteBroadcastActive
  );

  useEffect(() => {
    ref.current!.srcObject = mediaStream;
  }, [mediaStream]);

  return (
    <>
      <div
        style={{
          display: remoteBroadcastActive ? "block" : "none",
          width: "100%",
          height: 300,
        }}
      >
        Remote broadcast ongoing
        <div style={{ fontSize: 100 }}>😊</div>
      </div>
      <video
        style={{
          display: remoteBroadcastActive ? "none" : "block",
          background: "#ccc",
          width: "100%",
          height: 300,
        }}
        autoPlay
        playsInline
        ref={ref}
      />
    </>
  );
});
