import mongoose from "mongoose";


const productSchema = mongoose.Schema({

}, { timestamps: true })

export const Product = mongoose.model('Product', productSchema)