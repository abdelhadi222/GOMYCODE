import express from 'express'
import {
  addProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct
} from '../controllers/product.js'

const router = express.Router()

router.get("/all", getAllProducts)
router.get("/:id", getProductById)
router.post("/add", addProduct)
router.put("/:id", updateProduct)
router.delete("/:id", deleteProduct)

export default router