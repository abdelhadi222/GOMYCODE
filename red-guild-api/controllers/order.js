import { Order } from "../schemas/order.js"
import { Product } from "../schemas/product.js"
import { User } from "../schemas/user.js"

export const getAllOrders = async(req, res) => {
    try {
        //add sort to this query 
        const orders = await Order.find({}).populate([
            { path: "products.product", model: "Product" },
            { path: "user", model: "User" }
        ]).sort({ createdAt: -1 })
        res.status(200).json(orders)
    } catch (error) {
        res.status(500).json({
            location: "error in the controller getAllOrders",
            message: error.message
        })
    }
}
export const getOrderById = async(req, res) => {
    const { id } = req.params
    try {
        const foundOrder = await Order.findById(id)
        if (!foundOrder) return res.status(400).json({ message: "id not found" })
        res.status(200).json(foundOrder)
    } catch (error) {
        res.status(500).json({
            location: "error in the controller getOrderById",
            message: error.message
        })
    }
}

export const addOrder = async(req, res) => {
    try {
        const order = req.body
            // create the loop over order.products here 
            // const arrayofporductsid = order.products.map((item) => item.product)
            // const arrayofqty = order.products.map((item) => item.qty)
            // const result = await Product.updateMany(
            //   { _id: { $in: arrayofporductsid } },
            //    { $inc: { countInStock: -1  } })
        for (let i = 0; i < order.products.length; i++) {
            const { product, qty } = order.products[i]
            const foundProduct = await Product.findById(product)
            if (!foundProduct) return res.status(400).json({ message: "product not found" })
            if (foundProduct.countInStock < qty) return res.status(400).json({ message: "not enough stock" })
            foundProduct.countInStock -= qty
            await foundProduct.save()
        }


        const orders = await Order.create(order)
        await User.findByIdAndUpdate(order.user, {
            $push: { orders: orders._id },
        })

        res.status(200).json(orders)
    } catch (error) {
        res.status(500).json({
            location: "error in the controller addOrder",
            message: error.message
        })
    }
}
export const updateOrder = async(req, res) => {
    const { id } = req.params
    const order = req.body
    try {
        const updated = await Order.findByIdAndUpdate(id, order)
        if (!updated) return res.status(400).json({ message: "error while updating" })
        res.status(200).json(updated)
    } catch (error) {
        res.status(500).json({
            location: "error in the controller updateOrder",
            message: error.message
        })
    }
}
export const deleteOrder = async(req, res) => {
    const { id } = req.params
    const deletedOrder = await Order.findByIdAndDelete(id)

    if (!deletedOrder) return res.status(400).json({ message: "id not found" })
    res.status(200).json(deletedOrder)
}