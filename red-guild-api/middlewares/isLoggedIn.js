import jwt from "jsonwebtoken"
import { User } from "../schemas/user.js"

export const isLoggedIn = (req, res, next) => {
  const { token } = req.headers
  if (!token) {
    res.status(401).json({
      message: "unauthorized"
    })
  } else {
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        res.status(401).json({
          message: "unauthorized"
        })
      } else {
        const FoundUser = await User.findById(decoded.id)
        const { password, ...rest } = FoundUser._doc
        req.user = rest
        next()
      }
    })
  }
}