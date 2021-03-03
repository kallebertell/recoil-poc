import { useMemo, useState } from "react"
import { atom, useRecoilState, useRecoilValue } from "recoil"
import { useAudioEnabled, useLocalMediaDispatcher, useVideoEnabled } from "../local-media/localMediaManager"

// State atoms

export const remoteBroadcastActiveState = atom({
  key: "remoteBroadcastActiveState",
  default: false
})

// Subscribable state

export const useRemoveBroadcastActive = () => useRecoilValue(remoteBroadcastActiveState)

// Dispatcher

interface RemoteBroadcastDispatcher {
  startRemoteBroadcast: () => void;
  stopRemoteBroadcast: () => void;
}

export const useRemoteBroadcastDispatcher = (): RemoteBroadcastDispatcher => {
  const { requestVideoEnabled, requestAudioEnabled } = useLocalMediaDispatcher()
  const videoEnabled = useVideoEnabled()
  const audioEnabled = useAudioEnabled()

  const [, setRemoteBroadcastActive] = useRecoilState(remoteBroadcastActiveState)
  const [videoEnabledBeforeBroadcast, setVideoEnabledBeforeBroadcast] = useState(videoEnabled)
  const [audioEnabledBeforeBroadcast, setAudioEnabledBeforeBroadcast] = useState(audioEnabled)

  return useMemo(() => ({

    startRemoteBroadcast: () => {
      setVideoEnabledBeforeBroadcast(videoEnabled)
      setAudioEnabledBeforeBroadcast(audioEnabled)
      requestVideoEnabled(false)
      requestAudioEnabled(false)
      setRemoteBroadcastActive(true)
    },

    stopRemoteBroadcast: () => {
      setRemoteBroadcastActive(false)
      requestVideoEnabled(videoEnabledBeforeBroadcast)
      requestAudioEnabled(audioEnabledBeforeBroadcast)
    }

  }), [setRemoteBroadcastActive, videoEnabled, audioEnabled, requestVideoEnabled, requestAudioEnabled, videoEnabledBeforeBroadcast, audioEnabledBeforeBroadcast])
}
