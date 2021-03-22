import { Context } from "..";

export const requestPermission = async ({ state, effects }: Context) => {
  const localMediaState = state.localMedia
  localMediaState.permissionStatus = "REQUESTING";
  const mediaDevices = effects.localMedia.mediaDevices

  try {
    await mediaDevices.requestPermission()

    localMediaState.permissionStatus = "GRANTED";
    const mediaStream = mediaDevices.getMediaStream()!

    mediaStream.getAudioTracks()[0].enabled = localMediaState.audioEnabled;
    mediaStream.getVideoTracks()[0].enabled = localMediaState.videoEnabled;
  } catch (err) {
    localMediaState.permissionStatus = "ERROR";
  }
}

export const requestAudioEnabled = async ({ state, effects }: Context, val: boolean) => {
  const mediaDevices = effects.localMedia.mediaDevices

  state.localMedia.audioEnabled = val
  const mediaStream = mediaDevices.getMediaStream()
  if (mediaStream) {
    mediaStream.getAudioTracks()[0].enabled = val;
  }
}

export const requestVideoEnabled = async ({ state, effects }: Context, val: boolean) => {
  const mediaDevices = effects.localMedia.mediaDevices

  state.localMedia.videoEnabled = val
  const mediaStream = mediaDevices.getMediaStream()
  if (mediaStream) {
    mediaStream.getVideoTracks()[0].enabled = val;
  }
}
