import React from "react"
import { BrowserRouter as Router } from "react-router-dom"
import { Provider } from "react-redux"
import store from "./store"

import Menu from "./components/Menu"
import Routes from "./routes"

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <Menu />
          <Routes />
        </div>
      </Router>
    </Provider>
  )
}

export default App
