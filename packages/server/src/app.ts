import "reflect-metadata"
import Koa from "koa"
import { Server } from "http"
import Debug from "debug"
import morgan from "koa-morgan"
import bodyParser from "koa-bodyparser"
import cors from "@koa/cors"
import { config, Config, Env } from "./config"
import { loadRoutes } from "./routes"
import { Connection, createConnection } from "typeorm"

const debug = Debug("app")

export class Application {
	public readonly app: Koa
	public server: Server | null
	public readonly config: Config
	private databaseConnection: Connection

	constructor() {
		this.app = new Koa()
		this.config = config
		this.server = null
	}

	build(env = this.config.env): Application {
		if (env !== Env.test) {
			this.app.use(morgan("combined"))
		}

		this.app.silent = env !== Env.dev
		this.app.use(cors())
		this.app.use(bodyParser())
		loadRoutes(this.app)

		return this
	}

	async shutdown(): Promise<void> {
		if (!this.server) {
			return
		}
		await this.databaseConnection.close()
		this.server.close()
	}

	async run(port = this.config.port): Promise<Server> {
		this.databaseConnection = await createConnection()
		this.app.context.db = this.databaseConnection
		this.server = this.app.listen(port)

		debug(`running on: http://localhost:${port}`)

		process.on("SIGTERM", this.shutdown)
		process.on("SIGINT", this.shutdown)

		return this.server
	}
}
