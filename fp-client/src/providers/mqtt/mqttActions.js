export const ON_CONNECTED = "ON_CONNECTED"
export const ON_DISCONNECTED = "ON_DISCONNECTED"
export const ON_MESSAGE = "ON_MESSAGE"

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

export function onMessage(payload) {
  return {
    type: ON_MESSAGE,
    payload
  }
}
