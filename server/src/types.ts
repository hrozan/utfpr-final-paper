import { Server } from "http"

export interface App {
  server: Server
  shutdown: () => Promise<void>
}
