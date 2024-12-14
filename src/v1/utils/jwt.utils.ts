import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export interface TokenPayload {
  adminId: any
  email?: any
  phoneNumber?: string
}

const SECRET_KEY = process.env.SECRET_KEY || 'secret'

//Generate login token for Admins
function generateToken(payload: TokenPayload): string {
  const tokenPayload: TokenPayload = {
    adminId: payload.adminId,
    email: payload.email,
  }

  return jwt.sign(tokenPayload, SECRET_KEY, { expiresIn: '1d' }) 
}

//Verify their login tokens to authorize or not
function verifyToken(token: string): { adminId: string } | object | string | undefined {
  try {
    return jwt.verify(token, SECRET_KEY)
  } catch (error) {
    throw new Error('Invalid or expired token')
  }
}

export { generateToken, verifyToken }

