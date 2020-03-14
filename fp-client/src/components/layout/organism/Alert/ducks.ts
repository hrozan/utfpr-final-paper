export const SHOW = "SHOW"
export const HIDE = "HIDE"

export interface AlertState {
  message: string
}

interface ShowAction {
  type: typeof SHOW
  payload: string
}

interface HideAction {
  type: typeof HIDE
}

type AlertAction = ShowAction | HideAction

const INITIAL_STATE: AlertState = {
  message: "",
}

export default function alertReducer(
  state = INITIAL_STATE,
  action: AlertAction,
) {
  switch (action.type) {
    case SHOW:
      return {
        ...state,
        message: action.payload,
      }
    case HIDE:
      return { ...INITIAL_STATE }
    default:
      return state
  }
}

export function hide(): HideAction {
  return {
    type: HIDE,
  }
}
export function show(message: string): ShowAction {
  return {
    type: SHOW,
    payload: message,
  }
}
