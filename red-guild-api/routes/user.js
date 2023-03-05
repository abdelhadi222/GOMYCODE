import express from 'express'
import { addUser, deleteUser, getAllUser, login } from '../controllers/user.js'
import { isAdmin } from '../middlewares/isAdmin.js'
import { isLoggedIn } from '../middlewares/isLoggedIn.js'

const router = express.Router()


router.get("/", isLoggedIn, isAdmin, getAllUser)
router.post("/login", login)
router.post("/signup", addUser)
//router.put("/:id", updateUser)
router.delete("/:id", deleteUser)
// router.get("/:id", getUserById)
router.get("/checktoken", isLoggedIn, async (req, res) => {
  res.json(req.user)
})
export default router