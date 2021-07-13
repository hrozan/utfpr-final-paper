import Debug from "debug"
import * as process from "process"

const debug = Debug("app:config")

export enum Env {
	dev,
	prod,
	test,
}

export function getEnvVar(key: string): string {
	const envVar = process.env[key]
	if (!envVar) {
		throw new Error(`Fail to load env var ${key}`)
	}
	return envVar as string
}

function getNodeEnv(): Env {
	try {
		const nodeEnv = getEnvVar("NODE_ENV")
		switch (nodeEnv) {
			case "production":
				return Env.prod
			case "development":
				return Env.dev
			default:
				return Env.dev
		}
	} catch (e) {
		return Env.dev
	}
}

export class Config {
	env: Env
	brokerCredential: string
	databaseUri: string
	jwtKey: string
	port: number

	constructor() {
		this.env = getNodeEnv()
		if (this.env === Env.prod) {
			debug("production")

			this.brokerCredential = getEnvVar("BROKER_CREDENTIAL")
			this.databaseUri = getEnvVar("MONGO_URL")
			this.jwtKey = getEnvVar("JWT_KEY")
			this.port = parseInt(getEnvVar("PORT"))
		} else {
			debug("development")
			const databaseName = process.env.DB_NAME || "FinalPaper"
			this.brokerCredential = process.env.BROKER_CREDENTIAL || "users.pass123"
			this.databaseUri = process.env.MONGO_URL || `mongodb://localhost:27017/${databaseName}`
			this.jwtKey = process.env.JWT_KEY || "test-key"
			this.port = parseInt(process.env.PORT || "3000", 10)
		}
	}
}

export const config = new Config()
