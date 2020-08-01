import React, { useEffect } from "react"
import Login from "./app/domain/login/Login"

const App: React.FC = () => {
  useEffect(() => {
    const ws = new WebSocket("ws://hrozan.xyz")
    ws.onopen = () => {
      console.log("Connected")
    }

    ws.onmessage = (e) => {
      // a message was received
      console.log(e.data)
    }
    console.log(ws)
  }, [])
  return <Login />
}

export default App
