import { Router } from "express";
import product from "../controllers/product.controller.js";
import { validator } from "../middlewares/validation-handler.js";
import productValid from '../validations/product.validation.js'

const router = Router();

router
    .post("/", validator(productValid.create), product.create)
    .get("/", product.findAll)
    .get("/:id", product.findOne)
    .patch("/:id", validator(productValid.update), product.update)
    .delete("/:id", product.remove)

export default router