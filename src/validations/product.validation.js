import Joi from "joi";

class ProductValidator{
    create(data) {
        const product = Joi.object({
            name: Joi.string().min(3).required(),
            description: Joi.string().optional(),
            image: Joi.string().optional(),
            price: Joi.number().min(0).required(),
            category: Joi.string().hex().length(24).required()
        })
        return product.validate(data);
    }

    update(data) {
        const product = Joi.object({
            name: Joi.string().min(3).optional(),
            description: Joi.string().optional(),
            image: Joi.string().optional(),
            price: Joi.number().min(0).required(),
            category: Joi.string().hex().length(24).required()
        })
        return product.validate(data);
    }
}

export default new ProductValidator()