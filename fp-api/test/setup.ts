import { config } from "dotenv"
config({ path: ".env.test" })

import { connectDatabase } from "./config"
export default connectDatabase
