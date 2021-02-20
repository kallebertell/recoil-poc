
import * as recoilPortal from "./RecoilPortal"
import { nameState } from "./atoms";

export async function executeAction() {
  console.log("Running async execute action")

  const result = await new Promise<string>(resolve => {
    const name = recoilPortal.getRecoilExternalLoadable(nameState)
    setTimeout(() => resolve(name.contents + "1"), 1009)
  })

  recoilPortal.setRecoilExternalState(nameState, result)
  console.log("Execute action committed new state")
}