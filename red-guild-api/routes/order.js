import express from 'express'
import {
  addOrder,
  deleteOrder,
  getAllOrders,
  getOrderById,
  updateOrder
} from '../controllers/order.js'


const router = express.Router()

router.get("/all", getAllOrders)
router.get("/:id", getOrderById)
router.post("/add", addOrder)
router.put("/:id", updateOrder)
router.delete("/:id", deleteOrder)

export default router