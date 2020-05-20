import { Server } from "http"

export interface App {
  server: Server
  dbIsConnected: boolean
  shutdown: () => Promise<void>
}
