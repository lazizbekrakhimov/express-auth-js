import { BaseController } from "./base.controller.js";
import { catchAsync } from "../middlewares/catch-async.js";
import Category from "../schemas/category.schema.js";
import { ApiError } from "../utils/custom-error.js";
import { successRes } from "../utils/success-response.js";

export class CategoryController extends BaseController {
    create = catchAsync(async (req, res) => {
        await this._isExist(req.body?.name, 'Category')
        const category = await Category.create(req.body);
        return successRes(res, category, 201)
    })

    update = catchAsync(async (req, res) => {
        const id = req.params?.id;
        await this._getById(id);
        const { name } = req.body;
        if (name) {
            const existCategory = await Category.findOne({ name });
            if (existCategory && existCategory.id != id) {
                throw new ApiError('Category name already exists', 409);
            }
        }
        const category = await Category.findByIdAndUpdate(id, req.body, { new: true });
        return successRes(res, category)
    })
}

export default new CategoryController(Category, 'products')