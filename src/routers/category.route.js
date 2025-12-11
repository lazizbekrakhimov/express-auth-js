import { Router } from "express";
import category from "../controllers/category.controller.js";
import { validator } from "../middlewares/validation-handler.js";
import categoryValid from "../validations/category.validation.js"

const router = Router();

router
    .post("/", validator(categoryValid.create), category.create)
    .get("/", category.findAll)
    .get("/:id", category.findOne)
    .patch("/:id", validator(categoryValid.update), category.update)
    .delete("/:id", category.remove)

export default router