import { useCallback } from "react"
import { atom, useRecoilState, useRecoilValue } from "recoil"

// State atoms

const sidebarExpandedAtom = atom({
  key: "sidebarExpanded",
  default: false
})

// Subscribable state hooks

export const useSidebarExpanded = () => useRecoilValue(sidebarExpandedAtom)

// State transition hooks

export const useRequestSidebarExpanded = () => {
  const [, setSidebarExpanded] = useRecoilState(sidebarExpandedAtom)

  return useCallback(function requestSidebarOpen(val: boolean) {
    setSidebarExpanded(val)
  }, [setSidebarExpanded])
}

