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
}, { timestamps: true })

const Brand = mongoose.model('Brand', BrandSchema)

export default Brand