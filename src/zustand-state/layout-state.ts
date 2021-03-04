
import create from "zustand"

type LayoutState = {
  sidebarExpanded: boolean
  requestSidebarExpanded: (val: boolean) => void
}

export const useLayoutStore = create<LayoutState>((set) => ({
  sidebarExpanded: false,
  requestSidebarExpanded(val: boolean) {
    set((state) => ({
      sidebarExpanded: val,
    }));
  },
}));