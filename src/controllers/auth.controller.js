import { catchAsync } from "../middlewares/catch-async.js";
import { ApiError } from "../utils/custom-error.js";
import { successRes } from "../utils/success-response.js";
import User from "../schemas/user.schema.js";
import crypto from "../utils/crypto.js";
import token from "../utils/token.js";
import { setCache, getCache } from "../helpers/cache-control.js";
import { generateOTP } from "../utils/generate-otp.js";
import { sendMail } from "../utils/mail-service.js"

class AuthController {
    signIn = catchAsync(async (req, res) => {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        const isMatchPass = await crypto.encode(password, user?.hashedPassword);
        if (!user || !isMatchPass) {
            throw new ApiError('Email address or password invalid', 400)
        };
        const otp = generateOTP();
        setCache(email, otp);
        await sendMail(email, otp);
        return successRes(res, {
            otp
        })
    })

    confirmOTP = catchAsync(async (req, res) => {
        const { email, otp } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            throw new ApiError('Email is wrong, please try again', 404)
        }
        const casheData = getCache(email);
        if (!casheData || casheData != otp) {
            throw new ApiError('OPT expired or incorrect', 400)
        }
        const payload = { id: user._id, role: user.role, isActive: user.isActive };
        const accessToken = token.getAccess(payload);
        const refreshToken = token.getRefresh(payload, res);
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