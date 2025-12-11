import Joi from "joi";

class CategoryValidator{
    create(data) {
        const category = Joi.object({
            name: Joi.string().min(3).required(),
            description: Joi.string().optional(),
            image: Joi.string().optional(),
        })
        return category.validate(data);
    }

    update(data) {
        const category = Joi.object({
            name: Joi.string().min(3).optional(),
            description: Joi.string().optional(),
            image: Joi.string().optional(),
        })
        return category.validate(data);
    }
}

export default new CategoryValidator()