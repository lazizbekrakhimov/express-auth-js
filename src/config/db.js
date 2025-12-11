import { connect } from "mongoose";
import { envConfig } from "./env.js"

export async function connectDB() {
    try {
        await connect(envConfig.MONGO_URI);
        console.log('Database connected')
    } catch (error) {
        console.log('Error on connecting database: ', error)
    }
}