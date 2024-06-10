import dotenv from 'dotenv'

dotenv.config()

export const PORT = process.env.PORT || 5000

/* MONGODB */
const MONGO_USER = process.env.MONGO_USER || ''
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || ''

export const mongo = {
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_URL: `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@cluster0.vvuodb5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
}

/* Token */
const REFRESH_SECRET = process.env.REFRESH_SECRET as string
const SECRET = process.env.SECRET as string

export const token = {
  REFRESH_SECRET,
  SECRET
}

/* NodeMailer */
const CLIENT_URL = process.env.CLIENT_URL as string
const EMAIL_SERVICE = process.env.EMAIL_SERVICE as string
const USER = process.env.USER as string
const PASS = process.env.PASS as string

export const nodeMailer = {
  CLIENT_URL,
  EMAIL_SERVICE,
  USER,
  PASS
}
