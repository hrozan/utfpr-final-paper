import { ON_CONNECTED, ON_DISCONNECTED, ON_MESSAGE } from "./mqttActions"

const initialState = {
  connected: false,
  data: {}
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
    case ON_MESSAGE:
      return {
        ...state,
        data: action.payload
      }
    default:
      return state
  }
}

export default mqttReducer
