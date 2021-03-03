import { atom } from "recoil";


export const nameState = atom({
  key: "name",
  default: "George"
})


export const createFastNumberState = (idx: number) => atom({
  key: `fastNumberState-${idx}`,
  default: 0
})