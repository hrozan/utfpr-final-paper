import { SHOW, HIDE } from "./alertActions"

const INITIAL_STATE = {
  message: ""
}

export default function alertReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SHOW:
      return {
        ...state,
        message: action.payload
      }
    case HIDE:
      return { ...INITIAL_STATE }
    default:
      return state
  }
}
