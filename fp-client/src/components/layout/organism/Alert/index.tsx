import { store } from "../../../../store"
import { show, hide } from "./ducks"

const HIDE_TIME = 3000

const alert = {
  show(message: string) {
    store.dispatch(show(message))
    setTimeout(() => {
      store.dispatch(hide())
    }, HIDE_TIME)
  }
}

export default alert
