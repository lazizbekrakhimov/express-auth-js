import { ApiError } from "../utils/custom-error.js";

export function validator(schema) {
    return function (req, _res, next) {
        const { error } = schema(req.body);
        if (error) {
            throw new ApiError(error.details[0]?.message, 422)
        };
        return next()
    }
}