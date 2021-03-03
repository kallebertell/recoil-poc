import { useMemo } from "react"
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

// Subscribable state

export const useLocalMediaPermissionStatus = () => useRecoilValue(permissionStatusState)

export const useLocalMediaStream = () => useRecoilValue(localMediaStreamState)

export const useAudioEnabled = () => useRecoilValue(audioEnabledState)

export const useVideoEnabled = () => useRecoilValue(videoEnabledState)

// Dispatcher

interface LocalMediaDispatcher {
  requestPermission: () => Promise<void>;
  requestAudioEnabled: (val: boolean) => void
  requestVideoEnabled: (val: boolean) => void
}

export const useLocalMediaDispatcher = (): LocalMediaDispatcher => {
  const [, setPermissionStatus] = useRecoilState(permissionStatusState)
  const [mediaStream, setMediaStream] = useRecoilState(localMediaStreamState)
  const [audioEnabled, setAudioEnabled] = useRecoilState(audioEnabledState)
  const [videoEnabled, setVideoEnabled] = useRecoilState(videoEnabledState)

  return useMemo<LocalMediaDispatcher>(() => ({

    requestPermission: async () => {
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
    },

    requestAudioEnabled(val: boolean) {
      setAudioEnabled(val)

      if (mediaStream) {
        mediaStream.getAudioTracks()[0].enabled = val;
      }
    },

    requestVideoEnabled(val: boolean) {
      setVideoEnabled(val)
      if (mediaStream) {
        mediaStream.getVideoTracks()[0].enabled = val;
      }
    }

  }), [setPermissionStatus, mediaStream, setMediaStream, audioEnabled, setAudioEnabled, videoEnabled, setVideoEnabled])
}
