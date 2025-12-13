import Joi from "joi";
import { Genders } from '../enums/const-roles.js';

class UserValidator {
    static phoneRegex = /^\+[1-9]\d{1,14}$/;
    static passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;

    create(data) {
        const user = Joi.object({
            fullName: Joi.string().optional(),
            phoneNumber: Joi.string().regex(UserValidator.phoneRegex).required(),
            email: Joi.string().email().required(),
            password: Joi.string().regex(UserValidator.passwordRegex).required(),
            address: Joi.string().optional(),
            image: Joi.string().optional(),
            gender: Joi.string().valid(Genders.MALE, Genders.FEMALE).optional()
        });
        return user.validate(data);
    }

    update(data) {
        const user = Joi.object({
            fullName: Joi.string().optional(),
            phoneNumber: Joi.string().regex(UserValidator.phoneRegex).optional(),
            email: Joi.string().email().optional(),
            password: Joi.string().regex(UserValidator.passwordRegex).optional(),
            address: Joi.string().optional(),
            image: Joi.string().optional(),
            gender: Joi.string().valid(Genders.MALE, Genders.FEMALE).optional(),
            isActive: Joi.bool().optional()
        });
        return user.validate(data);
    }

    signin(data) {
        const user = Joi.object({
            email: Joi.string().required(),
            password: Joi.string().required(),
        });
        return user.validate(data);
    }

    confirmOTP(data) {
        const user = Joi.object({
            email: Joi.string().required(),
            otp: Joi.string().required(),
        });
        return user.validate(data);
    }
}

export default new UserValidator();