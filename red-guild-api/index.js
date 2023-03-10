import cors from "cors"
import dotenv from "dotenv"
import express from "express"
import mongoose from "mongoose"
import orderRouter from "./routes/order.js"
import productRouter from "./routes/product.js"
import todoRouter from "./routes/todo.js"
import userRouter from "./routes/user.js"

dotenv.config()
const app = express()
app.use(cors())

mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("Connected to MongoDB")
}).catch((err) => {
  console.log(err)
})

//body parser
app.use(express.json())

// define routers
app.use("/todo", todoRouter)
app.use("/auth", userRouter)
app.use("/order", orderRouter)
app.use("/product", productRouter)


app.get("/ping", (req, res) => {
  console.log(req.body)
  res.send("pong")
})

app.listen(process.env.PORT, () => {
  console.log("Server is running on port " + process.env.PORT)
})