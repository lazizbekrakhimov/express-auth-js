import { catchAsync } from "../middlewares/catch-async.js";
import { ApiError } from "../utils/custom-error.js";

export const roleGuard = (...roles) => {
    return catchAsync(async (req, res, next) => {
        if (roles.includes('ID') && req.user?.id === req.params.id) {
            return next();
        }
        if (!roles.includes(req.user?.role)) {
            throw new ApiError('Forbidden user', 403)
        }
        return next();
    })
}