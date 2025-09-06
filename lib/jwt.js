import jwt from 'jsonwebtoken'
const secret = process.env.JWT_SECRET
export const signJWT = (payload) => jwt.sign(payload, secret, { expiresIn: '7d' })
export const verifyJWT = (token) => jwt.verify(token, secret)
