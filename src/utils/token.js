import jwt from "jsonwebtoken";
import { envConfig } from "../config/env.js";

class Token {
    getAccess(payload){
        const accessToken = jwt.sign(payload, envConfig.TOKEN.ACCESS_KEY, {
            expiresIn: envConfig.TOKEN.ACCESS_TIME
        });
        return accessToken
    }

    getRefresh(payload, res){
        const refreshToken = jwt.sign(payload, envConfig.TOKEN.REFRESH_KEY, {
            expiresIn: envConfig.TOKEN.REFRESH_TIME
        });
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: false,
            maxAge: 30 * 24 * 60 * 60 * 1000
        });
        return refreshToken;
    }

    verifyAccess(token){
        const isCorrect = jwt.verify(token, envConfig.TOKEN.ACCESS_KEY);
        return isCorrect;
    }

    verifyRefresh(token){
        const isCorrect = jwt.verify(token, envConfig.TOKEN.REFRESH_KEY);
        return isCorrect;
    }
}

export default new Token()