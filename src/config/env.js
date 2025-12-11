import { config } from "dotenv";
config();

export const envConfig = {
    PORT: Number(process.env.PORT),
    MONGO_URI: String(process.env.MONGO_URI),
    SUPERADMIN: {
        PHONE: String(process.env.SUPERADMIN_PHONE),
        EMAIL: String(process.env.SUPERADMIN_EMAIL),
        PASSWORD: String(process.env.SUPERADMIN_PASSWORD)
    },
    TOKEN: {
        ACCESS_KEY: String(process.env.ACCESS_TOKEN_KEY),
        ACCESS_TIME: String(process.env.ACCESS_TOKEN_TIME),
        REFRESH_KEY: String(process.env.REFRESH_TOKEN_KEY),
        REFRESH_TIME: String(process.env.REFRESH_TOKEN_TIME)
    },
    SMS_TOKEN: String(process.env.ESKIZ_SMS_TOKEN),
    MAIL: {
        HOST: String(process.env.MAIL_HOST),
        PORT: Number(process.env.MAIL_PORT),
        USER: String(process.env.MAIL_USER),
        PASS: String(process.env.MAIL_PASS)
    }
};