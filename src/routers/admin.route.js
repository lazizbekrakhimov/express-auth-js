import { Router } from "express";

import controller from "../controllers/admin.controller.js";
import authController from "../controllers/auth.controller.js";
import { validator } from "../middlewares/validation-handler.js";
import adminValid from "../validations/user.validation.js";

const router = Router();

router
    .post('/', validator(adminValid.create), controller.create)
    .post('/signin', validator(adminValid.signin), authController.signIn)
    .post('/otp', validator(adminValid.confirmOTP), authController.confirmOTP)
    .post('/token', authController.getAccessToken)
    .post('/signout', authController.signOut)
    .get('/', controller.findAll)
    .get('/:id', controller.findOne)
    .patch('/:id', validator(adminValid.update), controller.update)
    .delete('/:id', controller.remove)

export default router