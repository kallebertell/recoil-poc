import { useCallback } from "react"
import { atom, useRecoilState, useRecoilValue } from "recoil"

// State atoms

type PermissionStatus = "INITIAL" | "REQUESTING" | "GRANTED" | "ERROR"

const permissionStatusState = atom<PermissionStatus>({
  key: "permissionStatus",
  default: "INITIAL"
})

const localMediaStreamState = atom<MediaStream | null>({
  key: "localMediaStream",
  default: null
})

const audioEnabledState = atom<boolean>({
  key: "audioEnabledState",
  default: true
})

const videoEnabledState = atom<boolean>({
  key: "videoEnabledState",
  default: true
})

// Subscribable state hooks

export const useLocalMediaPermissionStatus = () => useRecoilValue(permissionStatusState)

export const useLocalMediaStream = () => useRecoilValue(localMediaStreamState)

export const useAudioEnabled = () => useRecoilValue(audioEnabledState)

export const useVideoEnabled = () => useRecoilValue(videoEnabledState)

// State transitions hooks

export const useRequestPermission = () => {
  const [, setPermissionStatus] = useRecoilState(permissionStatusState)
  const [, setMediaStream] = useRecoilState(localMediaStreamState)
  const audioEnabled = useAudioEnabled()
  const videoEnabled = useVideoEnabled()

  return useCallback(async function requestPermission() {
    setPermissionStatus("REQUESTING")
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true })
      setMediaStream(mediaStream)
      setPermissionStatus("GRANTED")
      mediaStream.getAudioTracks()[0].enabled = audioEnabled;
      mediaStream.getVideoTracks()[0].enabled = videoEnabled;
    } catch (err) {
      setPermissionStatus("ERROR")
    }
  }, [setPermissionStatus, setMediaStream, audioEnabled, videoEnabled])
}

export const useRequestAudioEnabled = () => {
  const mediaStream = useLocalMediaStream()
  const [, setAudioEnabled] = useRecoilState(audioEnabledState)

  return useCallback(function requestAudioEnabled(val: boolean) {
    setAudioEnabled(val)

    if (mediaStream) {
      mediaStream.getAudioTracks()[0].enabled = val;
    }
  }, [mediaStream, setAudioEnabled])
}

export const useRequestVideoEnabled = () => {
  const mediaStream = useLocalMediaStream()
  const [, setVideoEnabled] = useRecoilState(videoEnabledState)

  return useCallback(function requestVideoEnabled(val: boolean) {
    setVideoEnabled(val)
    if (mediaStream) {
      mediaStream.getVideoTracks()[0].enabled = val;
    }
  }, [mediaStream, setVideoEnabled])
}
