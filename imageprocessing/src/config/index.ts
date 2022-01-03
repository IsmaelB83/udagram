// Node Imports
import dotenv from "dotenv";
dotenv.config();

// Constants
const config = {
    PORT: process.env.PORT,
    BACKEND_SERVER: process.env.BACKEND_SERVER
}

// Export
export default config;