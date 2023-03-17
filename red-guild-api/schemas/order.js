import mongoose from "mongoose";


const orderSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    products: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        },
        qty: {
            type: Number,
        }
    }],
    totalPrice: {
        type: Number
    },

    status: {
        type: String,
        enum: ["pending", "achivied", "cancelled"],
        default: "pending"
    }
}, { timestamps: true })

export const Order = mongoose.model('Order', orderSchema)