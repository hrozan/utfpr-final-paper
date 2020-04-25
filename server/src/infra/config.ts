import urlJoin from "url-join"

export const PORT: number = parseInt(process.env.PORT || "3000")
export const API_PREFIX = "api"
export const API_VERSION = "v1"
export const API_BASE_PATH = urlJoin("/", API_PREFIX, API_VERSION)

export const DATABASE_NAME = process.env.DB_NAME || "FinalPaper"
export const DATABASE_URI = process.env.MONGO_URL || `mongodb://localhost:27017/${DATABASE_NAME}`
