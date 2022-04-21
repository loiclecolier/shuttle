import mongoose from 'mongoose'

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true
    },
    description: {
        type: String
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    },
    brand: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Brand"
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    isPromo: {
        type: Boolean,
        required: true,
        default: false
    },
    percentagePromo: {
        type: Number,
        default: 0
    },
    image: {
        type: String
    }
})

const Product = mongoose.model('Product', ProductSchema)

export default Product