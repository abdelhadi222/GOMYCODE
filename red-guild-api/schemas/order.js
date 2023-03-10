import mongoose from "mongoose";


const orderSchema = mongoose.Schema({

}, { timestamps: true })

export const Order = mongoose.model('Order', orderSchema)