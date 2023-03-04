import mongoose from "mongoose"
const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
  },
  isDone: {
    type: Boolean,
  }
}, { timestamps: true })

export const Todo = mongoose.model("Todo", todoSchema)