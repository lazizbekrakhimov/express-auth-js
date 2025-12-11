import User from "../schemas/user.schema.js";
import { Roles } from "../enums/const-roles.js";
import { envConfig } from "../config/env.js";
import crypto from "../utils/crypto.js";

export async function createSuperAdmin() {
    try {
        const existsSuperAdmin = await User.findOne({ role: Roles.SUPERADMIN });
        if (!existsSuperAdmin) {
            const superAdmin = await User.create({
                role: Roles.SUPERADMIN,
                phoneNumber: envConfig.SUPERADMIN.PHONE,
                email: envConfig.SUPERADMIN.EMAIL,
                hashedPassword: await crypto.decode(envConfig.SUPERADMIN.PASSWORD)
            });
            console.log("Super admin created successfully", superAdmin)
        }
    } catch (error) {
        console.error('Error on creating superadmin', error)
    }
}