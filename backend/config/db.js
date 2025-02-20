import mongoose from "mongoose";
import { ENV_VAR } from "./envVars.js";

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(ENV_VAR.MONGO_URI)
        console.log("connected at :" + conn.connection.host)
    }
    catch (error) {

        console.error("error:" + error.message)
        process.exit(1)
    }
}