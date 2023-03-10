import { Order } from "../schemas/order.js"

export const getAllOrders = async (req, res) => {
  try {
    //add sort to this query 
    const orders = await Order.find({})
    res.status(200).json(orders)
  } catch (error) {
    res.status(500).json({
      location: "error in the controller getAllOrders",
      message: error.message
    })
  }
}
export const getOrderById = async (req, res) => {
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

export const addOrder = async (req, res) => {
  try {
    const order = req.body
    // create the loop over order.products here 



    const orders = await Order.create(order)
    res.status(200).json(orders)
  } catch (error) {
    res.status(500).json({
      location: "error in the controller addOrder",
      message: error.message
    })
  }
}
export const updateOrder = async (req, res) => {
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
export const deleteOrder = async (req, res) => {
  const { id } = req.params
  const deletedOrder = await Order.findByIdAndDelete(id)

  if (!deletedOrder) return res.status(400).json({ message: "id not found" })
  res.status(200).json(deletedOrder)
}