import { createTransport } from "nodemailer";
import { envConfig } from "../config/env.js";

export const sendMail = async (user, message) => {
    const transporter = createTransport({
        service: 'gmail',
        host: envConfig.MAIL.HOST,
        port: envConfig.MAIL.PORT,
        auth: {
            user: envConfig.MAIL.USER,
            pass: envConfig.MAIL.PASS
        }
    });
    const mailOptions = {
        from: envConfig.MAIL.USER,
        to: user,
        subject: 'Mailman',
        text: message
    };
    const res = await transporter.sendMail(mailOptions);
    return res;
}