import { catchAsync } from "../middlewares/catch-async.js";
import { ApiError } from "../utils/custom-error.js";
import token from "../utils/token.js";

export const authGuard = catchAsync(async (req, _res, next) => {
    const auth = req.headers?.authorization;
    if (!auth) {
        throw new ApiError("User did not sign in", 401)
    }
    const bearer = auth.split(' ')[0];
    const accessToken = auth.split(' ')[1];
    if (bearer != 'Bearer' || !accessToken) {
        throw new ApiError("User did not sign in", 401)
    }
    const data = token.verifyAccess(accessToken);
    if (!data) {
        throw new ApiError("User did not sign in", 401)
    }
    req.user = data;
    return next();
})