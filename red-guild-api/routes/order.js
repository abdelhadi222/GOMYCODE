import express from 'express'
import {
    addOrder,
    deleteOrder,
    getAllOrders,
    getOrderById,
    updateOrder
} from '../controllers/order.js'
import { isAdmin } from '../middlewares/isAdmin.js'
import { isLoggedIn } from '../middlewares/isLoggedIn.js'


const router = express.Router()

router.get("/all", isLoggedIn, isAdmin, getAllOrders)
router.get("/:id", getOrderById)
router.post("/add", addOrder)
router.put("/:id", updateOrder)
router.delete("/:id", deleteOrder)

export default router