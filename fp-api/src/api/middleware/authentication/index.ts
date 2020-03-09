import jwt, { Secret } from "jsonwebtoken"
import { Request, Response, NextFunction } from "express"

const JWT_KEY = <Secret>process.env.JWT_KEY

function middleware(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization
  if (!token) {
    return res.status(403).json({})
  }

  jwt.verify(token, JWT_KEY, function(err: jwt.JsonWebTokenError, user: any) {
    // @ts-ignore
    req.user = user
    next()
  })
}

export default { middleware }
