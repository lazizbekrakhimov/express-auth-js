import { Router } from "express";

import controller from "../controllers/admin.controller.js";
import authController from "../controllers/auth.controller.js";
import { validator } from "../middlewares/validation-handler.js";
import adminValid from "../validations/user.validation.js";
import { authGuard } from "../guards/auth-token.guard.js";
import { roleGuard } from "../guards/role.guard.js";
import { Roles } from "../enums/const-roles.js";

const router = Router();

router
    .post('/', authGuard, roleGuard(Roles.SUPERADMIN), validator(adminValid.create), controller.create)
    .post('/signin', validator(adminValid.signin), authController.signIn)
    .post('/otp', validator(adminValid.confirmOTP), authController.confirmOTP)
    .post('/token', authController.getAccessToken)
    .post('/signout', authController.signOut)
    .get('/', authGuard, roleGuard(Roles.SUPERADMIN), controller.findAll)
    .get('/:id', authGuard, roleGuard(Roles.SUPERADMIN, 'ID'), controller.findOne)
    .patch('/password/:id', authGuard, roleGuard(Roles.SUPERADMIN, 'ID'), validator(adminValid.updatePassword), controller.updatePassword)
    .patch('/:id', authGuard, roleGuard(Roles.SUPERADMIN, 'ID'), validator(adminValid.update), controller.update)
    .delete('/:id', authGuard, roleGuard(Roles.SUPERADMIN), controller.remove)

export default router