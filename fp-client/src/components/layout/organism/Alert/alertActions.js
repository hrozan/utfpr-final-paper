export const SHOW = "SHOW"
export const HIDE = "HIDE"

export function show(message) {
  return {
    type: SHOW,
    payload: message
  }
}

export function hide() {
  return {
    type: SHOW
  }
}
