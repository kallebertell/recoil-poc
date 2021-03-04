import { useCallback } from "react"
import { atom, useRecoilState, useRecoilValue } from "recoil"

// State atoms

type PermissionStatus = "INITIAL" | "REQUESTING" | "GRANTED" | "ERROR"

const permissionStatusAtom = atom<PermissionStatus>({
  key: "permissionStatus",
  default: "INITIAL"
})

const localMediaStreamAtom = atom<MediaStream | null>({
  key: "localMediaStream",
  default: null
})

const audioEnabledAtom = atom<boolean>({
  key: "audioEnabledState",
  default: true
})

const videoEnabledAtom = atom<boolean>({
  key: "videoEnabledState",
  default: true
})

// Subscribable state hooks

export const useLocalMediaPermissionStatus = () => useRecoilValue(permissionStatusAtom)

export const useLocalMediaStream = () => useRecoilValue(localMediaStreamAtom)

export const useAudioEnabled = () => useRecoilValue(audioEnabledAtom)

export const useVideoEnabled = () => useRecoilValue(videoEnabledAtom)

// State transitions hooks

export const useRequestPermission = () => {
  const [, setPermissionStatus] = useRecoilState(permissionStatusAtom)
  const [, setMediaStream] = useRecoilState(localMediaStreamAtom)
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
  const [, setAudioEnabled] = useRecoilState(audioEnabledAtom)

  return useCallback(function requestAudioEnabled(val: boolean) {
    setAudioEnabled(val)

    if (mediaStream) {
      mediaStream.getAudioTracks()[0].enabled = val;
    }
  }, [mediaStream, setAudioEnabled])
}

export const useRequestVideoEnabled = () => {
  const mediaStream = useLocalMediaStream()
  const [, setVideoEnabled] = useRecoilState(videoEnabledAtom)

  return useCallback(function requestVideoEnabled(val: boolean) {
    setVideoEnabled(val)
    if (mediaStream) {
      mediaStream.getVideoTracks()[0].enabled = val;
    }
  }, [mediaStream, setVideoEnabled])
}
