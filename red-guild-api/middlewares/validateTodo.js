import { z } from "zod"

const todoschema = z.object({
  title: z.string().min(1),
  desc: z.string().min(1),
  isDone: z.boolean(),
})

export const validateTodo = (req, res, next) => {
  const { error } = todoschema.safeParse(req.body)
  if (error) {
    res.status(400).json({
      message: "invalid todo"
    })
  } else {
    next()
  }
}