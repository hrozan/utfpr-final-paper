import { ON_CONNECTED, ON_DISCONNECTED } from "./mqttActions"

const initialState = {
  connected: false
}

function mqttReducer(state = initialState, action) {
  switch (action.type) {
    case ON_CONNECTED:
      return {
        ...state,
        connected: true
      }
    case ON_DISCONNECTED:
      return {
        ...state,
        connected: false
      }
    default:
      return state
  }
}

export default mqttReducer
