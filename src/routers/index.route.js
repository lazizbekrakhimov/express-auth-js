import { Router } from "express";

import adminRouter from "../routers/admin.route.js";
import categoryRouter from "../routers/category.route.js";
import productRouter from "../routers/product.route.js";

const router = Router();

router.use("/category", categoryRouter);
router.use("/products", productRouter);
router.use("/admin", adminRouter);

export default router