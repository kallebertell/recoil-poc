import React, { useEffect, useRef } from "react";
import { useAppState, useEffects } from "../overmind";

export const Video = React.memo(() => {
  const ref = useRef<HTMLVideoElement>(null);

  const {
    localMedia: { permissionStatus },
  } = useAppState();

  const {
    localMedia: { mediaDevices },
  } = useEffects();

  const {
    remoteBroadcast: { remoteBroadcastActive },
  } = useAppState();

  useEffect(() => {
    if (permissionStatus === "GRANTED") {
      console.log("Applying media stream to video element");
      ref.current!.srcObject = mediaDevices.getMediaStream();
    }
  }, [permissionStatus, mediaDevices]);

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
