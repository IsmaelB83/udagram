// Node Imports
import dotenv from "dotenv";
dotenv.config();

// Constants
const config = {
    PORT: process.env.PORT,
    AUTH_SERVER: process.env.AUTH_SERVER
}

// Export
export default config;