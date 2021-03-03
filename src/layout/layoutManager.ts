import { useMemo } from "react"
import { atom, useRecoilState, useRecoilValue } from "recoil"

// State atoms

export const sidebarExpandedState = atom({
  key: "sidebarExpandedState",
  default: false
})

// Subscribable state

export const useSidebarExpanded = () => useRecoilValue(sidebarExpandedState)

// Dispatcher

interface LayoutDispatcher {
  closeSidebar: () => void;
  openSidebar: () => void;
  toggleSidebar: () => void;
}

export const useLayoutDispatcher = (): LayoutDispatcher => {
  const [sidebarExpanded, setSidebarExpanded] = useRecoilState(sidebarExpandedState)

  return useMemo(() => ({
    closeSidebar: () => {
      setSidebarExpanded(false)
    },
    openSidebar: () => {
      setSidebarExpanded(true)
    },
    toggleSidebar: () => {
      setSidebarExpanded(!sidebarExpanded)
    }
  }), [sidebarExpanded, setSidebarExpanded])
}
