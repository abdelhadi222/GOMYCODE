import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { User } from "../schemas/user.js"



export const getAllUser = async (req, res) => {
  try {
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({
      location: "error in the controller getAllUser",
      message: error.message
    })
  }
}

export const addUser = async (req, res) => {
  const user = req.body
  try {
    const isFound = await User.findOne({ email: user.email })
    console.log(isFound)
    if (isFound) return res.status(400).json({ message: "user already exists" })
    //without await
    const hashedpassword = await bcrypt.hash(req.body.password, 10)
    const newUser = {
      ...user,
      password: hashedpassword,
    }
    const createdUser = await User.create(newUser)
    const { password, ...rest } = createdUser._doc
    jwt.sign({ id: rest._id }, process.env.JWT_SECRET, { expiresIn: "14 days" }, (err, token) => {
      if (err) return res.status(500).json({ message: "error in the token" })
      res.status(200).json({ token, user: rest })
    })
  } catch (error) {
    res.status(500).json({
      location: "error in the controller addUser",
      message: error.message
    })
  }
}

export const login = async (req, res) => {
  const { email } = req.body
  try {
    const user = await User.findOne({ email })
    if (!user) return res.status(400).json({ message: "user not found" })
    const isMatch = await bcrypt.compare(req.body.password, user.password)
    if (!isMatch) return res.status(400).json({ message: "invalid password" })
    const { password, ...rest } = user._doc
    jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "14 days" }, (err, token) => {
      if (err) return res.status(500).json({ message: "error in the token" })
      res.status(200).json({ token, user: rest })
    })
  } catch (error) {
    res.status(500).json({
      location: "error in the controller login",
      message: error.message
    })
  }
}

export const deleteUser = async (req, res) => {
  const { id } = req.params
  try {
    const deletedUser = await User.findByIdAndDelete(id)
    if (!deletedUser) return res.status(400).json({ message: "user not found" })
    res.status(200).json(deletedUser)
  } catch (error) {
    res.status(500).json({
      location: "error in the controller deleteUser",
      message: error.message
    })
  }
}