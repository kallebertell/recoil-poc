import React, { useEffect, useRef } from "react";
import { useRemoveBroadcastActive } from "../remote-broadcast/remoteBroadcastManager";
import { useLocalMediaStream } from "./localMediaManager";

export const Video = React.memo(() => {
  const ref = useRef<HTMLVideoElement>(null);
  const mediaStream = useLocalMediaStream();
  const remoteBroadcastActive = useRemoveBroadcastActive();

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
