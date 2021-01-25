// todo: load .env
export type Config = {
  port: number
  databaseName: string
  databaseUri: string
  jwtKey: string
  env: string
  brokerCredential: string
}

const databaseName = process.env.DB_NAME || "FinalPaper"

export const config: Config = {
  brokerCredential: process.env.BROKER_CREDENTIAL || "user.pass123",
  databaseName,
  databaseUri: process.env.MONGO_URL || `mongodb://localhost:27017/${databaseName}`,
  env: process.env.NODE_ENV || "development",
  jwtKey: process.env.JWT_KEY || "test-key",
  port: parseInt(process.env.PORT || "3000", 10),
}
