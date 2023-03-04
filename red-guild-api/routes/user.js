import express from 'express'
import { addUser, deleteUser, getAllUser, login } from '../controllers/user.js'
import { isLoggedIn } from '../middlewares/isLoggedIn.js'
import { User } from '../schemas/user.js'

const router = express.Router()


router.get("/", getAllUser)
router.post("/login", login)
router.post("/signup", addUser)
//router.put("/:id", updateUser)
router.delete("/:id", deleteUser)
// router.get("/:id", getUserById)
router.get("/checktoken", isLoggedIn, async (req, res) => {
  const FoundUser = await User.findById(req.validateToken.id)
  const { password, ...rest } = FoundUser._doc
  res.json(rest)
})
export default router