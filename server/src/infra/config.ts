export const PORT: number = parseInt(process.env.PORT || "3000")
export const DATABASE_NAME = process.env.DB_NAME || "FinalPaper"
export const DATABASE_URI = process.env.MONGO_URL || `mongodb://localhost:27017/${DATABASE_NAME}`
export const JWT_KEY = process.env.JWT_KEY || "test-key"
