import { Product } from "../schemas/product.js"

export const getAllProducts = async (req, res) => {

  try {
    const products = await Product.find({})
    res.status(200).json(products)
  } catch (error) {
    res.status(500).json({
      location: "error in the controller getAllProducts",
      message: error.message
    })
  }
}

export const getProductById = async (req, res) => {
  const { id } = req.params
  try {
    const foundProduct = await Product.findById(id)
    if (!foundProduct) return res.status(400).json({ message: "id not found" })
    res.status(200).json(foundProduct)
  } catch (error) {
    res.status(500).json({
      location: "error in the controller getProductById",
      message: error.message
    })
  }
}

export const addProduct = async (req, res) => {
  try {
    const product = req.body
    const newProduct = await Product.create(product)

    res.status(200).json(newProduct)
  } catch (error) {
    res.status(500).json({
      location: "error in the controller addProduct",
      message: error.message
    })
  }
}

export const updateProduct = async (req, res) => {
  const { id } = req.params
  const product = req.body

  try {
    const updated = await Product.findByIdAndUpdate(id, product)
    if (!updated) return res.status(400).json({ message: "error while updating" })
    res.status(200).json(updated)
  } catch (error) {
    res.status(500).json({
      location: "error in the controller updateProduct",
      message: error.message
    })
  }
}

export const deleteProduct = async (req, res) => {
  const { id } = req.params
  const deletedProduct = await Product.findByIdAndDelete(id)

  if (!deletedProduct) return res.status(400).json({ message: "id not found" })
  res.status(200).json(deletedProduct)
}