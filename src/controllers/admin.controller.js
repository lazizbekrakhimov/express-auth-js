import { BaseController } from "./base.controller.js";
import Admin from "../schemas/user.schema.js";
import { catchAsync } from "../middlewares/catch-async.js";
import crypto from "../utils/crypto.js";
import { successRes } from "../utils/success-response.js";
import { Roles } from "../enums/const-roles.js";
import { ApiError } from "../utils/custom-error.js";

class AdminController extends BaseController {
    create = catchAsync(async (req, res) => {
        const { phoneNumber, email, password } = req.body;
        await this._isExist({ phoneNumber }, 'Phone number');
        if (email) {
            await this._isExist({ email }, 'Email address');
        }
        const hashedPassword = await crypto.decode(password);
        delete req.body?.password;
        const newAdmin = await Admin.create({
            hashedPassword,
            role: Roles.ADMIN,
            ...req.body
        });
        return successRes(res, newAdmin, 201);
    })

    update = catchAsync(async (req, res) => {
        const id = req.params?.id;
        const admin = await this._getById(id);
        const { phoneNumber, email, password } = req.body;
        if (phoneNumber) {
            const existsPhone = await Admin.findOne({ phoneNumber });
            if (existsPhone && existsPhone.id != id) {
                throw new ApiError('Phone number already exists', 409);
            }
        }
        if (email) {
            const existsEmail = await Admin.findOne({ email });
            if (existsEmail && existsEmail.id != id) {
                throw new ApiError('Email address already exists', 409);
            }
        }
        let hashedPassword = admin.hashedPassword;
        if (password) {
            hashedPassword = await crypto.decode(password);
            delete req.body?.password;
        }
        const newAdmin = await Admin.findByIdAndUpdate(
            id,
            {
                ...req.body,
                hashedPassword,
                role: Roles.ADMIN
            },
            { new: true }
        );
        return successRes(res, newAdmin)
    })
}

export default new AdminController(Admin)