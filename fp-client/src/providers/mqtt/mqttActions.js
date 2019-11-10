export const ON_CONNECTED = "ON_CONNECTED"
export const ON_DISCONNECTED = "ON_DISCONNECTED"

export function onConnected() {
  return {
    type: ON_CONNECTED
  }
}

export function onDisconnected() {
  return {
    type: ON_DISCONNECTED
  }
}
