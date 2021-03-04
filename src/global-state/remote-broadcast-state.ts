import { useCallback } from "react"
import { atom, useRecoilState, useRecoilValue } from "recoil"
import { useAudioEnabled, useRequestAudioEnabled, useRequestVideoEnabled, useVideoEnabled } from "./local-media-state"

// State atoms

export const remoteBroadcastActiveState = atom({
  key: "remoteBroadcastActiveState",
  default: false
})

/**
 * Used to store user's setting before the broadcast started
 */
const mediaEnabledBeforeBroadcastAtom = atom({
  key: "mediaEnabledBeforeBroadacst",
  default: {
    videoEnabled: true,
    audioEnabled: true
  }
})

// Subscribable state

export const useRemoveBroadcastActive = () => useRecoilValue(remoteBroadcastActiveState)


// State transitions

export const useStartRemoteBroadcast = () => {
  const requestVideoEnabled = useRequestVideoEnabled()
  const requestAudioEnabled = useRequestAudioEnabled()

  const videoEnabled = useVideoEnabled()
  const audioEnabled = useAudioEnabled()

  const [, setRemoteBroadcastActive] = useRecoilState(remoteBroadcastActiveState)
  const [, setMediaEnabledBeforeBroadcast] = useRecoilState(mediaEnabledBeforeBroadcastAtom)

  return useCallback(function startRemoteBroadcast() {
    setMediaEnabledBeforeBroadcast({ videoEnabled, audioEnabled })
    requestVideoEnabled(false)
    requestAudioEnabled(false)
    setRemoteBroadcastActive(true)
  }, [audioEnabled, requestAudioEnabled, requestVideoEnabled, setMediaEnabledBeforeBroadcast, setRemoteBroadcastActive, videoEnabled])
}

export const useStopRemoteBroadcast = () => {
  const mediaEnabledBeforeBroadcast = useRecoilValue(mediaEnabledBeforeBroadcastAtom)
  const requestVideoEnabled = useRequestVideoEnabled()
  const requestAudioEnabled = useRequestAudioEnabled()

  const [, setRemoteBroadcastActive] = useRecoilState(remoteBroadcastActiveState)

  return useCallback(function startRemoteBroadcast() {
    setRemoteBroadcastActive(false)
    requestVideoEnabled(mediaEnabledBeforeBroadcast.videoEnabled)
    requestAudioEnabled(mediaEnabledBeforeBroadcast.audioEnabled)
  }, [mediaEnabledBeforeBroadcast.audioEnabled, mediaEnabledBeforeBroadcast.videoEnabled, requestAudioEnabled, requestVideoEnabled, setRemoteBroadcastActive])
}
