
import create from "zustand"

type PermissionStatus = "INITIAL" | "REQUESTING" | "GRANTED" | "ERROR"

type LocalMediaState = {
  permissionStatus: PermissionStatus
  mediaStream: MediaStream | null
  audioEnabled: boolean
  videoEnabled: boolean
  requestPermission: () => Promise<void>
  requestAudioEnabled: (val: boolean) => void
  requestVideoEnabled: (val: boolean) => void
}

export const useLocalMediaStore = create<LocalMediaState>((set, get) => ({
  permissionStatus: "INITIAL",
  mediaStream: null,
  audioEnabled: true,
  videoEnabled: true,

  requestPermission: async () => {

    const setPermissionStatus = (permissionStatus: PermissionStatus) => set((state) => ({
      ...state,
      permissionStatus
    }))

    setPermissionStatus("REQUESTING")

    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true })
      set(state => ({
        ...state,
        mediaStream: mediaStream
      }))
      setPermissionStatus("GRANTED")
      mediaStream.getAudioTracks()[0].enabled = get().audioEnabled;
      mediaStream.getVideoTracks()[0].enabled = get().videoEnabled;
    } catch (err) {
      setPermissionStatus("ERROR")
    }
  },

  requestAudioEnabled(val: boolean) {
    set((state) => ({
      ...state,
      audioEnabled: val,
    }));
    const mediaStream = get().mediaStream
    if (mediaStream) {
      mediaStream.getAudioTracks()[0].enabled = val;
    }
  },

  requestVideoEnabled(val: boolean) {
    set((state) => ({
      ...state,
      videoEnabled: val,
    }));
    const mediaStream = get().mediaStream
    if (mediaStream) {
      mediaStream.getVideoTracks()[0].enabled = val;
    }
  },
}));
