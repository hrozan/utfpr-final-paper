export const SHOW = "SHOW"
export const HIDE = "HIDE"

export function show(message: string) {
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
