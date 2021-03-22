import { IContext } from 'overmind'
import { merge, namespaced } from 'overmind/config'
import {
  createStateHook,
  createActionsHook,
  createEffectsHook,
  createReactionHook
} from 'overmind-react'
import { state } from './state'
import * as layout from './layout'

export const config = merge(
  {
    state
  },
  namespaced({
    layout
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
