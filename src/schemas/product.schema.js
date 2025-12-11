import { model, Schema } from "mongoose";

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: Schema.Types.ObjectId, ref: 'Category',
        required: true
    },
    description: {
        type: String
    },
    image: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
    versionKey: false
})

export default model("Product", productSchema)