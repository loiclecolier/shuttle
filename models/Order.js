import mongoose from 'mongoose'

const OrderSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    products: [{
        productId: { type: String },
        quantity: { type: Number, default: 1 }
    }],
    amount: {
        type: Number,
        required: true
    },
    address: {
        type: Object, // Stripe library returns an object with country, city, street,etc
        required: true
    },
    status: {
        type: String,
        default: "pending"
    }
}, { timestamps: true })

const Order = mongoose.model('Order', OrderSchema)

export default Order