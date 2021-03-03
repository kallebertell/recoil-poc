import React, { useEffect, useRef } from "react";
import { useLocalMediaStream } from "./local-media/mediaManager";

export const Video = () => {
  const ref = useRef<HTMLVideoElement>(null);
  const mediaStream = useLocalMediaStream();

  useEffect(() => {
    ref.current!.srcObject = mediaStream;
  }, [mediaStream]);

  return (
    <video
      style={{ background: "#ccc", width: "100%" }}
      autoPlay
      playsInline
      ref={ref}
    />
  );
};
