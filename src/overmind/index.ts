import { IContext } from 'overmind'
import { merge, namespaced } from 'overmind/config'
import {
  createStateHook,
  createActionsHook,
  createEffectsHook,
  createReactionHook
} from 'overmind-react'
import { state } from './state'
import * as actions from './actions'
import * as layout from './layout'
import * as localMedia from './local-media'
import * as remoteBroadcast from './remote-broadcast'

export const config = merge(
  {
    state,
    actions
  },
  namespaced({
    layout,
    localMedia,
    remoteBroadcast
  })
)

export type Context = IContext<{
  state: typeof config.state,
  actions: typeof config.actions,
  effects: typeof config.effects
}>

export const useAppState = createStateHook<Context>()
export const useActions = createActionsHook<Context>()
export const useEffects = createEffectsHook<Context>()
export const useReaction = createReactionHook<Context>()

