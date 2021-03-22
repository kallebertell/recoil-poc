

import { Context } from ".";

export const incrementFastNumber = ({ state }: Context) => {
  state.fastNumber = new Date().getTime()
}
