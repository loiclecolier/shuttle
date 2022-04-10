import mongoose from 'mongoose'

const BrandSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    }]
})

const Brand = mongoose.model('Brand', BrandSchema)

export default Brand