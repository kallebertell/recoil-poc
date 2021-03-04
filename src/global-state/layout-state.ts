import { useCallback } from "react"
import { atom, useRecoilState, useRecoilValue } from "recoil"

// State atoms

export const sidebarExpandedState = atom({
  key: "sidebarExpandedState",
  default: false
})

// Subscribable state

export const useSidebarExpanded = () => useRecoilValue(sidebarExpandedState)

// State transition

export const useRequestSidebarExpanded = () => {
  const [, setSidebarExpanded] = useRecoilState(sidebarExpandedState)

  return useCallback(function requestSidebarOpen(val: boolean) {
    setSidebarExpanded(val)
  }, [setSidebarExpanded])
}

