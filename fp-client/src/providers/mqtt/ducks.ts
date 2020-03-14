export const ON_CONNECTED = "mqtt/ON_CONNECTED"
export const ON_DISCONNECTED = "mqttON_DISCONNECTED"
export const ON_MESSAGE = "ON_MESSAGE"

export interface MQTTData {
  connected: boolean
  data: object
}

interface ConnectedAction {
  type: typeof ON_CONNECTED
}

interface DisconnectedAction {
  type: typeof ON_DISCONNECTED
}

interface MessageAction {
  type: typeof ON_MESSAGE
  payload: object
}

type MQTTAction = ConnectedAction | DisconnectedAction | MessageAction

const INITIAL_STATE: MQTTData = {
  connected: false,
  data: {},
}

export default function mqttReducer(state = INITIAL_STATE, action: MQTTAction) {
  switch (action.type) {
    case ON_CONNECTED:
      return {
        ...state,
        connected: true,
      }
    case ON_DISCONNECTED:
      return {
        ...state,
        connected: false,
      }
    case ON_MESSAGE:
      return {
        ...state,
        data: action.payload,
      }
    default:
      return state
  }
}

export function onConnected(): ConnectedAction {
  return {
    type: ON_CONNECTED,
  }
}

export function onDisconnected(): DisconnectedAction {
  return {
    type: ON_DISCONNECTED,
  }
}

export function onMessage(payload: object): MessageAction {
  return {
    type: ON_MESSAGE,
    payload,
  }
}
