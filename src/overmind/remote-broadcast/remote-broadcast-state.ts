
type RemoteBroadcastState = {
  remoteBroadcastActive: boolean
  mediaEnabledBeforeBroadcast: {
    audioEnabled: boolean
    videoEnabled: boolean
  }
}

export const state: RemoteBroadcastState = {
  remoteBroadcastActive: false,
  mediaEnabledBeforeBroadcast: {
    audioEnabled: false,
    videoEnabled: false,
  }
}
