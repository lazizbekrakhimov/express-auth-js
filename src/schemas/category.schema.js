import { model, Schema } from "mongoose";

const categorySchema = new Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String },
    image: { type: String },
}, {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})

categorySchema.virtual('products', {
    ref: 'Product',
    localField: '_id',
    foreignField: 'category'
})
export default model('Category', categorySchema)