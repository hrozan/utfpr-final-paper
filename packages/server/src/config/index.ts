import Debug from "debug"

const debug = Debug("app:config")

export enum Env {
  dev,
  prod,
  test,
}

export type Index = {
  port: number
  databaseName?: string
  databaseUri: string
  jwtKey: string
  env: Env
  brokerCredential: string
}

const getEnvVar = (envVar: any) => {
  if (envVar !== undefined) return envVar
  throw new Error("fail to load config in production")
}

const parseNodeEnv = (nodeEnv: string | undefined): Env => {
  switch (nodeEnv) {
    case "production":
      return Env.prod
    case "development":
      return Env.dev
    default:
      return Env.dev
  }
}

export let config: Index

const nodeEnv = parseNodeEnv(process.env.NODE_ENV)
if (nodeEnv === Env.prod) {
  debug("production")
  const { env } = process
  const databaseName = getEnvVar(env.DB_NAME)

  config = {
    brokerCredential: getEnvVar(env.BROKER_CREDENTIAL),
    databaseUri: getEnvVar(env.MONGO_URL),
    env: nodeEnv,
    jwtKey: getEnvVar(env.JWT_KEY),
    port: getEnvVar(env.PORT),
  }
} else {
  debug("development")
  const databaseName = process.env.DB_NAME || "FinalPaper"
  config = {
    brokerCredential: process.env.BROKER_CREDENTIAL || "user.pass123",
    databaseName,
    databaseUri: process.env.MONGO_URL || `mongodb://localhost:27017/${databaseName}`,
    env: parseNodeEnv(process.env.NODE_ENV || "development"),
    jwtKey: process.env.JWT_KEY || "test-key",
    port: parseInt(process.env.PORT || "3000", 10),
  }
}
