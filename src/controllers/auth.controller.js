import { catchAsync } from "../middlewares/catch-async.js";
import { ApiError } from "../utils/custom-error.js";
import { successRes } from "../utils/success-response.js";
import User from "../schemas/user.schema.js";
import crypto from "../utils/crypto.js";
import token from "../utils/token.js";
import { envConfig } from "../config/env.js";

class AuthController {
    signIn = catchAsync(async (req, res) => {
        const { phoneNumber, password } = req.body;
        const user = await User.findOne({ phoneNumber });
        const isMatchPass = await crypto.encode(password, user?.hashedPassword);
        if (!user || !isMatchPass) {
            throw new ApiError('Phone number or password invalid', 400)
        };
        const payload = { id: user._id, role: user.role, isActive: user.isActive };
        const accessToken = token.getAccess(payload);
        const refreshToken = token.getRefresh(payload, res);
        const formdata = new FormData();
        formdata.append("mobile_phone", phoneNumber);
        formdata.append("message", "Bu Eskiz dan test");
        formdata.append("from", "4546");
        formdata.append("callback_url", "http://0000.uz/test.php");
        const requestOptions = {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${envConfig.SMS_TOKEN}`
            },
            body: formdata,
            redirect: 'follow'
        };

        const response = await fetch("https://notify.eskiz.uz/api/message/sms/send", requestOptions);
        const data = await response.json();
        console.log(data)
        if (!data || data?.status === 'error') {
            throw new ApiError(data?.message || 'Error on sending SMS', 400);
        }
        return successRes(res, {
            user,
            accessToken,
            refreshToken
        })
    })

    getAccessToken = catchAsync(async (req, res) => {
        const refreshToken = req.cookies?.refreshToken;
        if (!refreshToken) {
            throw new ApiError('Please sign in firstly', 401);
        }
        const data = token.verifyRefresh(refreshToken);
        if (!data) {
            throw new ApiError('Something went wrong. Please sign in again', 401);
        }
        const user = await User.findById(data?.id);
        if (!user) {
            throw new ApiError('Your data is not found', 400);
        }
        const payload = { id: user._id, role: user.role, isActive: user.isActive };
        const accessToken = token.getAccess(payload);
        return successRes(res, {
            token: accessToken
        });
    })

    signOut = catchAsync(async (req, res) => {
        const refreshToken = req.cookies?.refreshToken;
        if (refreshToken) {
            res.clearCookie('refreshToken');
        }
        return successRes(res, {});
    })
}

export default new AuthController();