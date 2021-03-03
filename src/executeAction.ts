
import * as recoilPortal from "./RecoilPortal"
import { sidebarExpandedState } from "./layout/layoutManager"

export async function executeAction() {
  alert("Toggle sidebar state from outside of React after 1 sec delay!")

  const result = await new Promise<boolean>(resolve => {
    const isExpanded = recoilPortal.getRecoilExternalLoadable(sidebarExpandedState).getValue()
    setTimeout(() => resolve(isExpanded), 1000)
  })

  recoilPortal.setRecoilExternalState(sidebarExpandedState, !result)
}