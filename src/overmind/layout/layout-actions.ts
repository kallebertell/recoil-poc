import { Context } from "..";

export const requestSidebarExpanded = ({ state }: Context, val: boolean) => {
  state.layout.sidebarExpanded = val
}
