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
  default: false
})

// Subscribable state

export const useLocalMediaPermissionStatus = () => useRecoilValue(permissionStatusState)

export const useLocalMediaStream = () => useRecoilValue(localMediaStreamState)

export const useAudioEnabled = () => useRecoilValue(audioEnabledState)

// Dispatcher

interface LocalMediaDispatcher {
  requestPermission: () => Promise<void>;
  toggleAudio: () => void
}

export const useLocalMediaDispatcher = (): LocalMediaDispatcher => {
  const [, setPermissionStatus] = useRecoilState(permissionStatusState)
  const [mediaStream, setMediaStream] = useRecoilState(localMediaStreamState)
  const [audioEnabled, setAudioEnabled] = useRecoilState(audioEnabledState)

  return useMemo<LocalMediaDispatcher>(() => ({

    requestPermission: async () => {
      setPermissionStatus("REQUESTING")
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true })
        setMediaStream(mediaStream)
        setPermissionStatus("GRANTED")
        mediaStream.getAudioTracks()[0].enabled = audioEnabled;
      } catch (err) {
        setPermissionStatus("ERROR")
      }
    },

    toggleAudio() {
      const newState = !audioEnabled
      setAudioEnabled(newState)

      if (mediaStream) {
        mediaStream.getAudioTracks()[0].enabled = newState;
      }
    }

  }), [setPermissionStatus, mediaStream, setMediaStream, audioEnabled, setAudioEnabled])
}
