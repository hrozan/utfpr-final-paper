import React from "react"
import { BrowserRouter as Router } from "react-router-dom"
import { store, persistor } from "./store"
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"

import Menu from "./components/Menu"
import Routes from "./components/Routes"
import Alert from "./components/layout/organism/Alert/AlertModal"

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <div>
            <Menu />
            <Routes />
            <Alert />
          </div>
        </Router>
      </PersistGate>
    </Provider>
  )
}

export default App
