//always write your code in try catch blocks

import { Todo } from "../schemas/todo.js"

export const getAllTodos = async (req, res) => {

  try {
    const todos = await Todo.find({})
    res.status(200).json(todos)
  } catch (error) {
    res.status(500).json({
      location: "error in the controller getAllTodos",
      message: error.message
    })
  }
}

export const addTodo = async (req, res) => {

  const todo = req.body
  const todos = await Todo.create(todo)
  res.status(200).json(todos)
}
export const updateTodo = async (req, res) => {

  const { id } = req.params
  const todo = req.body
  try {
    const updated = await Todo.findByIdAndUpdate(id, todo)
    if (!updated) return res.status(400).json({ message: "error while updating" })
    res.status(200).json(updated)
  } catch (error) {
    res.status(500).json({
      location: "error in the controller updateTodo",
      message: error.message
    })
  }
}
export const deleteTodo = async (req, res) => {
  const { id } = req.params
  const deletedTodo = await Todo.findByIdAndDelete(id)

  if (!deletedTodo) return res.status(400).json({ message: "id not found" })
  res.status(200).json(deletedTodo)
}