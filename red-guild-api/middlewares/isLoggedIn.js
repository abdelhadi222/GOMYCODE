import jwt from "jsonwebtoken"

export const isLoggedIn = (req, res, next) => {
  const { token } = req.headers
  console.log(token)
  if (!token) {
    res.status(401).json({
      message: "unauthorized"
    })
  } else {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        res.status(401).json({
          message: "unauthorized"
        })
      } else {
        req.validateToken = decoded
        next()
      }
    })
  }
}