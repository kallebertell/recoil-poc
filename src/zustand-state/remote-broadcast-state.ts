
import create from "zustand"
import { useLocalMediaStore } from "./local-media-state";

type MediaEnabled = { audioEnabled: boolean, videoEnabled: boolean }

type RemoteBroadcastState = {
  mediaEnabledBeforeBroadcast: MediaEnabled
  remoteBroadcastActive: boolean
  startRemoteBroadcast: (mediaEnabledBeforeBroadcast: MediaEnabled) => void
  stopRemoteBroadcast: () => void
}

export const useRemoteBroadcastStore = create<RemoteBroadcastState>((set) => ({
  mediaEnabledBeforeBroadcast: {
    audioEnabled: true,
    videoEnabled: true
  },

  remoteBroadcastActive: false,

  startRemoteBroadcast: (mediaEnabledBeforeBroadcast: MediaEnabled) => {
    set(state => ({
      ...state,
      remoteBroadcastActive: true,
      mediaEnabledBeforeBroadcast
    }))
  },

  stopRemoteBroadcast: () => {
    set(state => ({
      remoteBroadcastActive: false
    }))
  }

}));


// Hooks which return an action collaborating with multiple separate stores

export const useStartRemoteBroadcast = () => {
  const mediaEnabledBeforeBroadcast = useLocalMediaStore(({ audioEnabled, videoEnabled }) => ({ audioEnabled, videoEnabled }))
  const requestAudioEnabled = useLocalMediaStore(state => state.requestAudioEnabled)
  const requestVideoEnabled = useLocalMediaStore(state => state.requestVideoEnabled)

  const _startRemoteBroadcast = useRemoteBroadcastStore(state => state.startRemoteBroadcast)

  return function startRemoteBroadcast() {
    requestAudioEnabled(false)
    requestVideoEnabled(false)
    _startRemoteBroadcast(mediaEnabledBeforeBroadcast)
  }
}

export const useStopRemoteBroadcast = () => {
  const mediaEnabledBeforeBroadcast = useRemoteBroadcastStore(state => state.mediaEnabledBeforeBroadcast)
  const requestAudioEnabled = useLocalMediaStore(state => state.requestAudioEnabled)
  const requestVideoEnabled = useLocalMediaStore(state => state.requestVideoEnabled)
  const _stopRemoteBroadcast = useRemoteBroadcastStore(state => state.stopRemoteBroadcast)

  return function stopRemoteBroadcast() {
    requestAudioEnabled(mediaEnabledBeforeBroadcast.audioEnabled)
    requestVideoEnabled(mediaEnabledBeforeBroadcast.videoEnabled)
    _stopRemoteBroadcast()
  }
}
