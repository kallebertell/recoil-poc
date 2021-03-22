
type PermissionStatus = "INITIAL" | "REQUESTING" | "GRANTED" | "ERROR"

type localMediaState = {
  permissionStatus: PermissionStatus
  audioEnabled: boolean
  videoEnabled: boolean
}

export const state: localMediaState = {
  permissionStatus: "INITIAL",
  audioEnabled: true,
  videoEnabled: true,
}

