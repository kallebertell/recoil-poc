import { Context } from "..";

export const startRemoteBroadcast = async ({ state, actions }: Context) => {
  state.remoteBroadcast.mediaEnabledBeforeBroadcast = {
    audioEnabled: state.localMedia.audioEnabled,
    videoEnabled: state.localMedia.videoEnabled
  }

  // TODO: actions are not typed
  const { localMedia: { requestAudioEnabled, requestVideoEnabled } } = actions as any;
  requestAudioEnabled(false)
  requestVideoEnabled(false)

  state.remoteBroadcast.remoteBroadcastActive = true
}

export const stopRemoteBroadcast = async ({ state, actions }: Context, val: boolean) => {
  state.remoteBroadcast.remoteBroadcastActive = false
  // TODO: actions are not typed
  const { localMedia: { requestAudioEnabled, requestVideoEnabled } } = actions as any;
  requestAudioEnabled(state.remoteBroadcast.mediaEnabledBeforeBroadcast.audioEnabled)
  requestVideoEnabled(state.remoteBroadcast.mediaEnabledBeforeBroadcast.videoEnabled)

}
